# SE Exam 1 Cheat Sheet
软件工程考试核心概念速查

---

# 1️⃣ Software Development Process
软件开发过程

Software process organizes development activities into phases.

软件开发过程将开发活动结构化为多个阶段。

---

## Waterfall Model 瀑布模型

Sequential phase development.

顺序阶段式开发。

### ✅ Pros 优点
- Simple & structured  
  简单清晰、易管理
- Good for stable requirements  
  适合需求稳定项目
- Clear documentation  
  文档规范完整

### ❌ Cons 缺点
- Hard to accommodate change  
  难以适应需求变化
- Late defect discovery  
  缺陷发现较晚
- Expensive rework  
  返工成本高

**Exam Tip:** rigid process, late feedback

---

## Spiral Model 螺旋模型

Risk-driven iterative development.

以风险驱动的迭代开发。

### ✅ Pros
- Focus on risk reduction  
  优先降低风险
- Early risk detection  
  早期发现风险
- Iterative improvement  
  迭代优化

### ❌ Cons
- Complex management  
  管理复杂
- Expensiv e  
  成本较高
- Requires expertise  
  需要经验丰富团队

**Exam Tip:** risk-first development

---

## Agile Development 敏捷开发

Iterative, adaptive, customer collaboration.

迭代开发，快速响应变化。

### ✅ Pros
- Adapts to change  
  适应需求变化
- Continuous feedback  
  持续反馈
- Faster value delivery  
  快速交付价值

### ❌ Cons
- Less predictability  
  可预测性较低
- Requires customer involvement  
  需要客户持续参与
- Hard to scale  
  大型项目难扩展

**Exam Tip:** embraces uncertainty & change

---

## Extreme Programming (XP)

Agile practice emphasizing engineering discipline.

强调工程实践的敏捷方法。

### ✅ Pros
- High code quality (TDD & pair programming)  
  TDD与结对编程提高质量
- Rapid feedback  
  快速反馈
- Strong collaboration  
  团队协作强

### ❌ Cons
- Intensive teamwork required  
  协作要求高
- Hard for large teams  
  不适合大型团队

---

# 2️⃣ Planning & Scheduling
项目规划与进度

---

## Importance of Planning

### Benefits
- reduces cost later  
  降低后期成本
- improves efficiency  
  提高效率
- prevents integration failure  
  避免集成失败

### Poor planning leads to:
- scope creep 范围膨胀  
- late defects 缺陷晚发现  
- integration failures 集成失败  

---

## Milestones vs Deliverables

**Milestones**
- internal progress checkpoints  
- 内部进度检查点

**Deliverables**
- outputs delivered to customer  
- 交付给客户的成果

❗ “80% complete” is NOT a milestone

---

## Scheduling Reality

Last 10% of work may take 40% of total time.

最后10%可能耗费40%的时间。

原因：
- integration problems
- edge cases
- polishing & debugging

---

# 3️⃣ Risk & Uncertainty
风险与不确定性

Risk management = identify → assess → prioritize → mitigate

风险管理流程：识别 → 评估 → 排序 → 降低

---

## Common Risks

- staff turnover 人员流失
- performance issues 性能问题
- new competitors 竞争产品
- technology failure 技术风险

---

## Effective Risk Management

- address risks early  
- estimate likelihood & impact  
- focus on major risks  
- prepare contingency plans  

尽早处理风险、评估概率与影响、关注关键风险、制定应急方案。

---

## Zero-Risk Bias 零风险偏见

Tendency to eliminate one risk completely instead of minimizing overall risk.

倾向完全消除某一风险，而不是降低整体风险。

---

## Weber’s Law 韦伯定律

Problems obvious in small systems are harder to detect in large systems.

小系统明显的问题，在大型系统中更难察觉。

---

# 4️⃣ Measurement & Metrics
软件度量与指标

Measurement reduces uncertainty.

度量用于减少不确定性。

---

## Lines of Code (LOC)

### ✅ Pros
- easy to measure  
  易测量
- simple comparison  
  易比较

### ❌ Cons
- affected by language/style  
  受语言与格式影响
- more LOC ≠ productivity  
  行数多不代表效率高

---

## Cyclomatic Complexity 圈复杂度

Measures number of independent execution paths.

衡量独立执行路径数量。

### ✅ Pros
- estimates testing effort  
  估算测试复杂度
- identifies complex code  
  识别复杂代码

### ❌ Cons
- ignores data complexity  
  忽略数据复杂度
- not full quality measure  
  不能全面衡量质量

---

## Maintainability Index (MI)

0–100 scale indicating maintainability.

数值越高越易维护。

Derived from:
- LOC
- Cyclomatic complexity
- Halstead volume

---

## Halstead Volume

Measures program size via operators & operands.

通过操作符与操作数衡量程序规模。

---

# Measurement Biases 度量偏差

