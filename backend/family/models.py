from django.db import models

class Family(models.Model):
    fid = models.AutoField(primary_key=True)
    family_name = models.CharField(max_length=100)
    
    def __str__(self) -> str:
        return self.family_name