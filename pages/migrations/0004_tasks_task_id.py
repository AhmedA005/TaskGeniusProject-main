# Generated by Django 5.0.4 on 2024-05-12 22:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0003_tasks'),
    ]

    operations = [
        migrations.AddField(
            model_name='tasks',
            name='task_id',
            field=models.IntegerField(default=0),
        ),
    ]