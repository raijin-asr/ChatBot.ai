from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.contrib import admin  # Don't forget to import admin if it's not already there

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chatbot/', include('chatbot.urls')),  # Includes URLs from the chatbot app
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
