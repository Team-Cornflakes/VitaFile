from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import EHR  # assuming you have an EHR model

User = get_user_model()

class UserEHRView(APIView):
    def get(self, request):
        user = request.user
        user_ehr = EHR.objects.filter(user=user)

        # Convert the QuerySet to a list of dictionaries
        user_ehr_list = list(user_ehr.values())

        return Response(user_ehr_list, status=status.HTTP_200_OK)
    
class AnotherUserEHRView(APIView):
    def get(self, request):
        username = request.data.get("username")

        user = User.objects.filter(username=user).first()

        if user is None:
            return Response({"message": "Username does not exist or invalide credentials provided"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            user_ehr_list = EHR.objects.filter(user=user)

            return Response(user_ehr_list, status=status.HTTP_200_OK)