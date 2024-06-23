from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def endpoint_view(request):
    data = {
        'message': 'Hello from Django backend!'
    }
    return Response(data, status=status.HTTP_200_OK)