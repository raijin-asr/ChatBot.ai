from django.shortcuts import render
import re
from difflib import SequenceMatcher
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import PyPDF2
import os

def index(request):
    return render(request, 'index.html')

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''.join([page.extract_text() for page in reader.pages])
    return text

def preprocess_text(text):
    questions = re.findall(r'\bQ:\s*(.*?)(?=\n|$)', text, re.DOTALL)
    responses = re.findall(r'\bA:\s*(.*?)(?=\n|$)', text, re.DOTALL)
    return [(q.strip(), responses[i].strip()) for i, q in enumerate(questions) if i < len(responses)]

pdf_path = os.path.join(os.path.dirname(__file__), 'static/chatbot-dialogs.pdf')
pdf_text = extract_text_from_pdf(pdf_path)
paired_data = preprocess_text(pdf_text)

def find_closest_match(question, paired_data, threshold=0.5):
    def similar(a, b):
        return SequenceMatcher(None, a, b).ratio()

    best_match, highest_score = None, 0
    for q, a in paired_data:
        score = similar(question.lower(), q.lower())
        if score > highest_score:
            best_match, highest_score = a, score

    return best_match if highest_score > threshold else None

def respond_from_paired_data(question, paired_data):
    response = find_closest_match(question, paired_data)
    return response if response else "I'm not sure about that. Could you please clarify?"

@csrf_exempt
def chatbot_response(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_input = data.get('message', '')
        response = respond_from_paired_data(user_input, paired_data)
        return JsonResponse({'response': response})
    return JsonResponse({'response': 'Invalid request method.'}, status=405)
