# Generated by Django 5.0.4 on 2024-05-12 03:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0002_userprofile_delete_adminuser_delete_teacheruser'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tasks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('teacher', models.CharField(max_length=255)),
                ('priority', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=255)),
                ('completed', models.BooleanField()),
                ('details', models.CharField(max_length=255)),
            ],
        ),
    ]