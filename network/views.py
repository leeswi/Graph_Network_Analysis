from django.shortcuts import render,redirect
from index.Neo4j_model import Neo4j_Object
import json,copy,re
from django.http import HttpResponse
from path.models import labels_key
from django.core import serializers
# Create your views here.

def network(request):
    #登录验证
    title = "节点查询"
    username = request.user.username
    if not username:
        return redirect('/user/login.html')
    else:
        graph = Neo4j_Object()
        labels = graph.GetLabels()
        keyslist = list(labels_key.objects.all().values())
        return render(request, 'network.html', locals())

def getData(request,ajax): #接受ajax传来的数据进行查询和处理操作
    graph = Neo4j_Object()
    if(ajax=='query'):#索引查询
        index = graph.GetIndexlist()
        return HttpResponse(json.dumps(index))
    if(ajax=='search'):#网络视图查看深度为3的节点关系
        index = request.GET.get("index")
        index = index.split(',')
        content = request.GET.get("content") #暂不考虑两个标签导致内容多于两个出现逗号的情况
        label = request.GET.get("label")
        if(index and content and label):
            node_key = graph.GetMore(index[0],content,label)
            node_links = graph.GetGraph(index[0],content,label)
            input = []
            for i in node_links:
                for j in i['r']:
                    if j not in input:
                        input.append(j)
            GraphJson = getJson(input)
            GraphJson.append(node_key)
            keysList = list(labels_key.objects.all().values())
            GraphJson.append(keysList)
            print(json.dumps(GraphJson));
            return HttpResponse(json.dumps(GraphJson))
    if (ajax == 'keys'):#获取所有标签列表
        keys_list = []
        label = request.GET.get("label")
        keys = graph.GetKeys(label)
        for i in keys:
            for j in i['keys']:
                if j not in keys_list:
                    keys_list.append(j)
        return HttpResponse(json.dumps(keys_list))
    if(ajax == 'shortpath'):#最短路径查询
        start_label = request.POST.get('start_label','')
        start_key = request.POST.get('start_key','')
        start_content = request.POST.get('start_content','')
        end_label = request.POST.get('end_label','')
        end_key = request.POST.get('end_key','')
        end_content = request.POST.get('end_content','')
        weight = request.POST.get('weight','')
        #print(start_label,start_key,start_content)
        rela_input = graph.GetShortTestPath(start_label,start_key,start_content,end_label,end_key,end_content,weight)
        GraphJson = getJson(rela_input)
        return HttpResponse(json.dumps(GraphJson))
    if(ajax == 'ksp'):
        start_label = request.POST.get('start_label', '')
        start_key = request.POST.get('start_key', '')
        start_content = request.POST.get('start_content', '')
        end_label = request.POST.get('end_label', '')
        end_key = request.POST.get('end_key', '')
        end_content = request.POST.get('end_content', '')
        k = request.POST.get('k', '')
        weight = request.POST.get('weight', '')
        rela_input = graph.GetKSP(start_label,start_key,start_content,end_label,end_key,end_content,k,weight)
        GraphJson = getJson(rela_input)
        return HttpResponse(json.dumps(GraphJson))
    if(ajax == 'find'):
        label = request.POST.get('label', '')
        query = request.POST.get('query','')
        deepth = request.POST.get('deepth','')
        key = request.POST.get('key','')
        if(query and (key=='' or label=='选择对象标签')):#索引搜索
            result = graph.GetSearch(query)
        else:
            result = graph.GetSearchAll(query,label,key)#全局搜索
        for i in result:
            t_label = i['labels']
            key = []
            index = []
            for j in t_label: #有的节点两个标签，所以用循环
                try:
                    res = labels_key.objects.get(labels=j)
                except:
                    print('映射表无记录！')
                else:
                    if(res.main_key):
                        x = res.main_key
                        index.append(x)
                        key.append(i['node'][x])
                        # key.append(res.main_key)
                    elif(res.second_key):
                        x = res.second_key
                        index.append(x)
                        key.append(i['node'][x])
                        # key.append(res.second_key)
            if not key:
                key.append('未知节点')
            i['key'] = key
            i['index'] = index
        # print(result)
        return HttpResponse(json.dumps(result))
    if (ajax == 'pagerank'):
        label = request.POST.get('label', '')
        res = graph.GetPageRank(label=label)
        return HttpResponse(json.dumps(res))
    if (ajax == 'findrela'):
        start_label = request.POST.get('start_label', '')
        start_key = request.POST.get('start_key', '')
        start_content = request.POST.get('start_content', '')
        end_label = request.POST.get('end_label', '')
        end_key = request.POST.get('end_key', '')
        end_content = request.POST.get('end_content', '')
        deepth = request.POST.get('deepth', '')
        rela_input = graph.FindRela(start_label, start_key, start_content, end_label, end_key, end_content,deepth)
        input = []
        for i in rela_input:
            for j in i['r']:
                if j not in input:
                    input.append(j)
        GraphJson = getJson(input)
        return HttpResponse(json.dumps(GraphJson))
    if (ajax == 'getLouvai'):
        louvain = graph.GetLouvai()
        return HttpResponse(louvain)
    if (ajax == 'getIndex'):
        index = graph.GetIndex()
        return HttpResponse(json.dumps(index))
    if (ajax == 'getMainIndex'):
        filename = "sys.conf"  # 相对路径,文件在.py文件所在的目录中
        try:
            fobj = open(filename, 'r')
        except IOError as e:
            print(e)
            return HttpResponse(0)
        else:
            res = fobj.read()
            pattern = re.compile(r"(?<=index=)[a-zA-Z0-9].*")
            main_index = re.findall(pattern, res, flags=0)[0]
            print(main_index)
            if(main_index):
                return HttpResponse(json.dumps(main_index))
            else:
                return HttpResponse(0)
    if (ajax == 'setMainindex'):
        main_index = request.POST.get('main_index', '')
        filename = "sys.conf"
        try:
            fobj = open(filename, 'r')
        except IOError as e:
            print(e)
            return HttpResponse(0)
        else:
            res = fobj.read()
            fobj.close()
            res = (re.sub(re.compile(r"(?<=index=)[a-zA-Z0-9].*"),main_index,res))
            with open("sys.conf", "w") as f2:
                f2.write(res)
                return HttpResponse(1)



#处理从数据库获取的原始数据，转化成d3识别的数据格式
def getJson(input):
    print(input)
    node_link = []
    node = []
    links = []
    lists = input
    #print(len(lists))
    temp_node = [] #临时节点表，存储所有节点及其属性
    for i in lists:
        print(i)
        source = dict(i.start_node) #起始节点字典表
        target = dict(i.end_node) #结束节点字典表

        temp_link = {} #每一条边就是一个temp_link

        if(source not in temp_node):
            #为link建立索引的临时节点表
            temp_node.append(source)

            #实际node表的建立
            temp = copy.deepcopy(source)
            temp['label'] = str(i.start_node.labels)
            if temp not in node:
                node.append(temp)
        #建立link表，获取临时节点表的索引
        temp_link['source'] = temp_node.index(source) #一条表的起点节点索引号

        if(target not in temp_node):
            temp_node.append(target)
            temp = copy.deepcopy(target)
            temp['label'] = str(i.end_node.labels)
            if temp not in node:
                node.append(temp)
        temp_link['target'] = temp_node.index(target)
        temp_link['relation'] = str(i)
        links.append(temp_link)
    node_link.append(node)
    node_link.append(links)
    return node_link