from django.shortcuts import render,redirect
from django.http import HttpResponse
from index.Neo4j_model import Neo4j_Object
from path.models import labels_key,algo_module
from django.core import serializers
import xlwt as ExcelWrite
import xlrd,json
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
    title = "系统设置"
    username = request.user.username
    if not username:
        return redirect('/user/login.html')
    else:
        algo_card = list(algo_module.objects.all().values('id','algo_name','algo_content','algo_date'))
        return render(request, 'index-manage.html', locals())

def compare(request):
    title = "对比分析"
    username = request.user.username
    if not username:
        return redirect('/user/login.html')
    else:
        return render(request, 'compare.html', locals())

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
        ret = request.POST.get('return_value','')
        if (name and content):
            try:
                algo_module.objects.create(algo_name=name, algo_content=content,algo_return=ret)
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
    if (Manage == 'exportxls'):
        data = labels_key.objects.all()
        header = ['labels','main_key','second_key']
        xls = ExcelWrite.Workbook()
        sheet = xls.add_sheet("Sheet1")
        i = 0
        for each_header in header:
            sheet.write(0, i, each_header)
            i = i + 1
        for i in range(len(data)):
            sheet.write(i+1, 0, data[i].labels)
            sheet.write(i+1, 1, data[i].main_key)
            sheet.write(i+1, 2, data[i].second_key)
        xls.save('labels_key.xls')
        return HttpResponse(200)
    if (Manage == 'importxls'):
        # file_path = request.POST.get('file')
        # # print(file_path)
        try:
            data = xlrd.open_workbook('labels_key.xls')
        except Exception as e:
            print(e)
            return HttpResponse(0)
        else:
            table = data.sheets()[0]
            nrow = table.nrows
            for i in range(1,nrow):
                label = table.cell(i,0).value
                main_key = table.cell(i,1).value
                second_key = table.cell(i, 2).value
                try:
                    res = labels_key.objects.get(labels=label)
                except:
                    labels_key.objects.create(labels=label, main_key=main_key, second_key=second_key)
                else:
                    labels_key.objects.filter(labels=label).update(main_key=main_key, second_key=second_key)
            return HttpResponse(200)

def for_compare(request,ajax):
    graph = Neo4j_Object()
    label = request.POST.get('label', '')
    rela = request.POST.get('rela', '')
    key1 = request.POST.get('key1', '')
    if1 = request.POST.get('if1', '')
    content1 = request.POST.get('content1', '')
    if(ajax=='pagerank'):
        res = graph.GetPageRankWithCypher(label,rela,key1,if1,content1)
        res_ = []
        for i in res:
            temp = {}
            node = i['node']
            label = str(node.labels)
            label = label[1:]
            property = get_property(label)
            if(property!='未知节点'):
                temp['node'] = node[property]
            else:
                temp['node'] = property
            temp['label'] = label
            temp['score'] = round(i['score'],3)
            res_.append(temp)
        # print(res_)
        return HttpResponse(json.dumps(res_))
    if(ajax=='count'):
        res = graph.GetCompareGraph(label,rela,key1,if1,content1)
        all_nodes = graph.GetNodesCounts()
        all_labels = graph.GetLabels()
        all_relas = graph.GetRelaCounts()
        result = {}
        result['nodenum'] = res[0]['nodenum']
        result['allnode'] = all_nodes
        result['labelnum'] = res[0]['labelnum']
        result['alllabel'] = len(all_labels)
        result['relanum'] = res[1]['relanum']
        result['allrelas'] = all_relas
        result['avgdegree'] = round(res[2]['degree']/res[0]['nodenum'],2)
        result['avgCC'] = round(res[3]['averageClusteringCoefficient'],3)
        return HttpResponse(json.dumps(result))


def get_property(label):
    # 获取映射表记录
    try:
        property = labels_key.objects.get(labels=label)
    except:
        property = '未知节点'
    else:
        if (property.main_key):
            property = property.main_key
        elif (property.second_key):
            property = property.second_key
    return property
