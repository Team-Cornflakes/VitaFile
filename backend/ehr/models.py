from django.db import models

def upload_to(instance, filename):
    return 'ehr/{filename}'.format(filename=filename)
# Create your models here.
class EHR(models.Model):
    id = models.AutoField(primary_key=True)
    userid = models.ForeignKey('users.User', on_delete=models.CASCADE) 
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    data = models.TextField()
    summary = models.TextField(default='')
    translated_french = models.TextField(default='')
    translated_hindi = models.TextField(default='')
    translated_spanish = models.TextField(default='')
    translated_mandarin = models.TextField(default='')
    created_at = models.DateTimeField(auto_now_add=True)
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)