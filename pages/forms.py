from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class SignupForm(UserCreationForm):
    username = forms.CharField(min_length=3,max_length=15)
    email = forms.EmailField()
    password1 = forms.CharField(min_length=8,widget=forms.PasswordInput)
    password2 = forms.CharField(min_length=8,widget=forms.PasswordInput)
    is_admin = forms.BooleanField(required=False,label='Sign-up as an admin')
    class Meta:
        model = User
        fields=['username','email','password1','password2','is_admin']

class LoginForm(UserCreationForm):
    username = forms.CharField(min_length=3,max_length=15)
    password1 = forms.CharField(min_length=8,widget=forms.PasswordInput)
    is_admin = forms.BooleanField(required=False,label='Sign-up as an admin')
    class Meta:
        model = User
        fields=['username','password1','is_admin']
