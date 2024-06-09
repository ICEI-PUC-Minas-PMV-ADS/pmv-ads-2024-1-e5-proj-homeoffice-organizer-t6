from rest_framework import serializers
from .models import Collaborator, CollaboratorDate


class CollaboratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collaborator
        fields = ['id', 'name', 'email', 'sector']


class CollaboratorDateSerializer(serializers.ModelSerializer):
    collaborator = serializers.StringRelatedField()

    class Meta:
        model = CollaboratorDate
        fields = ['id', 'date', 'collaborator']