import requests
from django.http import JsonResponse
from bs4 import BeautifulSoup


def get_holidays(request, city, state, year):
    url = f'https://www.calendario.com.br/feriados-{city.lower()}-{state.lower()}.php?ano={year}'
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    holidays = []
    table = soup.find('table')
    rows = table.find_all('tr')
    for row in rows:
        cols = row.find_all('td')
        if len(cols) >= 2:
            date = cols[0].text.strip()
            name = cols[1].text.strip()
            holidays.append({'date': date, 'name': name})

    return JsonResponse(holidays, safe=False)