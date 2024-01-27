# Generated by Django 4.2.9 on 2024-01-27 11:51

from django.db import migrations, models
import ehr.models


class Migration(migrations.Migration):

    dependencies = [
        ('ehr', '0002_remove_ehr_updated_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='ehr',
            name='image_url',
            field=models.ImageField(blank=True, null=True, upload_to=ehr.models.upload_to),
        ),
    ]
