# -*- coding: utf-8 -*-
from django.urls import path
from . import views

urlpatterns = [
    path('', views.project),
    path('analysis',views.analysis),
    path('<project_manage>', views.pro_manage),
]
# -*- coding: utf-8 -*-