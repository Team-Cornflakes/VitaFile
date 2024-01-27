from django.test import TestCase
from .models import Family
# Create your tests here.

class FamilyTestCase(TestCase):
    def setUp(self):
        Family.objects.create(family_name="Test Family")
    
    def test_family_name(self):
        assert Family.objects.get(family_name="Test Family").family_name == "Test Family" 