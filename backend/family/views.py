from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from rest_framework import status
from .models import Family

User = get_user_model()

class CreateFamilyView(APIView):
    def post(self, request):
        user = request.user
        family = user.fid
        user_to_add = request.data.get("username")
        passw = request.data.get("password")

        if not family:
            family = Family.objects.create(family_name=user.first_name+"_family")
            user.fid= family
            user.save()

        user2 = authenticate(username=user_to_add, password=passw)
        if user2 is None:
            return Response({"message": "Username does not exist or invalide credentials provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            user2.fid = family
            user2.save()
            return Response({"message": "Family created successfully"}, status=status.HTTP_201_CREATED)
        


class FamilyMembersView(APIView):
    def get(self, request):
        user = request.user
        family_id = user.fid
        if family_id is None:
            return Response({"message": "You are not part of any family"}, status=status.HTTP_400_BAD_REQUEST)
        # Get all users with the same family id
        family_members = User.objects.filter(fid=family_id)

        # Convert the QuerySet to a list of dictionaries
        family_members_list = list(family_members.values())
        resp = []
        for member in family_members_list:
            print(member)
            temp = {
                "first_name": member["first_name"],
                "last_name": member["last_name"],
                "sex" : member["sex"],
                "dob" : member["dob"],
                "contact_no" : member["contact_no"]
            }
            resp.append(temp)

        return Response(resp, status=status.HTTP_200_OK)