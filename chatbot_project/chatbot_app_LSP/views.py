from django.shortcuts import render

# Create your views here.
def index2(request):
    return render(request, 'index-lsp.html')