## Streetlight Effect 路灯效应
Measuring what is easy instead of what matters.

测量容易的，而非重要的。

## McNamara Fallacy
Relying only on quantitative metrics.

只依赖量化指标做决策。

## Correlation ≠ Causation
相关不代表因果。

## Confounding Variables
Hidden factors influencing results.

混杂变量影响结果。

---

# 5️⃣ Quality Assurance & Testing
质量保证与测试

QA focuses on preventing defects through process.

QA 通过流程改进预防缺陷。

Testing executes the program to find defects.

测试通过运行程序发现缺陷。

---

## QA vs Testing

QA = prevention & process  
QA 是预防与流程

Testing = execution & detection  
Testing 是执行与发现

---

## Testing Truth

Testing can reveal bugs but cannot prove absence.

测试能发现错误，但不能证明没有错误。

原因：
- infinite input space
- halting problem

---

## External vs Internal Quality

### External
- correctness
- reliability
- security
- no crashes

用户体验质量

### Internal
- readability
- maintainability
- structure

开发者视角质量

---

# Testing Types

## Unit Testing
Tests individual components.

优点：
- fast & repeatable
- easy debugging

---

## Integration Testing
Tests modules working together.

验证模块协同工作。

---

## Regression Testing
Ensures changes don’t break old features.

防止旧功能被破坏。

---

## Test-Driven Development (TDD)

1. write failing test  
2. implement code  
3. pass test  
4. refactor  

优点：
- better design
- fewer bugs

---

## Mocking

Simulates dependencies.

模拟依赖组件。

Used when:
- APIs unavailable
- failures hard to trigger

---

## Fuzz Testing

Random inputs to detect crashes & vulnerabilities.

随机输入发现崩溃与安全漏洞。

---

## Penetration Testing

Simulates attacks to evaluate security.

模拟攻击评估安全性。

---

# 6️⃣ Test Coverage & Test Quality

Coverage measures how much code tests execute.

覆盖率衡量测试执行范围。

---

## Line Coverage
executed lines / total lines

## Branch Coverage
tests true & false paths

Branch coverage > line coverage

---

## Coverage Limitations

Coverage ≠ correctness  
覆盖率不保证正确性

---

## Mutation Testing

Insert defects to evaluate test strength.

Mutation score = killed mutants / total

优点：
- evaluates test effectiveness

缺点：
- expensive
- equivalent mutants

---

# 7️⃣ Test Inputs & Oracles

Test case includes:
- input
- oracle
- comparator

测试用例包含：
输入 + 预期输出 + 比较机制

---

## Oracle Problem

Determining correct output is difficult.

确定正确输出困难。

Implicit oracles:
- no crash
- no infinite loop

---

## Path Explosion

Paths = 2^N decisions  
路径指数增长。

---

## Invariants

Properties always true.

始终成立的性质。

可作为测试判定依据。

---

# 8️⃣ Code Review & Inspection

Static QA without execution.

不运行程序的质量保证方法。

---

## Code Review

Peer review of changes.

同伴评审代码。

### Goals
- find defects
- improve readability
- knowledge sharing

---

## Code Inspection

Formal, structured team review.

正式结构化评审。

优点：
- thorough detection

缺点：
- expensive

---

## Why Not Testing Alone?

Testing cannot evaluate:
- maintainability
- design quality
- documentation

---

# 9️⃣ Dynamic Analysis
动态分析

Runs instrumented program to collect runtime data.

运行插桩程序收集运行时信息。

---

## Uses

- performance profiling
- memory usage
- race detection
- security vulnerabilities

---

## Race Condition

Concurrent access without synchronization.

并发访问共享资源导致错误。

---

## Taint Tracking

Tracks untrusted input influence.

追踪不可信输入传播。

---

## Limitations

- performance overhead
- false positives
- behavior change (Heisenbugs)

---

# 🔟 Static & Dataflow Analysis
静态与数据流分析

Static analysis examines code without execution.

静态分析在不运行程序的情况下分析代码。

---

## Why Important

Testing cannot cover all paths.

测试无法覆盖所有路径。

Static analysis reasons about all possible executions.

---

## Dataflow Analysis

Tracks abstract values through program flow.

跟踪变量在程序中的传播。

---

## AST & CFG

AST → syntax structure  
CFG → execution paths  

---

## Conservative Analysis

Prefer unknown over incorrect results.

宁可不确定，也不能错误判断。

---

## Limit

Many properties are undecidable (Rice’s theorem).

许多程序性质不可判定。

---

# ⭐ EXAM CORE TRUTHS（必背结论）

- Early defect detection saves cost
- Testing increases confidence, not correctness
- Coverage ≠ correctness
- Measurement reduces uncertainty
- Metrics can create bad incentives
- Static + dynamic analysis complement testing
- Risk = probability × impact
