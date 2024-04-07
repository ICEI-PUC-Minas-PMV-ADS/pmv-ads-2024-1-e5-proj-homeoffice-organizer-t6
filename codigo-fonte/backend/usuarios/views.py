from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data.get('username')
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')
        user = User.objects.create_user(username=username, email=email, password=password)
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Verificar se o email é fornecido
    if not email:
        return Response("O email é obrigatório", status=status.HTTP_400_BAD_REQUEST)

    try:
        # Tenta encontrar o usuário pelo email
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response("Usuário não encontrado", status=status.HTTP_404_NOT_FOUND)

    # Autenticar o usuário
    user = authenticate(username=user.username, password=password)

    if user is None:
        return Response("Credenciais inválidas", status=status.HTTP_401_UNAUTHORIZED)

    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user)
    return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_200_OK)