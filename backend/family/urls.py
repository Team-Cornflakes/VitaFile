from django.urls import path
from .views import CreateFamilyView

urlpatterns = [
    path('create_family/', CreateFamilyView, name='create_family'),
]
