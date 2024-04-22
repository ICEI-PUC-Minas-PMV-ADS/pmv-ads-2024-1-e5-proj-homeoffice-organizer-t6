from django.urls import path
from .views import get_holidays

urlpatterns = [
    path('api/holidays/<str:city>/<str:state>/<int:year>/', get_holidays, name='get_holidays'),
]