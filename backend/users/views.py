from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from google.cloud import texttospeech
from django.http import HttpResponse


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
        firstname = request.data.get("firstname")
        lastname = request.data.get("lastname")
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
            username=username, password=password, first_name=firstname,  last_name=lastname, email=email, dob=dob, sex=sex, contact_no=contact_no
        )

        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)


class GetUserView(APIView):
    def get(self, request):
        user = request.user
        if user is None:
            return Response({"message": "You are not logged in"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            name = user.first_name + " " + user.last_name
            return Response(name, status=status.HTTP_200_OK)

class SynthesizeView(APIView):
    def post(self, request):
        text = request.data.get('text')
        if not text:
            return Response({'error': 'No text provided'}, status=400)

        client = texttospeech.TextToSpeechClient()
        input_text = texttospeech.SynthesisInput(text=text)

        voice = texttospeech.VoiceSelectionParams(
            language_code="en-US",
            ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL,
        )

        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )

        response = client.synthesize_speech(
            request={"input": input_text, "voice": voice, "audio_config": audio_config}
        )

        # The response's audio_content is binary.
        audio_content = response.audio_content

        return HttpResponse(audio_content, content_type='audio/mp3')