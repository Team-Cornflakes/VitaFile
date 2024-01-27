from django.contrib import admin
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

User = get_user_model() 

class MyUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = UserCreationForm.Meta.fields + ('sex', 'dob', 'fid', 'contact_no')

class MyUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = UserChangeForm.Meta.fields

class MyUserAdmin(UserAdmin):
    list_display = (
        'userid', 'username', 'email', 'first_name', 'last_name', 'is_staff',  
        'sex', 'dob', 'fid', 'contact_no'
    )

    fieldsets = (
        (None, {
            'fields': ('username', 'password')
        }),
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'email')
        }),
        ('Permissions', {
            'fields': (
                'is_active', 'is_staff', 'is_superuser',
                'groups', 'user_permissions'
            )
        }),
        ('Additional info', {
            'fields': ('sex', 'dob', 'fid', 'contact_no')
        })
    )

    add_fieldsets = (
        (None, {
            'fields': ('username', 'password')
        }),
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'email')
        }),
        ('Permissions', {
            'fields': (
                'is_active', 'is_staff', 'is_superuser',
                'groups', 'user_permissions'
            )
        }),
        ('Additional info', {
            'fields': ('sex', 'dob', 'fid', 'contact_no')
        })
    )


admin.site.register(User, MyUserAdmin)
admin.site.unregister(Group)
# Register your models here.
