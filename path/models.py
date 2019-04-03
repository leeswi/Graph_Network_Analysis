from django.db import models

# Create your models here.
class labels_key(models.Model):
    labels = models.CharField('标签',primary_key=True,max_length=30)
    main_key = models.CharField('主属性',max_length=30)
    second_key = models.CharField('次要属性',max_length=30)

class algo_module(models.Model):
    algo_name = models.CharField('算法名称',max_length=30)
    algo_content = models.TextField('内容')
    algo_date = models.DateTimeField('添加日期',auto_now_add = True)
    algo_return = models.CharField('返回值类型',max_length=20)

