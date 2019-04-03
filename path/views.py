from django.shortcuts import render,redirect
from django.http import HttpResponse
from index.Neo4j_model import Neo4j_Object
from path.models import labels_key,algo_module
from django.core import serializers
import json
# Create your views here.
def path(request):
    title = "路径探索"
    username = request.user.username
    if not username:
        return redirect('/user/login.html')
    else:
        graph = Neo4j_Object()
        labels = graph.GetLabels()
        keyslist = list(labels_key.objects.all().values())
        return render(request, 'path.html', locals())

def test(request):
    title = "测试界面"
    username = request.user.username
    if not username:
        return redirect('/user/login.html')
    else:
        graph = Neo4j_Object()
        labels = graph.GetLabels()
        keyslist = list(labels_key.objects.all().values())
        return render(request, 'test.html', locals())

def relationship(request):
    title = "关系发现"
    username = request.user.username
    if not username:
        return redirect('/user/login.html')
    else:
        graph = Neo4j_Object()
        labels = graph.GetLabels()
        keyslist = list(labels_key.objects.all().values())
        return render(request, 'relationship.html', locals())

def index_manage(request):
    username = request.user.username
    if not username:
        return redirect('/user/login.html')
    else:
        algo_card = list(algo_module.objects.all().values('id','algo_name','algo_content','algo_date'))
        return render(request, 'index-manage.html', locals())

def Manage(request,Manage):
    if (Manage == 'keysManage'):
        sql_result = serializers.serialize("json", labels_key.objects.all())
        return HttpResponse(sql_result)
    if (Manage == 'keysadd'):
        label = request.POST.get('label', '')
        main_key = request.POST.get('key1', '')
        second_key = request.POST.get('key2', '')
        if(label and main_key):
            try:
                labels_key.objects.create(labels=label, main_key=main_key, second_key=second_key)
            except:
                error = "创建失败"
                return render(request, 'index-manage.html', locals())
            else:
                return redirect('index-manage.html')
        else:
            error = "创建失败"
            return render(request, 'index-manage.html', locals())
    if(Manage == 'keysdel'):
        label = request.POST.getlist('label')
        if(label):
            for i in label:
                try:
                    labels_key.objects.filter(labels=i).delete()
                except:
                    return HttpResponse(0)
            return HttpResponse(200)
        else:
            return HttpResponse(0)
    if (Manage == 'algoadd'):
        name = request.POST.get('algoname', '')
        content = request.POST.get('algocontent', '')
        if (name and content):
            try:
                algo_module.objects.create(algo_name=name, algo_content=content)
            except Exception as e:
                error = "创建失败"
                print(e)
                # return render(request, 'index-manage.html', locals())
                return redirect('index-manage.html')
            else:
                return redirect('index-manage.html')
        else:
            error = "创建失败"
            # return render(request, 'index-manage.html', locals())
            return redirect('index-manage.html')
    if (Manage == 'algodel'):
        algo_id = request.POST.get('id', '')
        try:
            algo_module.objects.filter(id=algo_id).delete()
        except Exception as e:
            error = "操作失败:" + e
            return HttpResponse(error)
        else:
            return HttpResponse(200)