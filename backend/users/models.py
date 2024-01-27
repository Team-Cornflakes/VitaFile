from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.text import gettext_lazy
from family.models import Family  # Import the Family model
from .manager import CustomUserManager

class User(AbstractUser):
    SEX_CHOICES = (
        ("MALE", "Male"),
        ("FEMALE", "Female"),
        ("OTHER", "Other"),
    )
    userid = models.AutoField(primary_key=True)
    fid = models.ForeignKey(Family, on_delete=models.SET_NULL, null=True)
    sex = models.CharField(max_length=50, choices=SEX_CHOICES)
    dob = models.DateField(gettext_lazy("Date"), editable=True)
    contact_no = models.CharField(max_length=15)  # Add the contact_no field

    objects = CustomUserManager()

    def __str__(self) -> str:
        return super().first_name + " " + super().last_name