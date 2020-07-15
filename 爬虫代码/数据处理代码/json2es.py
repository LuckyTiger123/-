# rasa 20180212
# 使用ES python api插入geojson面数据（map.geojson）

import json
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk
import hashlib

class ArticlePipelines():
    # 初始化
    def __init__(self):
        # elasticsearch的index
        self.index = "trygame"
        # elasticsearch的type
        self.type = "_doc"
        # elasticsearch的ip加端口
        self.es = Elasticsearch(hosts="39.98.125.235:9200")


    # 必须实现的方法，用来处理yield返回的数据
    def process_item(self, item, spider):

        result = self.checkDocumentExists(item)
        if result == False:
            self.createDocument(item)
        else:
            pass
            # self.updateDocument(item)

    # 添加文档
    def createDocument(self, item):
        body = {
            "game_name": item['game_name'],
            "detail_url": item['detail_url'],
            "release_date": item['release_date'],
            "publisher": item['publisher'],
            "developer": item['developer'],
            "tags": item['tags'],
            "info": item['info'],
            "imgs": item['imgs'],
            # "scores":item['scores']
        }
        try:
            a= self.es.create(index=self.index,id=self.myhash(item['game_name']),body=body)
            print("新增一个游戏")
            # pass
        except Exception as e:
            print(e)
    # 更新文档
    def updateDocument(self, item):
        origin_tag = self.es.get(self.index, self.myhash(item["game_name"]))['_source']['tags']
        parm = {
            "doc" : {
                "tags":origin_tag+item['tags']
            }
        }
        try:
            self.es.update(index=self.index,id=self.myhash(item['game_name']),body=parm)
        except:
            pass

    # 检查文档是否存在
    def checkDocumentExists(self, item):
        try:
            self.es.get(self.index,self.myhash(item["game_name"]))
            return True
        except:
            return False

    def myhash(self,name):
        md5 = hashlib.md5()
        name_pre = name
        md5.update(name_pre.encode('utf-8'))
        return md5.hexdigest()

class ResourcePipelines():
    # 初始化
    def __init__(self):
        # elasticsearch的index
        self.index = "resource"
        # elasticsearch的type
        self.type = "_doc"
        # elasticsearch的ip加端口
        self.es = Elasticsearch(hosts="39.98.125.235:9200")

    # 必须实现的方法，用来处理yield返回的数据
    def process_item(self, item, spider):

        result = self.checkDocumentExists(item)

        if result == False and item['img_url']!='':
            self.createDocument(item)
        else:
            self.updateDocument(item)
            # pass
    # 添加文档
    def createDocument(self, item):
        print(item['content'])
        body = {
            "title": item['title'],
            "source": item['source'],
            "time": item['time'],
            "type": item['type'],
            "url": item['url'],
            "img_url": item['img_url'],
            "info": item['info'],
            "content": item['content']
        }
        try:
            a= self.es.create(index=self.index,id=self.myhash(item['title']),body=body)
            # pass
        except Exception as e:
            print(e)
    # 更新文档
    def updateDocument(self, item):
        # origin_tag = self.es.get(self.index, self.myhash(item["game_name"]))['_source']['tags']
        # parm = {
        #     "doc" : {
        #         "tags":origin_tag+item['tags']
        #     }
        # }
        body = {
            "title": item['title'],
            "source": item['source'],
            "time": item['time'],
            "type": item['type'],
            "url": item['url'],
            "img_url": item['img_url'],
            "info": item['info'],
            "content": item['content']
        }
        try:
            self.es.delete(index=self.index, id=self.myhash(item['title']))
            self.es.create(index=self.index, id=self.myhash(item['title']), body=body)
            # self.es.update(index=self.index,id=self.myhash(item['title']),body=parm)
        except:
            pass

    # 检查文档是否存在
    def checkDocumentExists(self, item):
        try:
            self.es.get(self.index,self.myhash(item["title"]))
            return True
        except:
            return False

    def myhash(self,name):
        md5 = hashlib.md5()
        name_pre = name
        md5.update(name_pre.encode('utf-8'))
        return md5.hexdigest()

if __name__ == '__main__':
    # es = Elasticsearch(hosts=["127.0.0.1:9200"], http_auth=('elastic','changeme'),timeout=5000)
    es = ArticlePipelines()
    with open("./data/steamgames.json", encoding="UTF-8") as f:
        for line in f.readlines():
            resource = json.loads(line)
            es.createDocument(resource)
    # print(type(data))
    # createDocument(item)

        # pass
