from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Family

class CreateFamilyView(APIView):
    def post(self, request):
        user = request.user
        name = user.username + "_family"

        if not name:
            return Response(
                {"error": "Name and members are required to create a family"},
                status=status.HTTP_400_BAD_REQUEST
            )

        new_family = Family.objects.create(family_name=name)

        return Response({"message": "Family created successfully"}, status=status.HTTP_201_CREATED)