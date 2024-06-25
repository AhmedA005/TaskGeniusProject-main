from django import forms
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)


class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())
    is_admin = models.BooleanField(default=False)

    class Meta():
        model = User
        fields = ('username','password','email')
    def __str__(self):
        return self.username
    
class Tasks(models.Model):
        title = models.CharField(max_length=255)
        teacher = models.CharField(max_length=255)
        priority = models.CharField(max_length=255)
        description = models.CharField(max_length=255)
        completed = models.CharField(max_length=255)
        details = models.CharField(max_length=255)
        task_id = models.IntegerField(default=0)