from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Collaborator
from .serializers import CollaboratorSerializer


@api_view(['POST'])
def create_collaborator(request):
    serializer = CollaboratorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_collaborator(request, pk):
    try:
        collaborator = Collaborator.objects.get(pk=pk)
    except Collaborator.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    collaborator.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def list_collaborators(request):
    sector = request.GET.get('sector', None)
    if sector:
        collaborators = Collaborator.objects.filter(sector=sector)
    else:
        collaborators = Collaborator.objects.all()
    serializer = CollaboratorSerializer(collaborators, many=True)
    return Response(serializer.data)