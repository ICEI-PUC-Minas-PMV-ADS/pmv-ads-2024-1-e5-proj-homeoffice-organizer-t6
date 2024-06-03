from rest_framework import serializers
from .models import Collaborator, CollaboratorDate


class CollaboratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collaborator
        fields = ['id', 'name', 'email', 'sector']


class CollaboratorDateSerializer(serializers.ModelSerializer):
    collaborators = serializers.StringRelatedField(many=True)

    class Meta:
        model = CollaboratorDate
        fields = ['date', 'collaborators']