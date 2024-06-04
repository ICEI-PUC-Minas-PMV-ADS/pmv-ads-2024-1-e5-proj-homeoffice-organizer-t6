from rest_framework import serializers
from .models import EventDate


class EventDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventDate
        fields = ['id', 'title', 'description', 'date']