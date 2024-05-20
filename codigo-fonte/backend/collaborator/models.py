from django.db import models


class Collaborator(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    sector = models.CharField(max_length=100)

    def __str__(self):
        return self.name