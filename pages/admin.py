from django.contrib import admin
from django.contrib.auth.models import User
from .models import UserForm

class UserAdmin(admin.ModelAdmin):
    form = UserForm

# Unregister the original User admin
admin.site.unregister(User)

# Register the new User Admin
admin.site.register(User, UserAdmin)
