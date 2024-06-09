from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import EventDate
from .serializers import EventDateSerializer
from datetime import datetime
from rest_framework.decorators import api_view


class EventDateView(APIView):
    def post(self, request):
        title = request.data.get('title')
        description = request.data.get('description')
        date = request.data.get('date')

        if not (title and description and date):
            return Response({'message': 'Título, descrição e data são obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            date = datetime.strptime(date, '%Y-%m-%d').date()
        except ValueError:
            return Response({'message': 'Formato de data inválido.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            event_date = EventDate(title=title, description=description, date=date)
            event_date.save()
            return Response({'message': 'Evento criado com sucesso.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EventDateListView(APIView):
    def get(self, request):
        event_dates = EventDate.objects.all()
        serializer = EventDateSerializer(event_dates, many=True)
        return Response(serializer.data)


@api_view(['DELETE'])
def delete_event_date(request, pk):
    try:
        event_date = EventDate.objects.get(pk=pk)
    except EventDate.DoesNotExist:
        return Response({'message': 'Evento não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

    event_date.delete()
    return Response({'message': 'Evento deletado com sucesso.'}, status=status.HTTP_204_NO_CONTENT)
