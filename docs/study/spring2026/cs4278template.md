# SE Exam 1 Answer Templates
软件工程考试答题模板

本课程考试 ≠ 背定义  
本课程考试 = 场景分析 + 对比 + 设计方案

👉 看到题目 → 套模板 → 填概念

---

# 🧩 TEMPLATE 1
# Compare Process Models
# 对比开发模型

## ❓ 常见问法
- Compare Waterfall vs Agile
- When should Spiral be used?
- Advantages & disadvantages of Agile

---

## ✅ 答题结构

### 1️⃣ Core Idea
Waterfall is sequential and rigid.
Agile is iterative and adaptive.

瀑布模型顺序执行；敏捷开发迭代适应变化。

### 2️⃣ Strengths
Waterfall works well when requirements are stable.

Agile supports changing requirements and fast feedback.

### 3️⃣ Weaknesses
Waterfall is inflexible and detects defects late.

Agile can reduce predictability and requires customer involvement.

### 4️⃣ When to use
Use Waterfall for regulated systems.
Use Agile for evolving products.

---

## ⭐ 高分句
Agile embraces uncertainty, while waterfall assumes stability.

---

## ❌ 常见失分点
❌ 只写定义  
❌ 没写适用场景  

---

# 🧩 TEMPLATE 2
# Risk Question Template
# 风险分析题

## ❓ 常见问法
- Identify a risk
- Describe uncertainty
- Suggest measurement
- How to mitigate risk

👉 这几乎是必考题型

---

## ✅ 答题结构

### 1️⃣ Risk
A risk is that system performance may degrade under heavy load.

风险：系统在高负载下可能性能下降。

### 2️⃣ Uncertainty
We do not know how many users the system can support.

不确定性：系统最大承载用户数未知。

### 3️⃣ Measurement
Measure response time and throughput under stress testing.

通过压力测试测量响应时间与吞吐量。

### 4️⃣ Mitigation
Optimize database queries and add load balancing.

优化数据库并增加负载均衡。

---

## ⭐ 高分句
Measurement reduces uncertainty and enables informed decisions.

---

## ❌ 常见失分点
❌ 没写 measurement  
❌ 写 solution 但没说明 uncertainty  

---

# 🧩 TEMPLATE 3
# QA vs Testing vs Other Methods
# QA 与测试区别

## ❓ 常见问法
- Difference between QA and testing
- Why testing alone is insufficient
- When to use code review

---

## ✅ 答题结构

### QA
QA focuses on preventing defects through process improvement.

QA通过流程改进预防缺陷。

### Testing
Testing executes the program to detect defects.

测试通过运行程序发现缺陷。

### Why testing alone is insufficient
Testing cannot evaluate maintainability or detect rare execution bugs.

测试无法评估可维护性，也难以发现罕见路径错误。

### Complementary methods
Code review and static analysis help detect design flaws.

代码评审与静态分析可发现设计问题。

---

## ⭐ 高分句
Testing finds defects; QA prevents them.

---

## ❌ 常见失分点
❌ 写成 QA = testing  
❌ 忘记说明互补关系  

---

# 🧩 TEMPLATE 4
# Testing Strategy Design
# 测试设计题

## ❓ 常见问法
- Design test cases
- How would you test this system?
- What inputs should be tested?

---

## ✅ 答题结构

### 1️⃣ Inputs
Include normal, boundary, and invalid inputs.

包括正常输入、边界值与非法输入。

Also consider:
- environment variables
- network failures
- concurrency timing

还应考虑环境变量、网络异常与并发调度。

### 2️⃣ Oracle
Use expected output, invariants, or no-crash criteria.

可使用预期输出、不变量或“不崩溃”作为判定标准。

### 3️⃣ Coverage
Ensure branch coverage for decision logic.

确保分支覆盖。

### 4️⃣ Special Cases
Test high-risk scenarios and common user behavior.

测试高风险场景与常见用户行为。

---

## ⭐ 高分句
Testing is sampling the input space, so high-risk inputs deserve priority.

---

## ❌ 常见失分点
❌ 只写正常输入  
❌ 没写 oracle  

---

# 🧩 TEMPLATE 5
# Coverage & Mutation Testing
# 覆盖率与变异测试

## ❓ 常见问法
- Why is 100% coverage insufficient?
- Difference between line and branch coverage
- What is mutation testing?

---

## ✅ 答题结构

### Coverage meaning
Coverage measures how much code is executed.

覆盖率衡量测试执行范围。

### Limitations
100% coverage does not guarantee correctness.

100%覆盖率不保证正确性。

### Branch vs Line
Branch coverage ensures both true and false paths execute.

分支覆盖要求真假路径均执行。

### Mutation testing
Mutation testing evaluates test effectiveness by inserting faults.

变异测试通过引入缺陷评估测试质量。

---

## ⭐ 高分句
Coverage increases confidence but does not ensure correctness.

---

## ❌ 常见失分点
❌ 写覆盖率=正确  
❌ 忘记branch coverage更强  

---

# 🧩 TEMPLATE 6
# Static vs Dynamic Analysis
# 静态分析 vs 动态分析

## ❓ 常见问法
- Compare static and dynamic analysis
- When is static analysis needed?

---

## ✅ 答题结构

### Static Analysis
Analyzes code without execution and reasons about all possible paths.

静态分析不运行程序，推理所有可能路径。

### Dynamic Analysis
Runs instrumented program to observe runtime behavior.

动态分析运行程序观察运行时行为。

### Strengths
Static analysis finds hidden vulnerabilities and rare path bugs.

静态分析可发现罕见路径漏洞。

Dynamic analysis reveals performance and runtime issues.

动态分析发现性能与运行时问题。

### Limitations
Static → false positives  
Dynamic → incomplete coverage

静态可能误报；动态覆盖不完整。

---

## ⭐ 高分句
Static analysis reasons about all executions; dynamic analysis observes actual executions.

---

## ❌ 常见失分点
❌ 写成 static = compile time only  
❌ 忘记优缺点对比  

---

# 🧩 TEMPLATE 7
# Code Review Benefits
# 代码评审作用

## ❓ 常见问法
- Why code review is important?
- Benefits beyond bug detection

---

## ✅ 答题结构

### Benefits
- detect defects early  
- improve readability & design  
- knowledge sharing  
- increase transparency  

### Why beyond testing
Testing cannot evaluate design quality.

测试无法评估设计质量。

---

## ⭐ 高分句
A second pair of eyes improves both code quality and team knowledge.

---

## ❌ 常见失分点
❌ 只写找bug  
❌ 忘记知识共享  

---

# ⭐ FINAL EXAM STRATEGY

看到题目先判断：

✔ 对比题  
✔ 风险题  
✔ 测试设计  
✔ QA/Testing区别  
✔ 覆盖率 & metrics  
✔ 静态 vs 动态  

👉 套模板 → 加关键词 → 得分

