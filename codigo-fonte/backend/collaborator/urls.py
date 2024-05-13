from django.urls import path
from . import views

urlpatterns = [
    path('create-collaborator/', views.create_collaborator, name='create_collaborator'),
    path('collaborator/<int:pk>/', views.delete_collaborator, name='delete_collaborator'),
    path('collaborators/', views.list_collaborators, name='list_collaborators'),
]
