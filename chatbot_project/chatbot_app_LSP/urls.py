from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import index2  # Example views in chatbot_app_LSP

urlpatterns = [
    path('', index2, name='index2'),  # Index page for chatbot_app_LSP
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
