from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


User = get_user_model()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class CreateUserView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("username")
        dob = request.data.get("dob")  
        sex = request.data.get("sex")
        contact_no = request.data.get("contact_no")

        if not username or not password or not email:
            return Response(
                {"error": "Username, password and email are required to register a user"},
                status=status.HTTP_400_BAD_REQUEST
            )

        existing_user = User.objects.filter(username=username).first()
        if existing_user:
            return Response(
                {"error": "User with this username already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        new_user = User.objects.create_user(
            username=username, password=password, email=email, dob=dob, sex=sex, contact_no=contact_no
        )

        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)