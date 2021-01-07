from django.db import models

# Create your models here.
class StreetInfo(models.Model):
    startLng = models.FloatField()
    startLat = models.FloatField()
    endLng = models.FloatField()
    endLat = models.FloatField()