from django.urls import path
from .views import *

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('signup/', CreateUserView.as_view(), name='signup'),
]