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
import random
word_url = 'http://index.baidu.com/api/SearchApi/thumbnail?area=0&word={}'
user_agent = [
    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; AcooBrowser; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
    "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Acoo Browser; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)",
    "Mozilla/4.0 (compatible; MSIE 7.0; AOL 9.5; AOLBuild 4337.35; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
    "Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)",
    "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0)",
    "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 1.0.3705; .NET CLR 1.1.4322)",
    "Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.2; .NET CLR 1.1.4322; .NET CLR 2.0.50727; InfoPath.2; .NET CLR 3.0.04506.30)",
    "Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.3 (Change: 287 c9dfb30)",
    "Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.6",
    "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.2pre) Gecko/20070215 K-Ninja/2.1.1",
    "Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9) Gecko/20080705 Firefox/3.0 Kapiko/3.0",
    "Mozilla/5.0 (X11; Linux i686; U;) Gecko/20070322 Kazehakase/0.4.5",
    "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20",
    "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52",
]
# word_url1 = f'http://index.baidu.com/api/SearchApi/thumbnail?area=0&word=[[%7B%22name%22:%22{}%22,%22wordType%22:1%7D]]'
COOKIES = 'BIDUPSID=B860BBF7263C741F14F7A8D38CF0C2D0; PSTM=1589961073; BAIDUID=B860BBF7263C741FAF33CA51A6172BEC:FG=1; HMACCOUNT=09851504F9F2D8AF; H_PS_PSSID=1455_32139_32046_32231_32295_26350; HMVT=6bcd52f51e9b3dce32bec4a3997715ac|1594696922|; bdindexid=43bcqh08njt5am5jp59u4uvp24; BDUSS=XZvVlB-dlRDQUk5U2ZKfmo5LUZYMFA4Q3FsUDB1c3JreXdBdTVtLXhhdnN0alJmSVFBQUFBJCQAAAAAAAAAAAEAAABBce4qv-z8Y7~ssKEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOwpDV~sKQ1fR; RT="z=1&dm=baidu.com&si=26ef9vdq5wd&ss=kcle4m07&sl=a&tt=7ov&bcn=https%3A%2F%2Ffclog.baidu.com%2Flog%2Fweirwood%3Ftype%3Dperf&ld=1ibw"'
count=0
def decrypt(t, e):
    n = list(t)
    i = list(e)
    a = {}
    result = []
    ln = int(len(n) / 2)
    start = n[ln:]
    end = n[:ln]
    for j, k in zip(start, end):
        a.update({k: j})
    for j in e:
        result.append(a.get(j))
    return ''.join(result)


def get_index_home(keyword):
    headers = {
        'User-Agent': random.choice(user_agent),
        'Cookie': COOKIES
    }

    word_url = f'http://index.baidu.com/api/SearchApi/thumbnail?area=0&word=[[%7B%22name%22:%22{keyword}%22,%22wordType%22:1%7D]]'
    resp = requests.get(word_url, headers=headers)
    j = resp.json()

    print(j)

    uniqid = j.get('data').get('uniqid')
    return get_ptbk(uniqid)


def get_ptbk(uniqid):
    url = 'http://index.baidu.com/Interface/ptbk?uniqid={}'
    ptbk_headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Cookie': COOKIES,
        'DNT': '1',
        'Host': 'index.baidu.com',
        'Pragma': 'no-cache',
        'Proxy-Connection': 'keep-alive',
        'Referer': 'http://index.baidu.com/v2/index.html',
        'User-Agent': random.choice(user_agent),
        'X-Requested-With': 'XMLHttpRequest',
    }
    resp = requests.get(url.format(uniqid), headers=ptbk_headers)
    if resp.status_code != 200:
        print('获取uniqid失败')
        sys.exit(1)
    return resp.json().get('data')


def get_index_data(keyword, start='2020-01-01', end='2020-07-08'):
    url = f'http://index.baidu.com/api/SugApi/sug?inputword[]={keyword}&area=0&startDate={start}&endDate={end}'
    word_param = f'[[%7B"name":"{keyword}","wordType":1%7D]]'
    url1 = f'http://index.baidu.com/api/SearchApi/index?area=0&word={word_param}&startDate={start}&endDate={end}'
    print(url1)
    print(url1 + "\n")
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Cookie': COOKIES,
        'DNT': '1',
        'Host': 'index.baidu.com',
        'Pragma': 'no-cache',
        'Proxy-Connection': 'keep-alive',
        'Referer': 'http://index.baidu.com/v2/index.html',
        'User-Agent': random.choice(user_agent),
        'X-Requested-With': 'XMLHttpRequest',
    }

    resp = requests.get(url1, headers=headers)
    if resp.status_code != 200:
        print('获取指数失败')
        sys.exit(1)

    data = resp.json().get('data').get('userIndexes')[0]
    uniqid = resp.json().get('data').get('uniqid')

    ptbk = get_ptbk(uniqid)

    all_data = data.get('all').get('data')
    result = decrypt(ptbk, all_data)
    result = result.split(',')

    # print('\n======= result ======\n')
    # print(result)
    return result


def demo(es, key_words):
    count=0
    allcnt=0
    for key_word in key_words:
        try:
            allcnt += 1
            print(str(count) + "/" + str(allcnt))
            p1 = re.compile(r'(.*?)[（]', re.S)  # 最小匹配
            word = re.findall(p1, key_word)
            if len(word)==0:
                key=key_word
            else:
                key=word[0]
            print(key_word+es.myhash(key_word))
            data = get_index_data(keyword=key)
            # print(data)
            if data[1] == '':
                continue
            # print(key_word+str(data))
            count+=1
            print(count)
            item = {'game_name':key_word,'baiduIndex':data}
            es.updateDocument(item)
            print("插入成功")
            time.sleep(2)
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
                "baiduIndex": item['baiduIndex']
            }
        }
        try:
            self.es.update(index=self.index, id=self.myhash(item['game_name']), body=parm)
        except:
            pass

    # 检查文档是否存在
    def checkDocumentExists(self, item):
        try:
            self.es.get(self.index, self.myhash(item["game_name"]))
            return True
        except:
            return False

    def myhash(self, name):
        md5 = hashlib.md5()
        name_pre = name
        md5.update(name_pre.encode('utf-8'))
        return md5.hexdigest()

def myhash(name):
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
            if resource['game_name'].strip() not in key_words:
                key_words.append(resource['game_name'])

    demo(es,key_words)
    # print(type(data))
    # createDocument(item)

    # pass