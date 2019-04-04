from django.shortcuts import render,redirect
from django.http import HttpResponse
from .models import algo_module,project_module
from path.models import labels_key
from index.Neo4j_model import Neo4j_Object
from network.views import getJson
import re,json
# Create your views here.
def project(request):
    title = "项目管理"
    username = request.user.username
    if not username:
        return redirect('/user/login.html')
    else:
        project_list = list(project_module.objects.all())
        algo_list = list(algo_module.objects.all().values('algo_name'))
        return render(request, 'project.html', locals())

def analysis(request):
    title = "实例分析"
    username = request.user.username
    if not username:
        return redirect('/user/login.html')
    else:
        graph = Neo4j_Object()
        labels = graph.GetLabels()
        project_id = request.GET.get('id')
        project_list = project_module.objects.get(id=project_id)
        algo_mark = get_mark(project_list.project_algo.algo_content)
        json_algo_mark =json.dumps(algo_mark)
        keyslist = list(labels_key.objects.all().values())
        return render(request, 'analysis.html', locals())

def pro_manage(request,project_manage):
    if (project_manage == 'project_add'):
        name = request.POST.get('project-name', '')
        content = request.POST.get('project-content','')
        algo = request.POST.get('project-algo','')
        layout = request.POST.get('project-vis','')
        # data = request.FILES.get('project-data','')
        # data.save()
        if(algo):
            algo_name = algo_module.objects.get(algo_name=algo)
        else:
            algo_name = ''
        if (name and algo_name):
            try:
                project_module.objects.create(project_name=name,project_algo=algo_name,project_layout=layout,project_text=content)
            except Exception as e:
                print(e)
                error = "创建失败"
        else:
            error = "创建失败"
        return redirect('/project')
    if (project_manage == 'project_del'):
        project_id = request.POST.get('id', '')
        try:
            project_module.objects.filter(id=project_id).delete()
        except Exception as e:
            error = "操作失败:"+e
            return HttpResponse(error)
        else:
            return HttpResponse('成功删除')
    if (project_manage == 'project_start'):
        mark = request.POST.dict()
        project_list = project_module.objects.get(id=mark['id'])
        algo = project_list.project_algo.algo_content
        for key in mark:
            if(key!='id'):
                algo = algo.replace(key,mark[key])
        graph = Neo4j_Object()
        res = graph.ProjectRunCql(algo,mark['id']) #获取运行结果
        graph = getJson(res) #数据格式处理
        return HttpResponse(json.dumps(graph))

def get_mark(algo):
    pattern1 = re.compile(u'<[A-Z+]*>[0-9A-Za-z]*</[A-Z]*>')
    mark_list = pattern1.findall(algo)
    pattern2 = re.compile(u'(?<=>).*(?=<)')
    pattern3 = re.compile(u'(?<=<)[A-Z]*(?=>)')
    mark_dic = {}
    for i in mark_list:
        temp = {}
        value = pattern2.search(i).group(0)
        key = pattern3.search(i).group(0)
        temp['init'] = i
        temp['value'] = value
        try:
            mark_dic[key].append(temp)
        except:
            mark_dic[key]=[]
            mark_dic[key].append(temp)
    return mark_dic
