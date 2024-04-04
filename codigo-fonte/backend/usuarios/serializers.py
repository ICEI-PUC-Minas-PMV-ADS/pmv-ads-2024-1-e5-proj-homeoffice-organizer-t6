from rest_framework import serializers
from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'full_name', 'password')

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
