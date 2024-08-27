from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chatbot1/', include('chatbot_app.urls')),  # Include chatbot_app's URLs
    path('chatbot2/', include('chatbot_app_LSP.urls')),  # Include chatbot_app_LSP's URLs
]
