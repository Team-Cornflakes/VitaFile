from haystack import indexes
from .models import EHR

class EHRIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    name = indexes.CharField(model_attr='name')
    description = indexes.CharField(model_attr='description')
    data = indexes.CharField(model_attr='data')

    def get_model(self):
        return EHR
