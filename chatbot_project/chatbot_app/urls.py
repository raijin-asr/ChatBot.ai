from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import chatbot_response, index

urlpatterns = [
    path('', index, name='index'),
    path('chatbot-response/', chatbot_response, name='chatbot-response'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
