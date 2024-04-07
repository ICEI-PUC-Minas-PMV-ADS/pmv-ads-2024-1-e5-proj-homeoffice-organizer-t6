from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email',)
        extra_kwargs = {'password': {'write_only': True}}  # Para garantir que a senha não seja retornada nas respostas
