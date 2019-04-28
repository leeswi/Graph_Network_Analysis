# -*- coding: utf-8 -*-

from django.urls import path
from . import views

urlpatterns = [
    path('map.html', views.map),
    path('GetCoordinate', views.GetCoordinate),
    path('GetRegion', views.GetRegion),
    path('GetPoint', views.GetPoint),
    path('AddLayer', views.AddLayer),
    path('GetMore', views.GetMore),
]