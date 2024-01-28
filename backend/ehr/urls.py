from django.urls import path
from .views import UserEHRView, AnotherUserEHRView, SearchView, UserEHRCreateView, GetEHRView

urlpatterns = [
    path('fetch_current/', UserEHRView.as_view(), name='fetch_current_ehr'),
    path('fetch/', AnotherUserEHRView.as_view(), name="fetch_ehr"),
    path('create/', UserEHRCreateView.as_view(), name='create_ehr'),
    path('search/', SearchView.as_view(), name='search_ehr'),
    path('get/', GetEHRView.as_view(), name='get_ehr'),
]