from django.db import models


class Collaborator(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    sector = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class CollaboratorDate(models.Model):
    id = models.AutoField(primary_key=True)
    collaborator = models.ForeignKey(Collaborator, on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return f"{self.collaborator.name} - {self.date}"
