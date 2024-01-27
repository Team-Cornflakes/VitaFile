from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import EHR  # assuming you have an EHR modeln
from .serializers import EHRSerializer
from haystack.query import SearchQuerySet
from rest_framework.parsers import MultiPartParser, FormParser
from .ocr import ocr_from_image
from rest_framework.viewsets import ModelViewSet

User = get_user_model()

class EHRViewSet(ModelViewSet):
    queryset = EHR.objects.all()
    serializer_class = EHRSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(userid=self.request.user)

    def get_queryset(self):
        user = self.request.user
        family = user.fid
        
        if family is not None:
            family_members = User.objects.filter(fid=family)
            return EHR.objects.filter(userid__in=family_members)
        
        else:
            return EHR.objects.filter(userid=user)
    queryset = EHR.objects.all()
    serializer_class = EHRSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(userid=self.request.user)

    def get_queryset(self):
        user = self.request.user
        family = user.fid
        
        if family is not None:
            family_members = User.objects.filter(fid=family)
            return EHR.objects.filter(userid__in=family_members)
        
        else:
            return EHR.objects.filter(userid=user)

class UserEHRView(APIView):
    def get(self, request):
        user = request.user
        user_ehr = EHR.objects.filter(userid=user)
        # Convert the QuerySet to a list of dictionaries

        if user_ehr is None:
            return Response({"message": "No EHRs found"}, status=status.HTTP_400_BAD_REQUEST)

        user_ehr_list = list(user_ehr.values())
        return Response(user_ehr_list, status=status.HTTP_200_OK)
    
class AnotherUserEHRView(APIView):
    def get(self, request):
        username = request.GET.get("username")
        print(username)

        usr = User.objects.filter(username=username).first()
        print(usr)

        if usr is None:
            return Response({"message": "Username does not exist or invalide credentials provided"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            user_ehr_list = EHR.objects.filter(userid=usr)

            return Response(user_ehr_list, status=status.HTTP_200_OK)

class UserEHRCreateView(APIView):

    def put(self, request):
        user = request.user
        name = request.data.get("name")
        description = request.data.get("description")   

        created_at = request.data.get("created_at")

        file_obj = request.data['file']
        text = ocr_from_image(file_obj)

        ehr = EHR.objects.create(userid=user, name=name, description=description, data=text, created_at=created_at)
        ehr.save()

        return Response(status=status.HTTP_202_ACCEPTED)

    
class SearchView(APIView):
    def get(self, request, format=None):
        query = request.GET.get('q', '')
        family = request.user.fid
        
        if family is not None:
            family_members = User.objects.filter(fid=family)

            if query:
                results = SearchQuerySet().models(EHR).filter(content=query, user__in=family_members)
                serialized_results = EHRSerializer(results, many=True).data
            else:
                serialized_results = []

            return Response({'query': query, 'results': serialized_results}, status=status.HTTP_200_OK)
        
        else:
            if query:
                results = SearchQuerySet().models(EHR).filter(content=query, user=request.user)
                serialized_results = EHRSerializer(results, many=True).data
            else:
                serialized_results = []

            return Response({'query': query, 'results': serialized_results}, status=status.HTTP_200_OK)