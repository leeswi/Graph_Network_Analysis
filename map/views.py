from django.shortcuts import render,redirect
from django.http import HttpResponse
from index.Neo4j_model import Neo4j_Object
from .models import layer
import json
from path.models import labels_key
# Create your views here.
def map(request):
    title = "地图视图"
    username = request.user.username
    if not username:
        return redirect('/user/login.html')
    else:
        graph = Neo4j_Object()
        labels = graph.GetLabels()
        layers = layer.objects.all().values('layer_name')
        return render(request, 'map.html', locals())

def GetCoordinate(request):
    graph = Neo4j_Object()
    choosed_layer = request.POST.get('layer', '')
    if(choosed_layer!=''):
        try:
            layer_data = layer.objects.get(layer_name=choosed_layer)
        except Exception as e:
            print(e)
            return HttpResponse(0)
        else:
            label = layer_data.layer_label
            longitude = layer_data.layer_longitude
            latitude = layer_data.layer_latitude
            property = layer_data.layer_property
    else:
        label = request.POST.get('label', '')
        longitude = request.POST.get('longitude', '')
        latitude = request.POST.get('latitude', '')
        property = request.POST.get('property', '')
    res = graph.GetCoordinate(label,property,longitude,latitude)
    Coordinate = []
    for i in res:
        temp = {}
        temp["title"] = i["title"]
        temp["type"] = i["type"][0] #暂不考虑两个标签的情况
        temp["point"] = str(i["longitude"])+"|"+str(i["latitude"])
        temp["isOpen"] = 1
        temp["property"] = property
        Coordinate.append(temp)
    return HttpResponse(json.dumps(Coordinate))

def GetRegion(request):
    graph = Neo4j_Object()
    label = request.POST.get('label', '')
    longitude = request.POST.get('longitude', '')
    latitude = request.POST.get('latitude', '')
    key = request.POST.get('property', '')
    if_ = request.POST.get('if_', '')
    content = request.POST.get('filter', '')
    res = graph.GetRegion(label,key,longitude,latitude,key,if_,content)
    Coordinate = []
    for i in res:
        temp = {}
        temp["title"] = i["title"]
        temp["type"] = i["type"][0] #暂不考虑两个标签的情况
        temp["point"] = str(i["longitude"])+"|"+str(i["latitude"])
        temp["isOpen"] = 1
        temp["property"] = key
        Coordinate.append(temp)
    return HttpResponse(json.dumps(Coordinate))

def AddLayer(request):
    label = request.POST.get('label', '')
    longitude = request.POST.get('longitude', '')
    latitude = request.POST.get('latitude', '')
    property = request.POST.get('property', '')
    try:
        layer.objects.create(layer_name=label,layer_label=label,layer_longitude=longitude,layer_latitude=latitude,layer_property=property)
    except Exception as e:
        print(e)
        return HttpResponse(0)
    else:
        return HttpResponse(200)

def GetPoint(request):
    graph = Neo4j_Object()
    label = request.POST.get('label', '')
    longitude = request.POST.get('longitude', '')
    latitude = request.POST.get('latitude', '')
    property = request.POST.get('property', '')
    query = request.POST.get('query', '')
    res = graph.GetPoint(label,property,longitude,latitude,query)
    Coordinate = []
    for i in res:
        temp = {}
        temp["title"] = i["title"]
        temp["type"] = i["type"][0]  # 暂不考虑两个标签的情况
        temp["point"] = str(i["longitude"]) + "|" + str(i["latitude"])
        temp["isOpen"] = 1
        temp["property"] = property
        Coordinate.append(temp)
    return HttpResponse(json.dumps(Coordinate))

def GetMore(request):
    graph = Neo4j_Object()
    label = request.POST.get('label', '')
    property = request.POST.get('property', '')
    content = request.POST.get('content', '')
    res = graph.GetMore(property,content,label)
    return HttpResponse(json.dumps(res))