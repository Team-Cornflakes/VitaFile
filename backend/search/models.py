from users.models import User
from ehr.models import EHR
from haystack import indexes

class UserIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    # Add more fields to index here

    def get_model(self):
        return User

    def index_queryset(self, using=None):
        return self.get_model().objects.all()
    
class EHRIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    

    def get_model(self):
        return EHR

    def index_queryset(self, using=None):
        return self.get_model().objects.all()