## 项目运行（nodejs 6.0+）

### 演示网站

[http://chat.livetune.xyz](http://chat.livetune.xyz)

``` bash
# 克隆到本地
git clone https://github.com/livetune/chat-and-buy.git
cd chat-and-buy

# Mac 安装MongoDb (如果命令行因为网络问题安装不了，可以直接去 https://www.mongodb.com/download-center#community 下载
brew install mongodb

# 启动MongoDb（安装成功后命令行有提示）
mongod --config /usr/local/etc/mongod.conf

# 连接到mongo
mongo

# 安装依赖
npm install

# 全局安装 nodemon 
npm i nodemon -g

# 开启后端 (Windows)
npm run dev

# 开启本地服务器
npm start

# 发布环境
npm run build
```