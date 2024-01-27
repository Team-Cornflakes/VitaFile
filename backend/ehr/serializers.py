from rest_framework import serializers
from .models import EHR

class EHRSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(max_length=None, use_url=True)
    class Meta:
        model = EHR
        fields = '__all__'
