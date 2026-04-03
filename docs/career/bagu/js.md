# 前端八股
JS，框架，网络，浏览器部分
## 网络
### 协议
#### 1. http结构    
1. 请求：      
- 请求⾏    
方法，url，协议版本
- 请求头部    
头名：带的值  若干个
- 空⾏
- 请求体     
带着的数据，payload等等。     
2. 响应：    
- 响应⾏     
协议版本  状态码。  状态吗原因短语。  
- 响应头     
同样类似请求头的元信息。    
- 空⾏
- 响应体     
服务器相应的数据
#### 2. http请求方法    
1. 常见方法      
- GET：用于获取资源，是幂等的，参数一般通过URL query传参数；
- POST：用于提交数据或创建资源，不幂等，数据在请求体中；
- PUT：用于替换资源，是幂等的
- PATCH：用于部分更新资源；
- DELETE：用于删除资源，是幂等的；
- HEAD：只返回响应头；
- OPTIONS：用于查询服务器支持的方法，在 CORS 中用于预检请求；   
    
   
2. get post区别        
- GET 语义上用于读取资源，通常是安全且幂等的；POST 用于提交数据或触发操作，通常不是幂等的
- 默认场景下一般对get缓存    
- GET 请求通常通过 URL query 参数传参，一般不使用请求体；POST 请求通常通过请求体传递数据     
- GET 请求参数会写在url里，post不会，一般走body，因为同样原因，get查询参数有限      
3. put和post
- 核心区别是put幂等，post不是，可以理解为put纯更新，post发上去后端想干啥干啥
4. option预检。    
复杂请求，非get，post。     
application/x-www-form-urlencoded
multipart/form-data
text/plain      
提前发预检请求，如果不符阻断。    
看    
Access-Control-Allow-Origin
Access-Control-Allow-Methods
Access-Control-Allow-Headers
#### 3. 