# 项目名称
基金查询系统

## 项目背景
如果你平时有购买股票或基金，当一支股票涨停并有可能连接涨停，而你又买不进去时，是否想购买重仓它的基金呢？

## 技术
前端：Angular, Admin LTE  
后端：Express, MongoDB。  

## 数据来源
请参考[基金爬虫](https://github.com/bingdengtan/FounSpider)，抓取数据到MongoDB

## 如何运行
1. 在命令行中输入 `cd ProjectRootFolder\Server`  
2. `node server.js` 开启后端
3. `cd ProjectRootFolder\Client`
4. `npm install` 安装项目所需的包
5. `ng build --prod` 构建项目  
6. 在地址栏中访问 http://localhost:8080 打开系统

## 项目截图
1. 主界面
![](https://github.com/bingdengtan/stock-filter-funds/blob/master/client/src/assets/img/Funds_Screen_Home.png)  
2. 能过股票查询基金界面  
![](https://github.com/bingdengtan/stock-filter-funds/blob/master/client/src/assets/img/Funds_Screen_Stock.png)  


**后续功能还在增加中**
