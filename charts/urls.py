# -*- coding: utf-8 -*-
from django.urls import path
from . import views

urlpatterns = [
    path('', views.charts),
    path('centrality',views.Centrality),
    path('CommunityDetection',views.CommunityDetection),
    path('getProperty',views.getProperty),
    path('GetGeo',views.getGeo),
    path('GetSun',views.getSun),
    path('GetGPS',views.getGPS),
    path('getRelationship',views.getRelationship),
]