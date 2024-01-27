from django.urls import path
from .views import UserEHRView, AnotherUserEHRView

urlpatterns = [
    path('create/', UserEHRView.as_view(), name='create_ehr'),
    path('fetch/', AnotherUserEHRView.as_view(), name="fetch_ehr")
]