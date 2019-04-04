# -*- coding: utf-8 -*-

from django.urls import path
from django.views.generic.base import RedirectView
from . import views
urlpatterns = [
    # 首页的URL
    path('', views.index),
    # path('favicon.ico',RedirectView.as_view(url=r'static/img/favicon.ico')),
]