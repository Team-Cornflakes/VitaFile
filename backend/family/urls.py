from django.urls import path
from .views import CreateFamilyView, FamilyMembersView

urlpatterns = [
    path('create_family/', CreateFamilyView.as_view(), name='create_family'),
    path('get_family/', FamilyMembersView.as_view(), name="eget_family")
]