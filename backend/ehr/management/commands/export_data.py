from django.core.management.base import BaseCommand
from ehr.models import EHR
import json

class Command(BaseCommand):
    help = 'Export data from EHR model'

    def handle(self, *args, **options):
        ehrs = EHR.objects.all().values()
        with open('fhir_patients.json', 'w') as f:
            for ehr in ehrs:
                fhir_patient = {
                    "resourceType": "Patient",
                    "id": str(ehr["id"]),
                    "identifier": [
                        {
                            "use": "official",
                            "system": "urn:uuid:myproject:identifiers:userid",
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
                f.write(json.dumps(fhir_patient) + '\n')