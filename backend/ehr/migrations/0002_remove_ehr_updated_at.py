# Generated by Django 4.2.9 on 2024-01-27 07:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ehr', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ehr',
            name='updated_at',
        ),
    ]