# Generated by Django 5.0.4 on 2024-05-13 00:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0004_tasks_task_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tasks',
            name='completed',
            field=models.CharField(default='Check', max_length=255),
        ),
    ]
