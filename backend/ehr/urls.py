from django.urls import path
from .views import UserEHRView, AnotherUserEHRView

urlpatterns = [
    path('fetch_current/', UserEHRView.as_view(), name='fetch_current_ehr'),
    path('fetch/', AnotherUserEHRView.as_view(), name="fetch_ehr"),
    path('search/', SearchView.as_view(), name='search_ehr'),
]