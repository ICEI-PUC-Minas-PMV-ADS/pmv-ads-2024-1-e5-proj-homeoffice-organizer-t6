# Generated by Django 3.2.25 on 2024-05-13 00:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('collaborator', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='collaborator',
            old_name='nome',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='collaborator',
            old_name='setor',
            new_name='sector',
        ),
    ]