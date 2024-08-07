# Generated by Django 3.2.25 on 2024-06-04 22:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EventDate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.EmailField(max_length=254, unique=True)),
                ('date', models.DateField()),
            ],
        ),
    ]
