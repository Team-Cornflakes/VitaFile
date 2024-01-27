from django.test import TestCase
from django.contrib.auth import get_user_model
from family.models import Family

User = get_user_model()

class UserTestCase(TestCase):
    def setUp(self):
        self.family1 = Family.objects.create(family_name="Family1")
        self.family2 = Family.objects.create(family_name="Family2")

    def test_create_user(self):
        user1 = User.objects.create(username="testuser1", email="test1@example.com", password="testpassword1", sex="MALE", dob="2000-01-01", contact_no="1234567890", fid=self.family1)
        user2 = User.objects.create(username="testuser2", email="test2@example.com", password="testpassword2", sex="FEMALE", dob="2000-01-01", contact_no="0987654321", fid=self.family2)

        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(user1.fid, self.family1)
        self.assertEqual(user2.fid, self.family2)

    def test_create_user_without_family(self):
        user = User.objects.create(username="testuser", email="test@example.com", password="testpassword", sex="MALE", dob="2000-01-01", contact_no="1234567890")

        self.assertEqual(User.objects.count(), 1)
        self.assertIsNone(user.fid)

    def test_create_user_with_same_username(self):
        User.objects.create(username="testuser", email="test@example.com", password="testpassword", sex="MALE", dob="2000-01-01", contact_no="1234567890", fid=self.family1)
        with self.assertRaises(Exception):
            User.objects.create(username="testuser", email="test@example.com", password="testpassword", sex="MALE", dob="2000-01-01", contact_no="1234567890", fid=self.family2)