from django.shortcuts import render,redirect,HttpResponse
from index.Neo4j_model import Neo4j_Object
import json
from path.models import labels_key
from django.core import serializers
from django.views.decorators.cache import cache_page

# from django.contrib.auth.decorators import login_required
#
# # @login_required(redirect_field_name='login')
# @login_required(login_url='/user/login.html')
# @cache_page(60 * 5)
def index(request):
    #登录验证
    username = request.user.username
    title = "数据概览"
    if not username:
        return redirect('/user/login.html')
    else:
        graph = Neo4j_Object()

        nodesCounts = graph.GetNodesCounts()
        labels = graph.GetLabels()
        labels_json = json.dumps(labels)
        #print(labels_json)
        lablesCount = len(labels) if(labels!=0) else 0

        relaCounts = graph.GetRelaCounts()
        relaType = graph.GetRela()
        relaTypeCounts = len(relaType) if(relaType!=0) else 0

        keyslist = serializers.serialize("json", labels_key.objects.all())

        degrees = graph.GetDegrees()
        averageClusteringCoefficient = graph.GetAverageClusteringCoefficient()
        # louvain = graph.GetLouvai()

        return render(request, 'index.html', locals())

    #读取数据