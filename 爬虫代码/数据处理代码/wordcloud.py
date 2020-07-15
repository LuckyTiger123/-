# rasa 20180212
# 使用ES python api插入geojson面数据（map.geojson）

import json
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk
import hashlib
import requests
import sys
import time
import re
import jieba
from wordcloud import WordCloud


def demo(es, key_words):
    count=0
    allcnt=0
    for key_word in key_words:
        try:
            str = key_word["publisher"]+key_word["developer"]+key_word["tags"]+key_word["info"]
            pins = []
            mytext=" ".join(jieba.cut(str))
            wordcloud = WordCloud(font_path='msyh.ttc').generate(mytext)
            a = wordcloud.layout_
            for i in a:
                pin = {'name':"",'value':0}
                pin['name']=i[0][0]
                pin['value'] = i[1]
                pins.append(pin)
            print(pins)
            item = {'game_name':key_word["game_name"],'cipin':pins}
            es.updateDocument(item)
            print("插入成功")
            # time.sleep(2)
        except Exception as e:
            print(e)
            # print(key_word)
            continue

class ArticlePipelines():
    # 初始化
    def __init__(self):
        # elasticsearch的index
        self.index = "trygame"
        # elasticsearch的type
        self.type = "_doc"
        # elasticsearch的ip加端口
        self.es = Elasticsearch(hosts="39.98.125.235:9200")

    # 更新文档
    def updateDocument(self, item):
        result = self.checkDocumentExists(item)
        if result == False:
            return
        # origin_tag = self.es.get(self.index, self.myhash(item["game_name"]))['_source']['tags']
        parm = {
            "doc": {
                "cipin": item['cipin']
            }
        }
        try:
            self.es.update(index=self.index, id=self.myhash(item['game_name']), body=parm)
        except:
            pass

    # 检查文档是否存在
    def checkDocumentExists(self, item):
        try:
            print(self.myhash(item["game_name"]))
            self.es.get(self.index, self.myhash(item["game_name"]))
            return True
        except:
            return False

    def myhash(self, name):
        md5 = hashlib.md5()
        name_pre = name
        md5.update(name_pre.encode('utf-8'))
        return md5.hexdigest()


if __name__ == '__main__':
    # es = Elasticsearch(hosts=["127.0.0.1:9200"], http_auth=('elastic','changeme'),timeout=5000)
    # es = ResourcePipelines()
    es = ArticlePipelines()
    key_words = []

    with open("./data/3dmnew.json", encoding="UTF-8") as f:
        for line in f.readlines():
            resource = json.loads(line)
            key_words.append(resource)

    print(key_words)
    demo(es,key_words)
    # print(type(data))
    # createDocument(item)

    # pass
