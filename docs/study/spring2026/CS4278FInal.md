# Defect Reporting and Triage  缺陷报告与分诊
对应se-10那节。      

## 1。 一个概念判断 
fault 是运行时的，     
defect/ bug是静态缺陷。    

A fault is an exceptional situation at run time      
A defect is any characteristic of a product which hinders its
usability for its intended purpose。     

bug report出defect信息。    
feature啥的出potential change功能，     
需要的话从se -10 哪个里面找第十一页。    
## 2. 缺陷报告生命周期 defect report lifecycle 
reporting, confirmation,
triage, assignment, resolution, and verification.     

bug从发现到关闭的全过程etc。     

查第十三页。     
## 3. internal and external 内部和外部来源 
查第十六页。   
## 4. end-user bug reports 终端用户，噪音啥的 
查18页。  
## 5. 好report标准
可以去看20几页那几个，21开始吧应该。   
## 6. triage 分诊
se-10 p36抄吧，不知道有啥用      
## 7. severity 
直接看p38找    那个图。    
## 8. 优先级和分配
见 39 40 没有需要理解的部分    
## 9. 后面现查吧，基本上没有特别离谱的，都在ppt里写的还算明白 
# fault local lization
对应 se-11
## 1. fault localization 定位
定义，不唯一，范围，等等。    
查se-11 p-15 
## 2. debugger 核心特性 
查 p17。   
单步，附加（夺舍），断点，条件断点，观察，blablade我也不知道怎么出题    
## 3. signals
中断支持debugger，     
race conditioner : asynchronous 异步执行，别的回来看吧，我也不知道了
## 4. p20 example 
In signal handler, global = 33。    

然后程序结束。    
后面的     

Outside, global = 55      

不会打印出来。     

基本上 如果 有注册signal(SIGSEGV, my_handler);    
触发了就去执行，     
*pointer = 0;，而且 pointer = NULL 有这种东西就去执行。     

类似的东西还有 空指针访问
除零
用户 Ctrl-C
kill 信号
OS 发来的某些信号 这种东西。  

## 5. attach 
见p21，理解不了不管了。   
## 6. 创建， hbp，见22，23吧，管不了了也
硬件断点和条件断点，见p23
## 7. single-step  一次一步
见24
## 8 watchpoint 抓地址L，
见p26，也没看出来有啥用。
## 9. 不同类型
见p38，可能类似，不同类型啥的，对人不同。  
## 10. SBFL spectrum based 啥啥的 
定义见p 39
## 11. suspicious 算数 
见 p41-43     
底下几个pass是total是几。   
底下几个fail是fail是几。   
然后套那个公式去算。   
看最可疑思路。   
先看fail， 没红的不太容易， 因为压根没执行到。     
然后看 fail红了，pass红的少，可疑。   
看suspicious分数，越高越容易。   
## 12. profiler 查性能
定义见 p45     
flat看平均调用，另一个看调用链。     
## 13. Event-Based Profiling 观察回调
定义见 p46
## 14. 定时采样 Statistical Profiling
见p47
## 15. Sampling Analysis 抽样
pros and cons 见 p50 
trade-off： 更准 <=> 更耗性能   
Accuracy depends on sampling rate    
Higher sampling rate incurs higher overhead     
## 16. 哲学
p53 54,    
ranking 提前，不一定让人实际更快。    
评价标准，乱七八糟的，从后面开始看      
# delta debugging 类似分治法那种吧 
se-12 debug这节。 
## 1. delta debug
思想见p8吧。  
## 2. 发版挂 
见p11，没看出来哪有用，就是告诉哪个版本寄了
## 3. difference概念，改了啥挂了 
见p12
## 4. DD 具体逻辑 
比如真正的触发集合是 {3,6}     

那：     

P1={1,2,3,4}，单独没有 6，所以 No     
P2={5,6,7,8}，单独没有 3，所以 No     
但合起来里面同时有 3 和 6，所以 Yes      

这就是 interference。    
可能跨起来。    
## 5. 可能出的
dd找到的东西： one-minimal, 三个assumption，乱七八糟的，直接找书吧，别管别的了
## 6. 复杂度 
最好情况就一个 O(log｜c｜) c是集合大小。   
坏情况 O(|C^2|)     
## 7. dd现查吧 
不管了没时间管了
# github
见se-13那个ppt。   
## 1. cicd/ devops
现查和现搜上网解决吧不想管了    

# ATR
见se-24-repair     
基本上跟自动生成patch相关的都在这节，可以现搜。  
## 1. Atr定义
见 p11
为啥work见 p12。     
简答题可以直接搞。  
## 2. minimizing patches和costs
delta 缩圈。   
见p14 p15。   
cost也抄吧，我搞不太好这个。   
The dominant cost of APR is running tests on candidate patches. A repair is valid only if it passes the entire test suite. Therefore, APR reduces cost by stopping the search once a valid repair is found, stopping evaluation of a patch after the first failing test, using test-suite prioritization/minimization, and parallelizing the search.
## 3. static analysis静态分析看两个等不等价  
我也不知道，见p18吧。  
## 4. 一些骨架 
APR 是什么：给程序 + bug evidence，产出 patch
为什么可行：fault localization + small edits + testing
怎么生成 patch：mutation / templates / later LLM
怎么验证 patch：compile + test，pass all tests 才算 valid repair
怎么优化 patch：minimizing patches，delta debugging
怎么优化成本：prioritization / minimization / early stop / parallelization
怎么避免重复测：static analysis 判断等价 patch
怎么让 patch 更像人写的：learned fix templates / design patterns
怎么让人更能接受：文档、maintainability、trust 这些后续问题
LLM 版本怎么做：LLMAPR 流程图那几页
## 5. why low quality. 
可以见p38 
# requirements
见 sec-13那个ppt   
Requirements say what, not how
Functional = what it does; non-functional = how well it does it
Verification = building the product right; Validation = building the right product
Common flaws: omission, contradiction, inadequacy, ambiguity
# pair programming 
是se-20那张。  
## 1. 有一个计算问题 
就是 如果原来是100， 新增 15%， 计算115 不是计算 230   
见p20.   
## 2. 其余的查表吧    
前半部敏捷开发，历史那些东西。   
中半部 pair 定义。  
后半部。  技术面问题。  
# UIUx
se-15 那张 
现查吧， ui的我感觉也还好。  
