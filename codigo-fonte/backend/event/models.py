from django.db import models


class EventDate(models.Model):
    title = models.CharField(max_length=100)
    description = models.EmailField(unique=True)
    date = models.DateField()

    def __str__(self):
        return self.title