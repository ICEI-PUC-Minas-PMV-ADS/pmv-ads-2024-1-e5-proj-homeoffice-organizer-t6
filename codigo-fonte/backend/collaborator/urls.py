from django.urls import path
from . import views
from .views import CollaboratorDateView, CollaboratorDateListView

urlpatterns = [
    path('create-collaborator/', views.create_collaborator, name='create_collaborator'),
    path('collaborator/<int:pk>/', views.delete_collaborator, name='delete_collaborator'),
    path('collaborators/', views.list_collaborators, name='list_collaborators'),
    path('api/collaborator-date/', CollaboratorDateView.as_view(), name='collaborator_date'),
    path('collaborator-dates-list/', CollaboratorDateListView.as_view(), name='collaborator_dates_list')
]
