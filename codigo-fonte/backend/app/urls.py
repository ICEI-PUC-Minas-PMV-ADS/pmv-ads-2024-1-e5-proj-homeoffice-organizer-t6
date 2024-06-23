from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('usuarios.urls')),
    path('collaborator/', include('collaborator.urls')),
    path('event/', include('event.urls')),
    path('api/endpoint/', views.endpoint_view, name='endpoint'),
]
