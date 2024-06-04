from django.urls import path
from .views import EventDateView, EventDateListView, delete_event_date

urlpatterns = [
    path('event-create/', EventDateView.as_view(), name='create_event'),
    path('events-list/', EventDateListView.as_view(), name='list_events'),
    path('events/<int:pk>/delete/', delete_event_date, name='delete_event'),
]
