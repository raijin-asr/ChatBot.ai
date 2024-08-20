from django.contrib import admin
from django.urls import path
from chatbot_app import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'), # Directly routes to the chatbot index view
    path('chat/', views.chat, name='chat'), # Directly routes to the chat view
]
