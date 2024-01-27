from rest_framework import serializers
from .models import EHR

class EHRSerializer(serializers.ModelSerializer):
    class Meta:
        model = EHR
        fields = '__all__'
