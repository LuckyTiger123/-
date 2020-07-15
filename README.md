# README

本项目分为三大部分进行开发，爬虫，前端以及后端。爬虫代码一个文件夹[./爬虫代码]，后端文件夹[./goServer]，前端文件夹[./reactApp]

## 爬虫代码

```
├─数据处理代码
│      baiduIndex.py  //爬取百度指数，更新数据
│      json2es.py     //将爬虫存储的json文件导入ElasticSearch
│      wordcloud.py   //使用jieba分词，输出游戏相关词频
│
└─网页爬取代码
    └─3dmcrawl
        ├─.idea
        │  │  .gitignore
        │  │  encodings.xml
        │  │  helloworld.iml
        │  │  jsonSchemas.xml
        │  │  misc.xml
        │  │  modules.xml
        │  │  vcs.xml
        │  │  workspace.xml
        │  │
        │  └─inspectionProfiles
        │          profiles_settings.xml
        │          Project_Default.xml
        │
        ├─mySpider
        │  │  scrapy.cfg
        │  │
        │  └─mySpider
        │      │  items.py
        │      │  middlewares.py
        │      │  pipelines.py   //自定义的管道文件，可直接将数据插入ElasticSearch，也可以将数据存储为json。
        │      │  settings.py
        │      │  __init__.py
        │      │
        │      ├─spiders
        │      │  │  a3dmgonglue.py  //爬取3dm攻略的主要爬虫代码
        │      │  │  bilibili.py    //爬取B站视频信息的主要爬虫代码
        │      │  │  gamecores.py   //爬取机核网文章的主要代码
        │      │  │  itcast.py      //爬取3dm游戏的主要代码
        │      │  │  youxiagonglue.py  //爬取游侠网攻略的主要代码
        │      │  │  youxianew.py   //爬取游侠网资讯的主要代码
        │      │  │  __init__.py
        │      │  │  steamgame.py   //爬取steam的游戏的主要爬虫代码
        │      │  │
        │
        └─seleniumCrawl
            └─seleniumpro
                │  scrapy.cfg
                │
                └─seleniumpro
                    │  items.py
                    │  middlewares.py
                    │  pipelines.py    //自定义的管道文件，可直接将数据插入ElasticSearch，也可以将数据存储为json。
                    │  settings.py
                    │  __init__.py
                    │
                    ├─spiders
                    │  │  items3.json
                    │  │  main.py
                    │  │  __init__.py
                    │  │
                    │  └─__pycache__
                    │          main.cpython-37.pyc
                    │          __init__.cpython-37.pyc
                    │
                    └─__pycache__
                            items.cpython-37.pyc
                            middlewares.cpython-37.pyc
                            pipelines.cpython-37.pyc
                            settings.cpython-37.pyc
                            __init__.cpython-37.pyc

```

## 后端代码

```
goServer
├── .idea					//Goland项目配置
│   ├── .gitignore
│   ├── goServer.iml
│   ├── misc.xml
│   ├── modules.xml
│   ├── vcs.xml
│   └── workspace.xml
├── build
│   └── gen-proto.sh		//从protobuf生成Golang的脚本文件
├── cmd
│   └── Server					//执行文件主入口
│       └── main.go
├── go.mod						//go mod依赖项
├── go.sum
├── pkg								//具体功能代码
│   └── Server
│       ├── bootstrap.go
│       ├── link.go
│       ├── server.go
│       ├── server_test.go
│       └── wordMap.go
└── proto							//protobuf代码与生成的golang文件
    ├── server.pb.go
    ├── server.pb.gw.go
    └── server.proto
```

## 前端代码

```
├── config                                   // webpack相关配置文件
│   ├── env.js
│   ├── getHttpsConfig.js
│   ├── jest
│   │   ├── cssTransform.js
│   │   └── fileTransform.js
│   ├── modules.js
│   ├── paths.js
│   ├── pnpTs.js
│   ├── webpack.config.js
│   └── webpackDevServer.config.js
├── package-lock.json
├── package.json														 // 项目依赖
├── public                                   // 静态文件目录
│   ├── game.png
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── scripts
│   ├── build.js
│   ├── start.js
│   └── test.js
└── src                                      // 前端项目主要代码
    ├── App.js                             
    ├── assets                               // 静态文件目录
    │   ├── bgd4.jpg
    │   ├── logo.png
    │   ├── logo1.png
    │   └── logo2.png
    ├── common                               // 项目中通用的配置信息
    │   └── config.js
    ├── components                           // 组件目录
    │   ├── GameInfo                         // 游戏详情页面组件
    │   │   ├── Detail                       // 游戏基本信息展示组件
    │   │   │   ├── index.css
    │   │   │   └── index.js
    │   │   ├── Resource                     // 游戏资源展示组件
    │   │   │   ├── Analytics                // 游戏数据分析展示组件
    │   │   │   │   ├── dates.js
    │   │   │   │   ├── index.css
    │   │   │   │   └── index.js
    │   │   │   ├── ResourceCard             // 资源展示卡片组件
    │   │   │   │   ├── index.css
    │   │   │   │   └── index.js
    │   │   │   ├── constant.js                     
    │   │   │   ├── index.css
    │   │   │   └── index.js
    │   │   ├── Score                        // 游戏评分组件
    │   │   │   ├── index.css
    │   │   │   └── index.js
    │   │   ├── colorList.js
    │   │   ├── index.css
    │   │   ├── index.js
    │   │   └── test.js
    │   ├── ResultCard.jsx                   // 搜索页面展示卡片组件 
    │   ├── SearchBar.jsx                    // 首页搜索筛选组件
    │   ├── SearchBlock.jsx                  // 结果页搜索筛选组件
    │   └── layout                           // 布局相关
    │       └── Footer.js                  
    ├── index.css
    ├── index.js                             // 项目入口
    ├── pages
    │   ├── ResultPage.js                    // 结果显示页面
    │   └── SearchPage.js                    // 搜索页，即首页
    ├── serviceWorker.js
    ├── setupProxy.js
    ├── setupTests.js
    ├── store                                // redux相关配置
    │   ├── actions.js
    │   ├── index.js
    │   └── reucers.js
    └── utils                                // 工具函数
        ├── formatDate.js                    
        └── index.js
```

