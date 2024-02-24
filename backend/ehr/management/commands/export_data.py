from django.core.management.base import BaseCommand
from ehr.models import EHR

class Command(BaseCommand):
    help = 'Export data from EHR model'

    def handle(self, *args, **options):
        ehrs = EHR.objects.all().values()
        fhir_patients = []
        for ehr in ehrs:
            fhir_patient = {
                "resourceType": "Patient",
                "id": str(ehr["id"]),
                "identifier": [
                    {
                        "use": "official",
                        "system": "your-system",
                        "value": str(ehr["userid_id"])
                    }
                ],
                "name": [
                    {
                        "use": "official",
                        "text": ehr["name"]
                    }
                ],
                "text": {
                    "status": "generated",
                    "div": ehr["data"]
                },
            }
            fhir_patients.append(fhir_patient)
        for patient in fhir_patients:
            print(patient)