from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import EHR  # assuming you have an EHR model

class UserEHRView(APIView):
    def get(self, request):
        user = request.user
        user_ehr = EHR.objects.filter(user=user)

        # Convert the QuerySet to a list of dictionaries
        user_ehr_list = list(user_ehr.values())

        return Response(user_ehr_list, status=status.HTTP_200_OK)
    
class UserEHRView(APIView):
    def get(self, request):
        user = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=user, password=password)

        if user is None:
            return Response({"message": "Username does not exist or invalide credentials provided"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            user_ehr_list = EHR.objects.filter(user=user)

            return Response(user_ehr_list, status=status.HTTP_200_OK)