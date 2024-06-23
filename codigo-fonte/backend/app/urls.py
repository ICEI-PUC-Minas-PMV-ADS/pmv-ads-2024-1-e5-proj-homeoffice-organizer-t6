from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('usuarios.urls')),
    path('collaborator/', include('collaborator.urls')),
    path('event/', include('event.urls')),

    # # Rota para servir o index.html do React em produção
    # re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]

# # Adicionando configuração para servir arquivos estáticos e de mídia em desenvolvimento
# if settings.DEBUG:
#     urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
