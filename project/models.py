from django.db import models
from path.models import algo_module
# Create your models here.
class project_module(models.Model):
    project_name = models.CharField('项目名称',max_length=30)
    project_algo = models.ForeignKey(algo_module,on_delete=models.CASCADE,default='')
    project_file = models.FilePathField('外部数据',path='./upload/')
    project_date = models.DateTimeField('添加日期',auto_now_add = True)
    project_text = models.TextField('描述',default='')
    project_layout =  models.CharField('布局',max_length=30)