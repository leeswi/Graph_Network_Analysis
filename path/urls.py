# -*- coding: utf-8 -*-
from django.urls import path
from . import views

urlpatterns = [
    path('path.html', views.path),
    path('test.html', views.test),
    path('index-manage.html', views.index_manage),
    path('relationship.html', views.relationship),
    path('<Manage>', views.Manage),
]