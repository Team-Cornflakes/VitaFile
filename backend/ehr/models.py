from django.db import models

# Create your models here.
class EHR(models.Model):
    id = models.AutoField(primary_key=True)
    userid = models.ForeignKey('users.User', on_delete=models.CASCADE) 
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    data = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)