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
from rest_framework import permissions
from .unisummarization import summary_text

User = get_user_model()

class UserEHRCreateView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request, format=None):
        # Handle GET request
        pass

    def post(self, request, format=None):
        file = request.FILES['file']  # get the uploaded image
        name = request.data.get('name')
        description = request.data.get('description')
        created_at = request.data.get('created_at')
        # Extract text from the image
        data = ocr_from_image(file.read())
        # Summarize the text
        summary = summary_text(data)  # Call the summarize_text function with the data

        # Create the EHR
        ehr = EHR(userid=request.user, data=data, summary=summary, image_url=file, name=name, description=description, created_at=created_at)
        ehr.save()

        return Response({"message": "EHR created successfully"}, status=status.HTTP_201_CREATED)

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
            user_ehr_list = list(EHR.objects.filter(userid=usr).values())

            return Response(user_ehr_list, status=status.HTTP_200_OK)

class GetEHRView(APIView):
    def get(self, request):
        ehr_id = request.GET.get("ehr_id")
        ehr = EHR.objects.filter(id=ehr_id).first()

        if ehr is None:
            return Response({"message": "EHR does not exist or invalide credentials provided"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(EHRSerializer(ehr).data, status=status.HTTP_200_OK)

class SearchView(APIView):
    def get(self, request, format=None):
        query = request.GET.get('q', '')
        family = request.user.fid
        
        if family is not None:
            family_members = User.objects.filter(fid=family).values_list('userid', flat=True)

            if query:
                results = SearchQuerySet().models(EHR).auto_query(query).filter(userid__in=list(family_members))
                serialized_results = EHRSerializer([result.object for result in results if result.object is not None], many=True).data
            else:
                serialized_results = []

            return Response({'query': query, 'results': serialized_results}, status=status.HTTP_200_OK)

        else:
            if query:
                results = SearchQuerySet().models(EHR).auto_query(query).filter(userid=request.user.userid)
                serialized_results = EHRSerializer([result.object for result in results if result.object is not None], many=True).data
            else:
                serialized_results = []

            return Response({'query': query, 'results': serialized_results}, status=status.HTTP_200_OK)