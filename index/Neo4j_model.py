# -*- coding: utf-8 -*-
from py2neo import Graph,RelationshipMatcher
import re
from project.models import project_module
class Neo4j_Object(object):

    def __init__(self,url='http://localhost:11012',user='neo4j',pwd='123'):
        """数据初始化"""
        self.graph = Graph(url, username=user, password=pwd)
        self.links = []
        self.nodes = []
        self.labels = {}
        self.index = ''

        #配置文件读取索引
        filename = "sys.conf"  # 相对路径,文件在.py文件所在的目录中
        try:
            fobj = open(filename, 'r')
        except IOError as e:
            print(e)
        else:
            res = fobj.read()
            pattern = re.compile(r"(?<=index=)[a-zA-Z0-9].*")
            self.index = re.findall(pattern, res, flags=0)[0]

    #获取节点数量
    def GetNodesCounts(self):
        cql = "match (n) return count(n)"
        counts = self.graph.run(cql).data()
        if counts:
            return counts[0]['count(n)']
        else:
            return 0

    #获取关系数量
    def GetRelaCounts(self):
        cql = "MATCH (n)-[r]->(m) RETURN count(r)"
        counts = self.graph.run(cql).data()
        if counts:
            return counts[0]['count(r)']
        else:
            return 0

    #查询所有关系
    def GetRela(self):
        cql = "MATCH (n)-[r]->(m) return DISTINCT type(r) as relaType"
        res = self.graph.run(cql).data()
        if res:
            return res
        else:
            return 0

    #根据标签查询所有属性
    def GetKeys(self,label):
        cql = "match (n:%s) return distinct keys(n) as keys" %label
        res = self.graph.run(cql).data()
        if res:
            return res
        else:
            return 0

    #查询所有标签及数目
    def GetLabels(self):
        cql = "match (n) return distinct labels(n) as name,count(*) as value"
        res = self.graph.run(cql).data()
        # [{'labels': ['Database'], 'nums': 2}, {'labels': ['Release'], 'nums': 8}, {'labels': ['Language'], 'nums': 3},
        # {'labels': ['Feature'], 'nums': 2},
        # {'labels': ['Licence'], 'nums': 3}, {'labels': ['Date'], 'nums': 2}, {'labels': ['Distribution'], 'nums': 3}]
        if res:
            for i in res:
                i['name'] = i['name'][0]
            return res
        else:
            return 0

    def getProperty(self,label):
        cql = "match (n:%s) return keys(n) as keys" % label
        res = self.graph.run(cql).data()
        return res[0]

    def getRelationship(self,label):
        cql = "match (n:%s)-[r]-(m) return distinct type(r) as keys" % label
        res = self.graph.run(cql).data()
        return res

    def GetIndex(self):
        cql = "CALL apoc.index.list()"
        res = self.graph.run(cql).data()
        if res:
            return res
        else:
            return 0

    def GetIndexlist(self):
        cql = "CALL apoc.index.search(\""+self.index+"\", '*') yield node return labels(node) as labels,node"
        res = self.graph.run(cql).data()
        return res

    def GetSearch(self,query):
        cql = "call apoc.index.search(\""+self.index+"\",\"*"+query+"*\") yield node return labels(node) as labels,node"
        res = self.graph.run(cql).data()
        return res

    def GetSearchAll(self,query,label,key):
        #全库精确查询
        # cql = '''
        # match (node:%s{%s:"%s"}) return labels(node) as labels,node
        # ''' %(label,key,query)
        #全库模糊查询
        query = ".*"+query+".*"
        cql = '''
        match (node:%s) where node.%s =~'%s' return labels(node) as labels,node
        ''' %(label,key,query)
        res = self.graph.run(cql).data()
        return res

    def GetMore(self,index,content,label):
        print(content)
        if(',' in label):
            label = label.split(',')[0]
        # key = labels_key.objects.get(labels=label)
        # key = key.main_key
        print(label)
        if not content.isdigit():
            cql = '''
            match (n:%s{%s:"%s"}) return properties(n) as pro
            ''' %(label,index,content)
        else:
            cql = "match (n:%s{%s:%s}) return properties(n) as pro" % (label, index, content)
        res = self.graph.run(cql).data()
        return res

    def GetGraph(self,index,content,label,deepth=3):
        # key = labels_key.objects.get(labels=label)
        # key = key.main_key
        if (',' in label):
            label = label.split(',')[0]
        cql = '''match p=(m)-[*1..%d]-(n:%s{%s:"%s"}) with *,relationships(p) AS r return r''' %(deepth,label,index,content)
        res = self.graph.run(cql).data()
        return res

    #获取整体图结构
    def GetGraphInfo(self):
        # cql = "call db.schema() yield relationships,nodes return relationships as r"
        cql = "call db.schema() yield relationships,nodes return nodes as r"
        res = self.graph.run(cql).data()
        # res = self.rawrela_to_rela(res)
        return res

    def GetShortTestPath(self,s_label,s_key,s_content,e_label,e_key,e_content,weight):
        cql1 = '''
        MATCH (start:%s{%s:"%s"}),(end:%s{%s:"%s"})
        CALL algo.shortestPath.stream(start, end, "%s")
        YIELD nodeId,cost
        WITH nodeId,cost
        CALL apoc.get.nodes(nodeId)
        YIELD node
        RETURN node
        ''' %(s_label,s_key,s_content,e_label,e_key,e_content,weight)
        res_node = self.graph.run(cql1).data()
        relmatch = RelationshipMatcher(self.graph)
        rela = []
        for i in range(len(res_node) - 1):
            temp = (list(relmatch.match(nodes=(res_node[i]['node'], res_node[i + 1]['node']))))
            for j in temp:
                rela.append(j)
        return rela

    def GetKSP(self,s_label,s_key,s_content,e_label,e_key,e_content,k,weight):
        cql = '''
        MATCH (start:%s{%s:"%s"}), (end:%s{%s:"%s"})
        CALL algo.kShortestPaths.stream(start, end, %s, "%s" ,{direction:'OUTGOING', path: true})
        YIELD index, nodeIds, costs,path
        RETURN [node in algo.getNodesById(nodeIds) | node] AS nodes,
               costs,
               reduce(acc = 0.0, cost in costs | acc + cost) AS totalCost,
               path
        ''' %(s_label,s_key,s_content,e_label,e_key,e_content,k,weight)
        res = self.graph.run(cql).data()
        relmatch = RelationshipMatcher(self.graph)
        rela = []
        for i in res:
            for j in range(len(i['nodes']) - 1):
                temp = (list(relmatch.match(nodes=(i['nodes'][j], i['nodes'][j + 1]))))
                for k in temp:
                    rela.append(k)
        return rela

    def GetPageRank(self,label,rela='',weight=''):
        cql = '''
        CALL algo.pageRank.stream("%s", "%s", {
            iterations:20, dampingFactor:0.85, weightProperty: "%s"
        })
        YIELD nodeId, score
        WITH nodeId,score
        CALL apoc.get.nodes(nodeId)
        YIELD node
        RETURN node,score
        ''' %(label,rela,weight)
        res_node = self.graph.run(cql).data()
        return res_node

    def FindRela(self,s_label,s_key,s_content,e_label,e_key,e_content,deepth):
        deepth = int(deepth)
        cql = '''
        match p=(m:%s{%s:"%s"})-[*1..%d]-(n:%s{%s:"%s"}) with *,relationships(p) AS r return r
        ''' %(s_label,s_key,s_content,deepth,e_label,e_key,e_content)
        res = self.graph.run(cql).data()
        return res

    def GetDegrees(self): #度分布
        cql = '''call apoc.stats.degrees yield mean'''
        res = self.graph.run(cql).data()
        res = round(res[0]['mean'], 2)
        return res

    def GetAverageClusteringCoefficient(self): #平均聚类系数
        cql = '''
        call algo.triangleCount('','',{write:false}) YIELD averageClusteringCoefficient;
        '''
        res = self.graph.run(cql).data()
        res = round(res[0]['averageClusteringCoefficient'], 3)
        return res

    def GetLouvai(self):#模块化计算
        cql = '''
        CALL algo.louvain(
        'MATCH (p) RETURN id(p) as id',
        'MATCH (p1)-[f]-(p2)
        RETURN id(p1) as source, id(p2) as target, f.weight as weight',
        {graph:'cypher'})
        YIELD communityCount
        '''
        res = self.graph.run(cql).data()
        res = res[0]['communityCount']
        return res

    def ProjectRunCql(self,algo,algo_id):
        cql = algo
        print(cql)
        try:
            res = self.graph.run(cql).data()
        except Exception as e:
            print(e)
            return e
        else:
            project_list = project_module.objects.get(id=algo_id)
            algo_return = project_list.project_algo.algo_return
            # print(algo_return)
            if(algo_return=='节点'):
                rela = self.node_to_rela(res)
                return rela
            elif(algo_return=='关系'):
                rela = self.rawrela_to_rela(res)
                return rela

    def node_to_rela(self,node_object): #节点转关系
        relmatch = RelationshipMatcher(self.graph)
        rela = []
        for i in range(len(node_object) - 1):
            temp = (list(relmatch.match(nodes=(node_object[i]['node'], node_object[i + 1]['node']))))
            for j in temp:
                rela.append(j)
        return rela

    def rawrela_to_rela(self,raw_rela):
        input = []
        for i in raw_rela:
            for j in i['r']:
                if j not in input:
                    input.append(j)
        return input

    #中心性算法
    def closeness(self,label,link,property):
        cql = '''
        CALL algo.closeness.stream("%s", "%s")
        YIELD nodeId, centrality
        RETURN algo.getNodeById(nodeId).%s AS node, nodeId AS id,centrality
        ORDER BY centrality DESC;
        ''' %(label,link,property)
        res = self.graph.run(cql).data()
        return res

    def harmonic_closeness(self, label, link, property):
        cql = '''
        CALL algo.closeness.harmonic.stream("%s", "%s") YIELD nodeId, centrality
        RETURN algo.getNodeById(nodeId).%s AS node, nodeId AS id,centrality
        ORDER BY centrality DESC
        ''' %(label,link,property)
        res = self.graph.run(cql).data()
        return res

    def PageRank(self, label, link, property):
        cql = '''
        CALL algo.pageRank.stream("%s", "%s", {
            iterations:20, dampingFactor:0.85, weightProperty: "weight"
        })
        YIELD nodeId, score
        RETURN algo.getNodeById(nodeId).%s AS node, nodeId AS id, score as centrality
        ORDER BY score DESC
        ''' %(label,link,property)
        res = self.graph.run(cql).data()
        return res

    def ArticleRank(self, label, link, property):
        cql = '''
        CALL algo.articleRank.stream("%s", "%s", {iterations:20, dampingFactor:0.85})
        YIELD nodeId, score
        RETURN algo.getNodeById(nodeId).%s AS node, nodeId AS id, score as centrality
        ORDER BY score DESC
        ''' %(label,link,property)
        res = self.graph.run(cql).data()
        return res

    def eigenvector(self, label, link, property):
        cql = '''
        CALL algo.eigenvector.stream("%s", "%s", {normalization: "max"})
        YIELD nodeId, score
        RETURN algo.getNodeById(nodeId).%s AS node, nodeId AS id, score as centrality
        ORDER BY score DESC
        ''' %(label,link,property)
        res = self.graph.run(cql).data()
        return res

    #社区检测算法
    def LPA(self,label,link,property,name):
        cql = '''
        CALL algo.labelPropagation.stream("%s", "%s",{direction: "OUTGOING", iterations: 10})
        YIELD nodeId,label
        RETURN algo.getNodeById(nodeId).%s as name,label as community
        ''' % (label, link, property)
        res = self.graph.run(cql).data()
        if(name):
            community_list = []
            for i in res:
                if(i['name']==name):
                    community = i['community']
                    break
            for j in res:
                if(j['community']==community):
                    community_list.append(j)
            return community_list
        return res

    def Louvain(self,label,link,property,name):
        cql = '''
        CALL algo.louvain.stream("%s", "%s", {includeIntermediateCommunities: true})
        YIELD nodeId, communities
        RETURN algo.getNodeById(nodeId).%s as name,communities as community
        ''' % (label, link, property)
        res = self.graph.run(cql).data()
        if (name):
            community_list = []
            for i in res:
                if (i['name'] == name):
                    community = i['community']
                    break
            for j in res:
                if (j['community'] == community):
                    community_list.append(j)
            return community_list
        return res

    def UnionFind(self,label,link,property,name):
        cql = '''
        CALL algo.unionFind.stream("%s", "%s", {})
        YIELD nodeId,setId
        RETURN algo.getNodeById(nodeId).%s AS name,setId AS community
        ''' % (label, link, property)
        res = self.graph.run(cql).data()
        if (name):
            community_list = []
            for i in res:
                if (i['name'] == name):
                    community = i['community']
                    break
            for j in res:
                if (j['community'] == community):
                    community_list.append(j)
            return community_list
        return res
    
    def SCC(self,label,link,property,name):
        cql = '''
        CALL algo.scc("%s","%s", {write:true,partitionProperty:'partition'})
        YIELD loadMillis, computeMillis, writeMillis, setCount, maxSetSize, minSetSize;
        ''' % (label, link)
        cql1 = '''
        MATCH (u:%s)
        RETURN u.partition as community,u.%s as name
        '''  %(label,property)
        cql2 = '''
        MATCH (u:%s) remove u.partition
        ''' % (label)
        res = self.graph.run(cql).data()
        res1 = self.graph.run(cql1).data()
        res2 = self.graph.run(cql2).data()
        if (name):
            community_list = []
            for i in res1:
                if (i['name'] == name):
                    community = i['community']
                    break
            for j in res1:
                if (j['community'] == community):
                    community_list.append(j)
            return community_list
        return res1

    #获取地理信息
    def GetGeo(self,label,property,longitude,latitude,city,data):
        if(city == '' and data == ''):
            cql = '''
            match (n:%s) return n.%s as name,n.%s as longitude,n.%s as latitude
            ''' %(label,property,longitude,latitude)
        elif(city == '' and data != ''):
            cql = '''
            match (n:%s) return n.%s as name,n.%s as longitude,n.%s as latitude,n.%s as value
            ''' % (label, property, longitude, latitude,data)
        elif(city != '' and data != ''):
            cql = '''
            match (n:%s) return n.%s as name,n.%s as city,n.%s as value
            ''' %(label,property,city,data)
        res = self.graph.run(cql).data()
        return res

    def GetSun(self,label,city,location):
        res = {}
        for i in location:
            cql = '''
                match (n:%s)
                where n.%s =~ '.*%s.*'
                return count(n) as num
            ''' %(label,city,i)
            result = self.graph.run(cql).data()
            res[i] = result[0]['num']
        return res
    #获取坐标
    def GetCoordinate(self,label,property,longitude,latitude):
        cql = '''
            match (n:%s) return n.%s as title,labels(n) as type,n.%s as longitude,n.%s as latitude
        ''' % (label, property, longitude, latitude)
        res = self.graph.run(cql).data()
        return res

    def GetPoint(self,label,property,longitude,latitude,query):
        cql = '''
            match (n:%s{%s:"%s"}) return n.%s as title,labels(n) as type,n.%s as longitude,n.%s as latitude
        ''' % (label, property, query,property,longitude, latitude)
        res = self.graph.run(cql).data()
        return res