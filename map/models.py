from django.db import models

# Create your models here.
class layer(models.Model):
    layer_name = models.CharField('图层名',max_length=30)
    layer_label = models.CharField('标签',max_length=30)
    layer_longitude = models.CharField('经度',max_length=30)
    layer_latitude = models.CharField('纬度',max_length=30)
    layer_property = models.CharField('属性',max_length=30)