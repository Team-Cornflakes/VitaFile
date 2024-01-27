from django.test import TestCase
from .models import EHR
from django.contrib.auth import get_user_model
from family.models import Family

User = get_user_model()

class EHRModelTest(TestCase):
    @classmethod
    def setUpTestData(self):
        self.family1 = Family.objects.create(family_name="Family1")
        # Set up non-modified objects used by all test methods
        test_user = User.objects.create(username="testuser1", email="test1@example.com", password="testpassword1", sex="MALE", dob="2000-01-01", contact_no="1234567890", fid=self.family1)
        EHR.objects.create(userid=test_user, name='Test EHR', description='Test Description', data='Test Data')

    def test_name_label(self):
        ehr = EHR.objects.get(id=1)
        field_label = ehr._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'name')

    def test_name_max_length(self):
        ehr = EHR.objects.get(id=1)
        max_length = ehr._meta.get_field('name').max_length
        self.assertEqual(max_length, 100)

    def test_description_label(self):
        ehr = EHR.objects.get(id=1)
        field_label = ehr._meta.get_field('description').verbose_name
        self.assertEqual(field_label, 'description')

    def test_description_max_length(self):
        ehr = EHR.objects.get(id=1)
        max_length = ehr._meta.get_field('description').max_length
        self.assertEqual(max_length, 100)

    def test_data_label(self):
        ehr = EHR.objects.get(id=1)
        field_label = ehr._meta.get_field('data').verbose_name
        self.assertEqual(field_label, 'data')

    def test_created_at_label(self):
        ehr = EHR.objects.get(id=1)
        field_label = ehr._meta.get_field('created_at').verbose_name
        self.assertEqual(field_label, 'created at')

    def test_updated_at_label(self):
        ehr = EHR.objects.get(id=1)
        field_label = ehr._meta.get_field('updated_at').verbose_name
        self.assertEqual(field_label, 'updated at')