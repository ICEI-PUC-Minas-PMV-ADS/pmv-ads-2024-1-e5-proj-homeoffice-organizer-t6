from rest_framework import serializers
from .models import Collaborator


class CollaboratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collaborator
        fields = ['id', 'name', 'email', 'sector']