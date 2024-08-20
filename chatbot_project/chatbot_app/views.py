from django.shortcuts import render
from django.http import JsonResponse
import json

def index(request):
    return render(request, 'index.html')

def chat(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_message = data.get('message', '')
        
        # Example response
        bot_response = "This is a placeholder response."

        # Here, you would call your chatbot model to get a response
        # bot_response = your_chatbot_model.get_response(user_message)

        return JsonResponse({'response': bot_response})

    return JsonResponse({'response': 'Invalid request method.'})
