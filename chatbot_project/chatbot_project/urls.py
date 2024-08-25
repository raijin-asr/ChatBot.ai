from django.contrib import admin
from django.urls import path, include
from chatbot_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'), # Directly routes to the chatbot index view
    path('', include('chatbot_app.urls')),  # Include chatbot_app's URLs
]
