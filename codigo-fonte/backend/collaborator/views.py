from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import datetime
from .models import Collaborator, CollaboratorDate
from .serializers import CollaboratorSerializer, CollaboratorDateSerializer

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
        return Response({'message': 'Colaborador não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

    collaborator.delete()
    return Response({'message': 'Colaborador deletado com sucesso.'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def list_collaborators(request):
    sector = request.GET.get('sector', None)
    if sector:
        collaborators = Collaborator.objects.filter(sector=sector)
    else:
        collaborators = Collaborator.objects.all()
    serializer = CollaboratorSerializer(collaborators, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def endpoint_view(request):
    # Exemplo de lógica para o endpoint /api/endpoint/
    data = {
        'message': 'Hello from Django backend at /api/endpoint/!'
    }
    return Response(data, status=status.HTTP_200_OK)

class CollaboratorDateView(APIView):
    def post(self, request):
        collaborator_id = request.data.get('collaborator_id')
        date = request.data.get('date')

        if not (collaborator_id and date):
            return Response({'message': 'ID do colaborador e data são obrigatórios.'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            collaborator = Collaborator.objects.get(pk=collaborator_id)
        except Collaborator.DoesNotExist:
            return Response({'message': 'Colaborador não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            date = datetime.strptime(date, '%Y-%m-%d').date()
        except ValueError:
            return Response({'message': 'Formato de data inválido.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            collaborator_date = CollaboratorDate(collaborator=collaborator, date=date)
            collaborator_date.save()
            return Response({'message': 'Colaborador associado à data com sucesso.'},
                            status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CollaboratorDateListView(APIView):
    def get(self, request):
        collaborator_date = CollaboratorDate.objects.all()
        serializer = CollaboratorDateSerializer(collaborator_date, many=True)
        return Response(serializer.data)

@api_view(['DELETE'])
def delete_collaborator_date(request, pk):
    try:
        collaborator_date = CollaboratorDate.objects.get(pk=pk)
    except CollaboratorDate.DoesNotExist:
        return Response({'message': 'Associação de colaborador com a data não encontrada.'},
                        status=status.HTTP_404_NOT_FOUND)

    collaborator_date.delete()
    return Response({'message': 'Associação de colaborador com a data deletada com sucesso.'},
                    status=status.HTTP_204_NO_CONTENT)