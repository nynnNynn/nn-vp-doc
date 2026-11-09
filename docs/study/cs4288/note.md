# Lecture 1 — Introduction（课程定位）

## 1. Core Concepts（核心概念）

### Web-based Systems（基于 Web 的系统）【p.5–7】

- **HTTP(S) is a core communication protocol for web-based systems.** — HTTP/HTTPS 是 Web 系统的核心通信协议。
- **Web-based systems commonly support browser clients, but are not limited to browsers.** — 浏览器是主要客户端，但原生移动应用、其他服务也可以访问同一后端。
- **JavaScript is widely used, but is not a requirement for every component.** — JavaScript 是本课主要语言，不代表数据库、后端或客户端必须全部使用 JavaScript。
- **Security, scalability and failure handling are architectural concerns.** — 安全、扩容与故障处理需要在架构层考虑。
- **Cloud deployment is common, but does not define a web-based system.** — 云部署很常见，但本地部署的系统同样可以是 Web 系统。

## 2. Comparisons & Distinctions（易混淆概念对比）

| 概念 | 负责什么 | 不要混淆 |
|---|---|---|
| HTTP / HTTPS | 请求与响应的通信语义；HTTPS 提供 TLS 保护 | 不是页面结构语言 |
| HTML | 内容与语义结构 | 不是应用通信协议 |
| CSS | 样式与布局 | 不负责数据库查询 |
| JavaScript | 程序行为、交互和业务逻辑 | 不等于浏览器，也不只运行在浏览器 |
| Node.js | 浏览器外的 JavaScript 运行环境 | 不是 JavaScript 语言本身 |
| React | 构建 UI 的库 | 不负责替代 HTTP 或数据库 |

## 3. APIs & Configurations（API 与配置速查）

本章没有需要单独记忆的技术 API；课程安排、人物介绍及项目展示不纳入技术复习。

## 4. True / False Traps（判断题陷阱）

- **False** — `A web-based system can only be accessed through a browser.` — 也可以由原生应用或其他程序访问。
- **False** — `All components of a web-based system must be written in JavaScript.` — 各层可以采用不同语言。
- **False** — `A web-based system must be deployed in the cloud.` — 云部署不是定义条件。
- **True** — `Security and scalability affect architectural decisions.` — 两者会影响服务划分、部署和数据处理方式。

## 5. Exam Quick Reference（考前速查）

- **HTTP(S)**：通信。
- **HTML**：结构。
- **CSS**：样式和布局。
- **JavaScript**：行为。
- **Node.js**：运行环境。
- **Web-based ≠ browser-only ≠ cloud-only ≠ JavaScript-only**。

# Lecture 2 — Architecture（Web 系统架构）

## 1. Core Concepts（核心概念）

### Client–Server & Request–Response（客户端—服务端与请求—响应）【p.4–6、13–16】

- **The client initiates a request; the server produces a response.** — 本章的基本交互模型是客户端发起请求、服务端返回响应。
- **A user-facing web server may depend on specialized backend services.** — Web 服务可能进一步调用数据库、邮件、短信、图片存储等服务。
- **DNS resolution maps a hostname to network addressing information.** — DNS 帮助客户端找到主机地址；不是根据页面路径查询数据库。
- **A single user request may trigger multiple internal service interactions.** — 一次外部请求可能对应多次内部调用。

**【课件简化】** p.13 将 HTTP 描述为通常基于 TCP/IP 的点对点通信。这适用于本章模型及 HTTP/1.1、HTTP/2 的常见部署；HTTP/3 使用基于 UDP 的 QUIC。不要记成“所有 HTTP 都必须使用 TCP”。

### Architectural Qualities（架构质量属性）【p.7–11】

| 属性 | 英文考试表述 | 快速理解 |
|---|---|---|
| Availability | The service is accessible when needed. | 需要时能否访问 |
| Performance | Requests are processed with acceptable latency and throughput. | 响应多快、吞吐多少 |
| Reliability | The system performs its intended function consistently. | 是否持续正确工作 |
| Scalability | Capacity can grow with workload. | 负载增长后能否扩容 |
| Manageability | The system can be monitored, operated and maintained. | 能否观察、管理、排障 |
| Cost | Resources and operations have economic costs. | 硬件、云资源、运维成本 |
| Security | Access and data are protected against threats. | 权限、攻击面、数据保护 |

- **Low latency and high throughput are related but different goals.** — 单个请求快，不代表能同时处理很多请求。
- **Expect failures and plan for them.** — 不能把“所有依赖永远正常”作为设计前提。
- **Web-scale is an architectural concern, not a fixed numerical threshold.** — 课件强调用户、数据和地域范围增长，没有一个通用的“超过多少用户才算 Web-scale”的精确门槛。

### Vertical vs. Horizontal Scaling（纵向与横向扩容）【p.17–30】

- **Vertical scaling / Scale up increases the capacity of one machine.** — 给单机增加 CPU、内存等资源。
- **Horizontal scaling / Scale out adds more service instances.** — 增加机器或进程实例，分担负载。
- **Vertical scaling has practical upper limits.** — 单机硬件和成本存在上限。
- **Horizontal scaling requires coordination of traffic and state.** — 加实例还需要处理流量分配、会话、共享数据与一致性。
- **Scaling the web tier does not automatically scale every dependency.** — Web 实例变多，数据库、消息服务仍可能成为瓶颈。

**【课件修正】** p.26 把传统 SQL 数据库作为“不能横向扩展”的典型。更准确的说法是：**传统单节点关系数据库的透明横向扩容通常更复杂**；不能据此断言 SQL 数据库永远无法横向扩展。

### Load Balancer（负载均衡器）【p.19–24】

- **A load balancer distributes incoming traffic across backend instances.** — 对外提供入口，将请求分发给后端实例。
- **Clients do not need to know every backend server address.** — 客户端通常访问统一入口。
- **A load balancer can become a bottleneck or single point of failure.** — 负载均衡层本身也需要容量规划与高可用。
- **Load balancing does not automatically synchronize application state.** — 分流不等于同步各实例内存。

**【课件简化】** “只有一个设备能拥有该 IP”是示意架构的解释，不能推广为互联网所有部署的绝对规则；虚拟 IP、故障转移和 Anycast 等情况需要另论。

### Monolith vs. Microservices（单体与微服务）【p.31–35、45】

- **A monolith packages major application capabilities into one application.** — 多项业务能力由一个主要应用承担。
- **Microservices decompose capabilities into separately operated services.** — 将能力拆成服务，通过网络组合。
- **Independent services can be scaled independently.** — 支付、消息、图片等服务可分别扩容。
- **Service decomposition introduces communication and operational complexity.** — 拆服务后需要处理调用失败、延迟、部署、监控与数据边界。
- **An asynchronous queue can decouple producers from consumers.** — 生产者入队，消费者稍后处理，减少直接同步依赖。
- **Queueing does not make an operation instantaneous or guarantee exactly-once execution.** — 队列主要改变协调方式，具体投递保证取决于系统设计。

### Resilience & Graceful Degradation（韧性与优雅降级）【p.36–43】

- **Redundancy provides alternative resources when a component fails.** — 通过副本或备用资源降低单点风险。
- **Graceful degradation preserves essential functionality during partial failure.** — 非核心功能失败时，尽量保留核心功能。
- 可采取：延迟非必要操作、只提供核心服务、告知用户影响、保留状态页面。
- **Chaos testing deliberately introduces failures to evaluate resilience.** — 主动注入故障，检查系统能否按预期应对。

### Security Posture（安全姿态）【p.9–10】

- **Minimize the attack surface.** — 减少公开端口、接口和不必要的访问能力。
- **Store only the data that is needed.** — 减少敏感数据留存。
- **Internal services should not automatically trust every internal caller.** — 在内网不代表可以取消身份验证和权限检查。
- **Dependency maintenance is part of security.** — 系统和依赖更新也是安全工作。
- **Encryption and hashing serve different purposes.** — 加密可在持有密钥时解密；哈希通常用于不可逆校验。密码应使用合适的密码哈希方案，不能把“哈希或加密随便选一种”当通用规则。

## 2. Comparisons & Distinctions（易混淆概念对比）

| 对比 | A | B |
|---|---|---|
| Scale up / Scale out | 单机更强 | 实例更多 |
| Availability / Reliability | 能否使用 | 是否持续正确工作 |
| Latency / Throughput | 单次耗时 | 单位时间处理量 |
| Load balancing / State sharing | 分发流量 | 共享会话或业务数据 |
| Redundancy / Degradation | 用替代资源维持能力 | 暂时减少能力维持核心服务 |
| Monolith / Microservices | 统一应用边界 | 多个服务边界 |
| Synchronous call / Queue | 调用方通常等待处理结果 | 允许生产与消费在时间上解耦 |

## 3. APIs & Configurations（API 与配置速查）

本章重点是架构，没有必须背诵的函数调用。画图题可按以下顺序组织：

- `Client → Load Balancer → Web Instances` — 先表达外部入口与流量分配。
- `Web Instances → Shared Database / Shared Session Store` — 再表达跨实例共享的数据与状态。
- `Web Instances → Queue → Workers` — 将邮件、通知等可延迟任务移交后台处理。
- `Monitoring + Redundancy + Failure Handling` — 最后补上观察、替代资源与失败策略。

## 4. True / False Traps（判断题陷阱）

- **False** — `Adding web servers automatically removes all scalability bottlenecks.` — 数据库和其他依赖仍可能限制容量。
- **False** — `A load balancer synchronizes all server-side session data.` — 它主要分流。
- **True** — `Different services can require different scaling strategies.` — Web 层、数据库和消息系统的瓶颈不同。
- **False** — `Microservices are always simpler and cheaper than a monolith.` — 运维和网络协调成本可能增加。
- **False** — `SQL databases can never scale horizontally.` — 课件表述过于绝对。
- **True** — `Redundancy can reduce the impact of individual component failures.` — 但不能保证系统永不失败。
- **False** — `Internal network access eliminates the need for authentication.` — 内部边界也应按需求验证身份与权限。
- **False** — `High availability guarantees correct results.` — “在线”和“正确”不是同一维度。
- **True** — `Graceful degradation may temporarily disable nonessential features.` — 保留核心能力。
- **False** — `Horizontal scaling always produces linear performance gains.` — 协调开销和共享瓶颈会限制收益。

## 5. Exam Quick Reference（考前速查）

- **Scale up**：单机升级；有上限。
- **Scale out**：增加实例；需处理分流与状态。
- **Load Balancer**：分流，不负责自动同步会话。
- **Microservices**：独立扩容，但增加网络和运维复杂度。
- **Queue**：异步解耦。
- **Resilience**：预期失败、冗余、降级、故障测试。
- **Security**：最小暴露、最少留存、内部鉴权、依赖维护。

# Lecture 3 — HTTP & URI（HTTP 与资源标识）

## 1. Core Concepts（核心概念）

### HTTP Basics（基本语义）【p.4–6】

- **HTTP means Hypertext Transfer Protocol.** — 正式名称是 Transfer；课件标题中的 Transport 不准确。
- **HTTPS protects HTTP communication using TLS.** — 保护传输链路，不代表业务本身不存在漏洞。
- **HTTP versions can change transport and framing while preserving core semantics.** — 方法、状态码等核心语义跨版本延续。
- 本章主要采用 **HTTP/1.1 的文本报文形式**；不要把该文本格式直接当成 HTTP/2、HTTP/3 的线上帧格式。

### HTTP/1.1 Message Structure（报文结构）【p.5】

```http
GET /users?limit=10 HTTP/1.1
Host: example.com
Accept: application/json

```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"users":[]}
```

- **Request line = method + request target + HTTP version.** — 请求行包括方法、请求目标、版本。
- **Status line = HTTP version + status code + reason phrase.** — HTTP/1.1 响应状态行。
- **An empty line separates headers from the message body.** — 头部和消息体之间有空行。
- **A body is not required in every request or response.** — 例如 HEAD 响应没有消息体。
- **Header field names are case-insensitive.** — 头字段名称不区分大小写；值的规则取决于字段。

**【课件提醒】** p.5 示例声明了 `Transfer-Encoding: chunked`，但省略了实际分块长度等编码内容；不能把展示文本视为完整的原始 chunked 报文。

### Methods（HTTP 方法）【p.6；与 L24 衔接】

| 方法 | 核心含义 | Safe | Idempotent |
|---|---|---|---|
| GET | 获取资源表示 | 是 | 是 |
| HEAD | 获取与 GET 对应的响应元数据，不返回消息体 | 是 | 是 |
| POST | 请求资源执行指定处理，常用于创建 | 否 | 不保证 |
| PUT | 在目标 URI 创建或替换资源状态 | 否 | 是 |
| DELETE | 移除目标资源与其功能的关联 | 否 | 是 |

- **Safe refers to intended semantics, not the complete absence of server-side activity.** — 日志记录不让 GET 自动变成“不安全方法”。
- **Idempotency concerns repeated intended effects, not identical responses.** — DELETE 第一次返回 204、第二次返回 404，仍可幂等。
- **POST is not limited to creating resources.** — 创建只是常见用法。
- **GET request content has no generally defined semantics.** — 不应设计成依赖 GET body；浏览器 Fetch 也不允许 GET/HEAD body。
- **A method name does not enforce correct server implementation.** — 用 GET 写删除逻辑仍能造成副作用，只是违反预期语义。

### URI Components（URI 组成）【p.7–9】

```text
https://example.com:8443/users/42?tab=profile&lang=en#contact
```

| 部分 | 示例 | 含义 |
|---|---|---|
| Scheme | `https` | 资源标识方案 |
| Authority | `example.com:8443` | 此例中包括主机与端口 |
| Host | `example.com` | 主机名 |
| Port | `8443` | 端口 |
| Path | `/users/42` | 资源路径 |
| Query | `tab=profile&lang=en` | 查询部分 |
| Fragment | `contact` | 客户端定位的片段 |

- **The fragment is not sent as part of an HTTP request target.** — `#contact` 不会随普通 HTTP 请求目标发给服务端。
- **A URI path does not have to map to a physical file.** — 可以映射到路由或逻辑资源。
- **URI schemes are not limited to HTTP and HTTPS.** — 还包括 `mailto:`、`file:` 等。
- **Query parameters are commonly encoded as key–value pairs, but generic URI syntax does not require that interpretation.** — `a=1&b=2` 是 Web 应用常见约定。
- **Spaces need appropriate encoding in URLs.** — 不能把未经编码的空格直接当合法路径内容。

**【课件修正】** p.7 的“前三部分必须存在”不能作为所有 URI 的通用定义。例如 `mailto:user@example.com` 没有 HTTP 风格的主机和路径结构。

### Headers（HTTP 头）【p.10】

- **Host identifies the target host and optionally its port in HTTP/1.1 requests.** — HTTP/1.1 请求要求 Host。
- **Accept describes acceptable response media types.** — 客户端希望接收什么。
- **Content-Type describes the media type of the current message content.** — 当前请求或响应的 body 是什么。
- **User-Agent identifies client software.** — 不是可靠的身份验证凭据。
- **Date describes message origination time.** — 不等于资源最后修改时间。
- **Connection is connection management metadata in HTTP/1.1.** — 不应照搬到 HTTP/2、HTTP/3。

**【课件简化】** “Host 是唯一要求的请求头”“响应头没有强制字段”都不能理解成所有报文只需 Host、响应永远不需要其他字段。消息定界、状态码及具体语义会带来额外要求；例如 HTTP 对 Date 的生成也有具体规定。

### Status Codes（状态码）【p.11】

| 类别 | 含义 | 常见码 |
|---|---|---|
| 1xx | Informational | 100 Continue、101 Switching Protocols |
| 2xx | Success | 200 OK、201 Created、202 Accepted、204 No Content、206 Partial Content |
| 3xx | Redirection / 条件请求相关 | 301、302、303、304、307 |
| 4xx | Client error | 400、401、403、404、405、406、409、410、415 |
| 5xx | Server error | 500、501、502、503、504、505 |

重点区分：

- **201 Created** — 创建已完成；**202 Accepted** — 已接收处理请求，不保证处理已完成。
- **204 No Content** — 成功且没有响应内容；不是“返回空 JSON 对象”。
- **304 Not Modified** — 条件请求允许复用缓存，不携带资源消息体。
- **401 Unauthorized** — 缺少有效认证凭据；**403 Forbidden** — 服务端拒绝执行。
- **404 Not Found** — 未找到；**405 Method Not Allowed** — 目标存在相关处理，但该方法不支持。
- **406 Not Acceptable** — 无法提供符合响应协商要求的表示。
- **415 Unsupported Media Type** — 请求内容的媒体类型不支持。
- **502 Bad Gateway** — 网关收到无效上游响应；**504 Gateway Timeout** — 等待上游超时。
- **503 Service Unavailable** — 暂时无法服务，常与维护或过载相关。

### JSON（数据表示）【p.12】

- **JSON means JavaScript Object Notation.** — JSON 是文本数据格式，不是可直接等同于 JS 对象的内存结构。
- 合法值：**object、array、string、number、boolean、null**。
- **Property names and string values use double quotes.** — JSON 键名与字符串必须使用双引号。
- 不支持注释、函数、`undefined`、`NaN`、`Infinity` 和尾逗号。
- **Whitespace outside strings is insignificant.** — 字符串外的空白通常不改变数据。
- **A JSON document may contain a top-level primitive value.** — 顶层不一定必须是对象。

**【课件修正】** p.12 示例在 `"values"` 后缺少逗号，不能直接作为合法 JSON 使用。

## 2. Comparisons & Distinctions（易混淆概念对比）

| 对比 | 前者 | 后者 |
|---|---|---|
| HTTP / HTTPS | HTTP 语义 | HTTP 经 TLS 保护 |
| Accept / Content-Type | 想接收什么 | 当前消息实际是什么 |
| Query / Fragment | 通常发送给服务器 | 不作为 HTTP 请求目标发送 |
| URI path / Disk path | 资源标识或路由路径 | 文件系统位置 |
| 201 / 202 | 已创建 | 已接受，可能仍未完成 |
| 401 / 403 | 认证问题 | 拒绝执行 |
| 406 / 415 | 响应表示不匹配 | 请求媒体类型不支持 |
| JSON text / JS object | 序列化文本 | 运行时数据 |

## 3. APIs & Configurations（API 与配置速查）

- `JSON.stringify(value)` — 同步序列化为 JSON 字符串；不修改原值；循环引用会抛错。
- `JSON.parse(text)` — 同步解析 JSON 文本；格式错误抛出 `SyntaxError`。
- `Content-Type: application/json` — 声明当前内容为 JSON。
- `Accept: application/json` — 请求 JSON 响应，不会自动把请求 body 转成 JSON。
- `Host: example.com:8080` — HTTP/1.1 目标主机及非默认端口。
- `curl -i https://example.com/` — 【补充】查看响应头与内容。
- `curl -I https://example.com/` — 【补充】发出 HEAD 请求。

## 4. True / False Traps（判断题陷阱）

- **False** — `HTTP stands for Hypertext Transport Protocol.` — 正式名称是 Transfer。
- **False** — `HTTPS guarantees that the application is secure.` — 它保护传输，不替代业务安全。
- **False** — `Every URI contains a hostname.` — `mailto:` 等并不符合这个结论。
- **False** — `The URI fragment is sent to the server in the HTTP request target.` — fragment 留在客户端处理。
- **False** — `POST is used only to create resources.` — 可以表达其他处理操作。
- **True** — `PUT is idempotent according to its intended semantics.` — 重复请求具有相同预期效果。
- **False** — `An idempotent request must always return the same status code.` — 状态码可以变化。
- **False** — `Accept specifies the type of the request body.` — 那是 Content-Type 的职责。
- **False** — `202 means the requested operation has completed successfully.` — 只表示已接受。
- **False** — `A JSON object may contain JavaScript functions.` — JS 对象可以，JSON 不可以。
- **False** — `All HTTP versions transmit messages as HTTP/1.1 text lines.` — HTTP/2、HTTP/3 有不同帧机制。

## 5. Exam Quick Reference（考前速查）

- **Request**：method、target、version、headers、空行、可选 body。
- **Accept → response wanted；Content-Type → current body type**。
- **GET/HEAD safe；PUT/DELETE idempotent；POST 不保证幂等**。
- **Fragment 不上服务器；path 不必是真文件**。
- **201 已创建；202 已接受；204 无内容；304 用缓存**。
- **401 认证；403 拒绝；406 响应协商；415 请求类型**。
- **JSON**：双引号、无函数、无注释、无尾逗号。

# Lecture 4 — HTML（结构、链接与表单）

## 1. Core Concepts（核心概念）

### HTML & Semantic Structure（HTML 与语义结构）【p.4–8】

- **HTML is a markup language for content and structure.** — HTML 是标记语言，不是网络协议；p.4 的 “protocol” 用词不准确。
- **Semantic elements describe the role of content.** — `header`、`nav`、`article`、`aside`、`footer` 表达内容职责。
- **Semantic meaning does not prescribe a particular visual layout.** — `nav` 不意味着必须横向排列；布局主要由 CSS 决定。
- **Not every element requires an end tag.** — `img`、`input`、`meta`、`hr` 等是 void elements。
- **The document head contains metadata; the body contains page content.** — `head` 与页面里的 `header` 不是一回事。
- **The HTML doctype enables standards mode in normal HTML documents.** — `<!DOCTYPE html>` 不是普通页面元素。

### Attributes（属性）【p.9】

- 属性给元素附加信息，如 `id`、`class`、`href`、`style`。
- **A boolean attribute is true by its presence.** — 对支持该属性的元素，`disabled="false"` 仍然表示 disabled。
- **Attributes are not universally applicable to all elements.** — p.9 在 `article` 上写 `disabled` 不会让普通文章元素自动获得原生禁用行为。
- **Use straight quotation marks in executable examples.** — PPT 的中文/弯引号需要换成普通引号。

### Links（链接）【p.10–11】

- **The href attribute determines the link destination.** — 链接文字和目标 URL 独立。
- **Relative URLs are resolved against a base URL.** — `/users` 是站点根路径；`users` 相对当前基础路径。
- 链接可指向页面、资源或片段，不限于本地 HTML 文件。

### Native Form Submission（原生表单提交）【p.12–15】

- **A form can submit without JavaScript.** — HTML 自带提交能力。
- **action specifies the submission destination.** — 请求发到哪里。
- **method specifies how the form is submitted.** — 普通表单主要使用 GET 或 POST；默认 GET。
- **name identifies a successful control in submitted form data.** — 传给服务端的键通常由 name 决定，而非 id。
- **id identifies an element in the document.** — 用于标签关联、DOM 查询等。
- **A label's for attribute refers to a control's id.** — 点击标签可聚焦相应输入框。
- **A button associated with a form defaults to submit unless otherwise specified.** — 不想提交应明确 `type="button"`。
- **Password inputs obscure display, not network transmission.** — `type="password"` 只遮住界面内容，传输仍需 HTTPS。

### GET vs. POST Form Encoding（表单编码）【p.13】

**【课件修正】** p.13 把 POST 表单字段直接画在 URL 查询串里。对普通原生表单：

- **GET**：表单字段编码到 URL query。
- **POST + application/x-www-form-urlencoded**：表单字段通常放在请求 body。
- POST 的 action 自己仍可以带 query，但那不等于“POST 表单字段默认都进入 query”。
- **File upload normally uses multipart/form-data.** — 上传文件应使用合适的 enctype。
- 未勾选 checkbox、未选中 radio、disabled 控件等通常不作为普通成功控件提交。
- **readonly is different from disabled.** — 适用控件的 readonly 值通常仍提交；disabled 通常不提交。

## 2. Comparisons & Distinctions（易混淆概念对比）

| 对比 | 前者 | 后者 |
|---|---|---|
| `head` / `header` | 文档元数据容器 | 页面或区块的语义页头 |
| `id` / `name` | 文档内标识 | 表单提交字段名 |
| `div` / `article` | 通用容器 | 具有独立内容意义的文章/条目 |
| `type="button"` / `type="submit"` | 普通按钮 | 触发表单提交 |
| GET form / POST form | 字段通常在 query | 字段通常在 body |
| `disabled` / `readonly` | 通常不可交互且不提交 | 对适用控件禁止编辑但通常仍提交 |
| Password masking / Encryption | 显示遮挡 | 数据保护机制 |

## 3. APIs & Configurations（API 与配置速查）

- `npm install` — 【p.3】安装项目依赖；npm 同样管理客户端与服务端使用的包，不只服务端。
- `<html lang="en">` — 声明文档主要语言。
- `<meta charset="UTF-8">` — 指定字符编码。
- `<a href="/users">Users</a>` — 显示 Users，链接到站点根路径 `/users`。
- `<form action="/register" method="post">` — 原生 POST 提交到 `/register`。
- `<input id="username" name="user" type="text">` — DOM 标识 username；提交字段名 user。
- `<label for="username">Username</label>` — 将标签关联到对应 id。
- `<input type="password" name="password">` — 遮挡显示输入内容，不执行加密。
- `<input type="radio" name="role" value="student">` — 同名 radio 在同一组内通常单选；提交选中项的 value。
- `<select name="car">` — 提交所选 option 的值。
- `<button type="button">Cancel</button>` — 不触发原生表单提交。
- `<form method="post" enctype="multipart/form-data">` — 【补充】适合包含文件上传的原生表单。

### 小代码题：注册表单【p.15；代码整理】

```html
<form action="/form_handler" method="post">
  <label for="username">Username</label>
  <input id="username" name="username" required>

  <label for="first">First name</label>
  <input id="first" name="first">

  <label for="last">Last name</label>
  <input id="last" name="last">

  <label for="password">Password</label>
  <input id="password" name="password" type="password" required>

  <button type="submit">Register</button>
</form>
```

写题顺序：**form 的 action/method → 控件 name → label/id → password type → submit 按钮**。

## 4. True / False Traps（判断题陷阱）

- **False** — `HTML is a network protocol.` — 它是标记语言。
- **False** — `Semantic tags determine the exact visual position of their content.` — 语义不等于布局。
- **False** — `Every HTML element needs a closing tag.` — void elements 例外。
- **False** — `A form requires JavaScript to submit data.` — 原生提交不需要。
- **False** — `The id attribute determines the submitted field name.` — 通常看 name。
- **False** — `POST form fields are always appended to the URL.` — 默认 URL 编码 POST 字段通常在 body。
- **False** — `A password input encrypts the password.` — 只遮挡显示。
- **False** — `disabled="false" enables a control.` — 布尔属性出现即为真。
- **True** — `A regular button inside a form may submit it if no type is specified.` — 默认 submit，应显式声明用途。

## 5. Exam Quick Reference（考前速查）

- **HTML structure；CSS layout；JS behavior**。
- **id 查元素；name 交字段；label for 对 id**。
- **GET → query；POST → body（常见默认编码）**。
- **password ≠ encryption**。
- **button 默认可能 submit**。
- **disabled 不等于 readonly**。

# Lecture 5 — HTML & CSS（选择器、级联与布局）

## 1. Core Concepts（核心概念）

### Normal Flow（普通文档流）【p.3–13】

- **Block-level boxes normally stack in the block direction.** — 本章示例中的 div、article 等默认纵向排列。
- **Inline content normally participates in line layout.** — span 等通常在同一行流动，空间不足时换行。
- **Default display behavior can be changed with CSS.** — 标签不是永久绑定某种布局方式。
- **Visual layout follows the element hierarchy and CSS rules.** — DOM 嵌套关系影响布局，但显示效果可由 CSS 改变。

### ID & Class（标识与类）【p.14–16】

- **An id should be unique within a document.** — 不是整个网站只能用一次，而是同一文档中唯一。
- **A class may be shared by multiple elements.** — 多个元素可以复用。
- **An element may have multiple classes.** — 例如 `class="card selected"`。
- 不要求每个元素都有 id 或 class。

### Cascade, Specificity & Inheritance（级联、优先级与继承）【p.17–19、26】

- **Multiple matching rules can contribute different properties to one element.** — 多条匹配规则可以分别贡献颜色、字号等。
- **Conflicting declarations are resolved by the cascade.** — 同一属性冲突时需要比较级联规则。
- **Specificity is not simply source order.** — 不是所有情况下“后写的覆盖前写的”。
- 在可比的普通作者规则中，常见优先级：**ID > class / attribute / pseudo-class > type**。
- **Source order breaks ties only after earlier cascade criteria are equal.** — 前面条件相同，后出现者才胜出。
- **Inheritance applies only to inheritable properties.** — color、font 等常继承；margin、border 不会都自动继承。
- **A directly specified value generally wins over a value merely inherited from an ancestor.** — 父元素选择器再强，也不代表其继承值能压过子元素自己的直接声明。

**【课件修正】** “Last value wins”是简化。还需考虑来源、`!important`、层、specificity 等。考试读普通片段时先比较选择器，再比较先后顺序。[MDN：Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity)

### Selectors & Combinators（选择器与组合符）【p.18】

| 写法 | 匹配含义 |
|---|---|
| `div` | 所有 div |
| `.card` | 含 card 类的元素 |
| `#hero` | id 为 hero 的元素 |
| `*` | 通配元素 |
| `[type="text"]` | type 属性值为 text |
| `.card.selected` | 同一个元素同时有两个类 |
| `div span` | div 内的 span 后代，不要求直接子级 |
| `div > span` | div 的直接 span 子元素 |
| `h2 + p` | 紧邻 h2 之后的 p 同级元素 |
| `h2 ~ p` | h2 之后的所有匹配 p 同级元素 |
| `h2, p` | 分别匹配 h2 与 p |

### Display & Position（显示与定位）【p.20】

| 值 | 核心行为 |
|---|---|
| `display: none` | 不生成布局盒，不占原布局空间 |
| `display: block` | 普通流中按块级盒布局 |
| `display: inline` | 行内布局，普通非替换行内元素的宽高不按 block 方式生效 |
| `display: inline-block` | 参与行内排列，同时可设置盒子宽高 |
| `display: flex` | 建立 Flex 容器 |
| `display: grid` | 建立 Grid 容器 |
| `position: relative` | 保留原文档流位置，视觉上可偏移 |
| `position: absolute` | 脱离普通流，相对其 containing block 定位 |
| `position: fixed` | 脱离普通流，通常相对视口定位 |

**【课件修正】** p.20 写的 `display: flexbox` 不是当前标准写法；应为 `display: flex`。

**【补充边界】** absolute 不一定相对直接父元素；fixed 也有由 transform 等形成包含块的特殊情况。

### Table, Flexbox & Grid（布局方式）【p.21–25】

- **Table layout uses tabular structure.** — `table`、`tr`、`th`、`td` 分别表达表格、行、表头单元格、数据单元格。
- **Flexbox is primarily one-dimensional.** — 围绕主轴与交叉轴组织布局，可换行。
- **Grid is primarily two-dimensional.** — 同时规划行与列。
- **Flex and Grid do not require special-purpose HTML tags.** — 普通容器即可。
- **Flex settings on a container primarily control its direct flex items.** — 不是所有层级后代自动都是 flex item。
- **justify-content aligns along the main axis.** — 不要永远背成“水平居中”。
- **align-items aligns items along the cross axis.** — column 方向下主轴为纵向，交叉轴为横向。
- **align-self overrides cross-axis alignment for an individual item.** — 单个项目覆盖容器 align-items。
- **Named grid areas must form rectangles.** — 同名区域不能拼成任意 L 形。

### Responsive Design（响应式设计）【p.29–31】

- **Media queries conditionally apply CSS.** — 满足屏幕等条件时追加参与级联的规则。
- **max-width: 600px includes 600px.** — 是不大于 600，不只是小于 600。
- **Viewport metadata influences layout viewport behavior on mobile devices.** — 防止移动端按较宽的虚拟视口缩放整页。
- **Responsive design is not equivalent to maintaining a separate mobile website.** — 可以由同一页面适应不同尺寸。

## 2. Comparisons & Distinctions（易混淆概念对比）

| 对比 | 前者 | 后者 |
|---|---|---|
| `#id` / `.class` | 文档唯一标识，specificity 较高 | 可复用，可多个 |
| Descendant / Child | 任意深度后代 | 直接子级 |
| `+` / `~` | 紧邻后续兄弟 | 所有后续匹配兄弟 |
| Flex / Grid | 主要一维 | 主要二维 |
| Main axis / Cross axis | 由 flex-direction 决定 | 与主轴垂直 |
| Relative / Absolute | 保留原流位置 | 脱离普通流 |
| `display: none` / `opacity: 0` | 不占布局空间 | 通常仍占空间且可能接收交互 |
| Cascade / Inheritance | 多条声明竞争 | 属性从祖先传给后代 |

## 3. APIs & Configurations（API 与配置速查）

- `<link rel="stylesheet" href="/style.css">` — 引入外部 CSS。
- `font: 11px sans-serif;` — 字体简写；简写可能重设相关子属性。
- `color: #eee;` — 文本前景色。
- `background: #626262;` — 背景简写。
- `width: 100%;` — 百分比宽度；参照规则依上下文而定。
- `height: 100%;` — 不保证自动等于视口高度，需要考虑包含块高度。
- `overflow: hidden;` — 裁剪溢出内容；不等同于隐藏整个元素。
- `padding-left: 8px;` — 内容与边框之间的左内边距。
- `margin-right: 15px;` — 外边距。
- `float: left;` — 浮动，影响周围内容流动；不是 Flexbox。
- `text-decoration: none;` — 去除文本装饰。
- `border-color: #626262;` — 边框颜色；单设颜色不保证存在可见边框。
- `text-shadow: 0 0 1px #000;` — 文字阴影。
- `box-shadow: inset 0 0 3px #4fa;` — 内阴影。
- `cursor: pointer;` — 鼠标指针外观，不会自动增加点击行为。
- `opacity: 0.6;` — 整个元素及其内容的透明度效果。
- `display: flex;` — 开启 Flex 布局。
- `flex-direction: column;` — 主轴改为纵向。
- `flex-wrap: wrap;` — 空间不足时允许换行/列，效果取决于轴及尺寸约束。
- `justify-content: center;` — 主轴方向对齐。
- `align-items: center;` — 交叉轴方向对齐。
- `align-self: flex-start;` — 单项交叉轴对齐覆盖。
- `display: grid;` — 开启 Grid 布局。
- `grid-template-columns: 80px 90px 80px;` — 定义三列。
- `grid-template-rows: 50px 50px 50px;` — 定义三行。
- `grid-area: a;` — 将项目放入名为 a 的区域。
- `table-layout: auto;` — 使用自动表格布局算法。
- `@media screen and (max-width: 600px) { ... }` — 对符合条件的屏幕视口应用规则。
- `<meta name="viewport" content="width=device-width, initial-scale=1">` — 配置移动端布局视口和初始缩放。

### 小代码题：桌面横排，手机纵排【课件知识组合】

```css
.container {
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 600px) {
  .container {
    flex-direction: column;
  }

  .desktop-only {
    display: none;
  }
}
```

记忆顺序：**容器 display → 方向 → 两轴对齐 → media query 覆盖方向或隐藏内容**。

## 4. True / False Traps（判断题陷阱）

- **False** — `The last CSS declaration always wins.` — 先比较级联条件和优先级。
- **False** — `Every CSS property is inherited.` — 只有可继承属性才通常继承。
- **True** — `An element may belong to multiple classes.` — class 可列多个值。
- **False** — `A descendant selector matches only direct children.` — 后代不限一层。
- **False** — `justify-content always controls horizontal alignment.` — 它控制主轴。
- **False** — `display: flexbox is the standard way to create a flex container.` — 应写 flex。
- **False** — `position: absolute always positions relative to the direct parent.` — 看 containing block。
- **False** — `opacity: 0 removes the element from layout.` — 通常仍占位。
- **True** — `max-width: 600px matches a viewport width of exactly 600px.` — 包含边界。
- **False** — `Grid requires table elements.` — 普通元素即可。
- **False** — `Setting cursor: pointer makes an element execute a click handler.` — 只改外观。

## 5. Exam Quick Reference（考前速查）

- **Specificity**：ID > class/attribute > type；同条件才后写胜出。
- **空格 后代；`>` 子级；`+` 紧邻；`~` 后续兄弟**。
- **Flex 主轴看 direction；justify 主轴；align 交叉轴**。
- **Grid 行列二维；同名区域必须矩形**。
- **relative 占原位；absolute/fixed 脱普通流**。
- **max-width 包含边界；viewport 配合移动端响应式**。

# Lecture 6 — JavaScript Basics（类型、作用域与表达式）

## 1. Core Concepts（核心概念）

### Language & Execution（语言与执行）【p.3–4】

- **JavaScript is dynamically typed.** — 变量绑定没有固定的静态值类型，运行时值有类型。
- **JavaScript can run in browsers and server-side runtimes.** — 浏览器和 Node.js 都能运行。
- **JavaScript execution commonly uses a single main thread per execution context.** — 不等于宿主环境完全没有其他线程。
- **JavaScript is not “entirely asynchronous.”** — 普通表达式、循环、函数调用通常同步执行。
- **【课件简化】** “Interpreted language”不应理解为现代引擎不会进行 JIT 编译。

### var, let & const（声明与作用域）【p.6】

| 声明 | 主要作用域 | 能否重新赋值 | 关键陷阱 |
|---|---|---|---|
| `var` | 函数作用域 | 可以 | 不受普通块限制；声明提升，初始化前常为 undefined |
| `let` | 块作用域 | 可以 | 初始化前处于 TDZ |
| `const` | 块作用域 | 不可重新绑定 | 对象内容仍可能修改 |

- **const prevents reassignment of the binding, not mutation of an object.** — 禁止变量改指向，不等于深冻结。
- **Undeclared assignment is not a valid general-purpose declaration strategy.** — p.6 的裸赋值只可能在某些非严格环境创建全局属性；严格模式和模块中通常抛 `ReferenceError`。
- **A variable declared with let in a for loop is not available outside that loop's scope.** — p.7 各片段应分开理解，不能认为前面的 `let i` 自动供后面的 while 使用。
- **Whitespace is not completely irrelevant.** — 自动分号插入、`return` 后换行等会改变行为。

### Equality & Truthiness（相等与真假值）【p.8】

- **`=` assigns a value.** — 赋值，不是比较。
- **`==` performs coercive equality comparison.** — 存在类型转换规则。
- **`===` compares without coercing operand types.** — 不会先把字符串转成数字。
- 常见 falsy：`false`、`0`、`-0`、`0n`、`""`、`null`、`undefined`、`NaN`。
- **Empty arrays and empty objects are truthy.** — `[]`、`{}` 不是假。
- **The string "false" is truthy.** — 非空字符串。
- **NaN is not equal to itself using either == or ===.**
- **Objects are compared by identity.** — 两个内容一样的新对象也不严格相等。

### Strings & Template Literals（字符串与模板字面量）【p.9–10】

- **Strings are immutable.** — 字符串方法通常返回新字符串，不原地改内容。
- **`+` may concatenate strings.** — `"2" + 3` 得到 `"23"`。
- **`*` attempts numeric conversion.** — `"2" * 3` 得到 6，`"graham" * 2` 得到 NaN。
- **Template literals support interpolation and multiline text.** — 反引号配合 `${expression}`。
- **String length counts UTF-16 code units.** — 不保证等于用户看到的字符数量。

## 2. Comparisons & Distinctions（易混淆概念对比）

| 表达式 | 结果 | 原因 |
|---|---|---|
| `2 == "2"` | `true` | 宽松比较允许转换 |
| `2 === "2"` | `false` | 类型不同 |
| `Boolean([])` | `true` | 数组是对象 |
| `Boolean({})` | `true` | 对象 truthy |
| `Boolean("0")` | `true` | 非空字符串 |
| `NaN === NaN` | `false` | NaN 的比较规则 |
| `[] === []` | `false` | 两个不同对象 |
| `"5" + 1` | `"51"` | 字符串拼接 |
| `"5" * 2` | `10` | 数值转换 |

## 3. APIs & Configurations（API 与配置速查）

### 常用字符串 API【p.9】

- `str.length` — UTF-16 code unit 数量，不是函数。
- `str.repeat(n)` — 返回重复 n 次的新字符串；非法次数可能抛错。
- `str.charAt(i)` — 返回指定位置字符；越界返回空字符串。
- `str.charCodeAt(i)` — 返回该位置 UTF-16 code unit；越界 NaN。
- `str.codePointAt(i)` — 读取 Unicode code point；索引仍按 code unit。
- `String.fromCharCode(65)` — 根据 UTF-16 code unit 创建字符串，此例 `"A"`。
- `String.fromCodePoint(0x1F600)` — 根据 Unicode code point 创建字符串。
- `str.concat(other)` — 返回拼接结果，不修改原字符串。
- `str.includes(part)` — 是否包含，返回 boolean。
- `str.startsWith(part)` / `str.endsWith(part)` — 检查前缀或后缀。
- `str.indexOf(part)` / `str.lastIndexOf(part)` — 返回匹配位置，找不到为 `-1`。
- `str.slice(start, end)` — 截取 `[start, end)`；支持负索引。
- `str.substring(start, end)` — 截取字符串；负值按 0，起止反向时会交换。
- `str.split(separator)` — 返回字符串数组。
- `str.replace(pattern, replacement)` — 返回替换结果；字符串 pattern 通常只替换首个匹配。
- `str.match(regex)` — 正则匹配；无匹配时返回 null，数组形态取决于标志。
- `str.search(regex)` — 返回首个匹配位置，找不到为 -1。
- `str.trim()` — 去除两端空白，返回新字符串。
- `str.toLowerCase()` / `str.toUpperCase()` — 返回大小写转换结果。
- `str.toLocaleLowerCase()` / `str.toLocaleUpperCase()` — 按区域相关规则转换。
- `str.localeCompare(other)` — 返回负数、0 或正数，不保证固定为 -1 或 1。
- `str.normalize()` — 返回 Unicode 规范化字符串。
- `str.toString()` / `str.valueOf()` — 获取字符串表示或包装对象的原始字符串值。

**【旧 API 识别即可】** p.9 的 `anchor()`、`big()`、`blink()`、`bold()`、`fixed()`、`fontcolor()`、`fontsize()`、`italics()`、`link()`、`small()`、`strike()`、`sub()`、`sup()` 是旧 HTML 包装方法；不要作为现代 DOM 或安全 HTML 构造方案。`substr()` 属于遗留接口；`quote()`、`toSource()` 不应当作通用标准 API。`trimLeft()` / `trimRight()` 对应更清楚的名称是 `trimStart()` / `trimEnd()`。

### 小代码题：Factorial【p.11】

```javascript
function FirstFactorial(num) {
  let result = 1;

  for (let i = 2; i <= num; i++) {
    result *= i;
  }

  return result;
}
```

- 初始化 1，逐个累乘，返回结果。
- 课件输入范围 1–18；Number 不保证能精确表达任意大的整数，不要把此实现推广为无限精度阶乘。

## 4. True / False Traps（判断题陷阱）

- **False** — `const makes an object immutable.` — 只禁止重新绑定。
- **False** — `An empty array is falsy.` — 数组 truthy。
- **False** — `Every defined value is truthy.` — 0、false、空字符串等都是已定义值。
- **False** — `=== converts strings to numbers before comparison.` — 不做这种类型转换。
- **False** — `JavaScript has no synchronous execution.` — 普通代码通常同步。
- **False** — `Assigning to an undeclared variable always creates a global variable.` — 严格模式或模块会报错。
- **True** — `String methods normally return new strings instead of mutating the original string.` — 字符串不可变。
- **False** — `String length always equals the number of visible characters.` — UTF-16 与可见字符不一一对应。
- **False** — `Whitespace can never change JavaScript behavior.` — 换行与 ASI 存在例外。

## 5. Exam Quick Reference（考前速查）

- **var 函数；let/const 块；const 非深冻结**。
- **Falsy**：false、0、-0、0n、空串、null、undefined、NaN。
- **`[]` / `{}` / `"false"` 都 truthy**。
- **`==` 转换；`===` 不转换；对象比较身份**。
- **字符串不可变；length 是 UTF-16 单元数**。
- **裸赋值别当合法声明；模块默认严格模式**。

# Lecture 7 — Functions, Objects & Modules（函数、对象与模块）

## 1. Core Concepts（核心概念）

### Functions Are Values（函数是一等值）【p.3–8】

- **Functions can be assigned, passed and returned.** — 可存变量、传参、作为返回值。
- **A function declaration and a function expression differ in initialization behavior.** — 函数声明通常可在声明行前调用；const/let 绑定的函数表达式初始化前不能调用。
- **A named function expression's name is primarily visible inside its own function body.** — `const f = function inner() { ... }` 不会通常创建外部变量 inner。
- **Calling a function is different from passing it.** — `handler` 是函数值；`handler()` 是立即调用结果。

### Closures（闭包）【p.4–5、14–15】

- **A closure retains access to its lexical environment.** — 内部函数可以持续访问创建时的外层作用域。
- **The outer function may finish before the closure is called.** — 外层执行结束不代表捕获变量立刻失效。
- **Separate outer function calls create separate environments.** — 两次 `makeCounter()` 各有自己的计数变量。
- **Closures capture bindings, not frozen snapshots of every value.** — 被捕获变量后续变化可能被观察到。
- **Closure variables can hide implementation state.** — 外部不能像访问公开对象属性一样直接访问局部变量。

### Arrow Functions & this（箭头函数与 this）【p.6–9】

- **Arrow functions capture this lexically.** — 使用外围 this，不由调用形式重新绑定。
- **Regular function this depends on how it is called.** — 作为对象方法、普通调用、定时器回调等情况不同。
- **Arrow functions do not have their own arguments object.** — 需要参数集合可用 rest 参数。
- **Arrow functions cannot be used as constructors with new.**
- **An expression body returns implicitly; a block body requires return.**

```javascript
items.map(item => item.length);          // 隐式返回
items.map(item => { return item.length; }); // 显式返回
items.map(item => { item.length; });     // 每项返回 undefined
items.map(item => ({ length: item.length })); // 返回对象要加括号
```

### JSON vs. JavaScript Objects（JSON 与对象）【p.10–11】

- **A JavaScript object can contain functions; JSON cannot.**
- **JSON text still needs parsing to become a JavaScript value.** — “语言内置支持”不代表完全不用解析。
- **Serialization is needed to turn an object into JSON text.**
- **JSON supports nested objects as well as arrays and primitive values.** — 课件值列表遗漏 object。
- **Objects are more than plain JSON containers.** — 还涉及原型、属性描述符、方法等。

**【课件修正】** p.10–11 示例存在缺逗号等排版问题；不要原样复制为合法代码。

### Classes & Prototypes（类与原型）【p.12–15】

- **ES classes build on JavaScript's prototype-based object model.**
- **constructor initializes an instance.**
- **extends establishes inheritance.**
- **Prototype methods are shared through the prototype chain.** — 不必为每个实例复制同一个方法。
- **A subclass constructor must call super before accessing this.** — 若显式写派生类构造器，需要先初始化父类部分。
- **An underscore prefix does not enforce privacy.** — `_name` 只是命名习惯。
- **Closure-based privacy is different from public object properties.**

**【课件过时】** p.14 “private 不是原生概念”不能作为当前 JavaScript 的绝对结论。现代类支持 `#privateField`；课件展示的是闭包隐私模式。

### Modules（模块）【p.16–22】

- **ES modules use import and export.**
- **CommonJS uses require and module.exports.**
- **A module can have multiple named exports and one default export.**
- **A default import may choose its local name.**
- **Named imports use exported names unless aliased.**
- **A side-effect import executes module code without binding a local imported value.**
- **Native browser modules do not provide require by default.** — CommonJS 通常需要打包或兼容环境。
- **Module syntax alone does not implement SPA routing or bundle everything into one file.**

**【课件修正】** p.20 的 `export myFunction() { ... }` 缺少 `function`；正确函数声明形式见下方。

## 2. Comparisons & Distinctions（易混淆概念对比）

| 对比 | 前者 | 后者 |
|---|---|---|
| `fn` / `fn()` | 函数值 | 调用结果 |
| Declaration / Expression | 函数声明通常提前初始化 | 取决于承载它的变量绑定 |
| Regular / Arrow | this 由调用形式等决定 | 词法 this |
| Closure local / Object property | 由作用域限制访问 | 可按属性规则访问 |
| JSON / Object | 文本数据格式 | 运行时结构，可有方法 |
| Named / Default export | 可多个，按名导入 | 一个，导入名可自定 |
| ESM / CommonJS | import/export | require/module.exports |

## 3. APIs & Configurations（API 与配置速查）

- `materials.map(material => material.length)` — 返回新数组；保留索引对应关系；不等待 async 回调完成。
- `setTimeout(() => this.work(), 100)` — 100ms 后具备执行资格；箭头回调保留外围 this。
- `class Student extends Person { ... }` — 建立继承关系。
- `super(first, last)` — 在派生类构造器中调用父类构造器。
- `Person.prototype.hello = function () { ... }` — 在原型上定义共享方法。
- `export function greet() { ... }` — 命名导出函数。
- `export const version = 1` — 命名导出变量。
- `export { greet, version }` — 导出已有绑定。
- `export default greet` — 将已有函数作为默认导出，不是在这里调用它。
- `export default function greet() { ... }` — 声明并默认导出函数。
- `import { greet } from "./utils.js"` — 导入命名导出。
- `import { greet as sayHello } from "./utils.js"` — 命名导入并设置本地别名。
- `import anything from "./utils.js"` — 导入该模块的默认导出。
- `import * as utils from "./utils.js"` — 获取模块命名空间对象。
- `import "./setup.js"` — 仅为模块副作用而导入。
- `module.exports = { greet, version }` — CommonJS 导出对象。
- `const { greet } = require("./utils.cjs")` — CommonJS 加载并提取属性。
- `import("./utils.js")` — 【补充】动态导入，返回 Promise，不直接返回模块对象。
- `<script type="module" src="/main.js"></script>` — 【补充】浏览器以模块方式加载入口。

### 小代码题：独立计数器【p.4–5】

```javascript
function makeCounter() {
  let count = 0;

  // 返回函数，暂时不调用。
  // 这个函数继续保留对本次 makeCounter 调用中 count 的访问。
  return function () {
    count += 1;
    return count;
  };
}

const a = makeCounter();
const b = makeCounter();

console.log(a()); // 1
console.log(a()); // 2
console.log(b()); // 1：不是 3，b 有自己的闭包环境
```

### 小代码题：类与异步 this【p.9、12】

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  greetLater() {
    // 箭头函数沿用 greetLater 被正常作为方法调用时的 this。
    setTimeout(() => {
      console.log(this.name);
    }, 100);
  }
}

const user = new Person("Ada");
user.greetLater();
```

注意：若把 `user.greetLater` 拿出来当裸函数调用，外层方法自身的 this 就可能已丢失；内部箭头函数不会神奇恢复 user。

## 4. True / False Traps（判断题陷阱）

- **True** — `A closure may access outer variables after the outer function returns.` — 闭包保留作用域访问。
- **False** — `All counters returned by makeCounter necessarily share one local counter.` — 每次调用可有独立环境。
- **False** — `Arrow functions always use the object that calls them as this.` — 箭头函数是词法 this。
- **False** — `An arrow function with braces automatically returns its last expression.` — 块体需要 return。
- **False** — `JSON supports functions because JavaScript objects support functions.` — 两者不同。
- **False** — `A leading underscore makes a property private.` — 只是约定。
- **False** — `Modern JavaScript has no native private fields.` — 有 `#` 私有字段。
- **False** — `A module may have several default exports.` — 同一模块只有一个 default。
- **False** — `A default import must use the original declaration name.` — 可自选本地名。
- **False** — `CommonJS require is automatically available in every browser script.` — 通常不提供。
- **False** — `import("./module.js") returns the module synchronously.` — 返回 Promise。

## 5. Exam Quick Reference（考前速查）

- **Closure**：捕获词法绑定；独立调用独立环境。
- **Arrow**：词法 this；无自身 arguments；不可 new。
- **map + `{}`**：记得 return；返回对象用括号。
- **Class**：prototype；extends；super。
- **Privacy**：闭包、现代 `#field`；下划线不是访问控制。
- **ESM**：named 多个、default 一个。
- **CommonJS**：require + module.exports。
- **动态 import → Promise**。

# Lecture 8 — JavaScript with HTML（DOM、表单与 AJAX）

## 1. Core Concepts（核心概念）

### Integrating JavaScript（脚本集成）【p.3–4】

- **JavaScript may be embedded inline or loaded from external files.**
- **External files improve separation and reuse.** — 不代表所有内联脚本都错误。
- **Code must access DOM elements after they exist.** — 放在 head 的立即执行代码可能找不到尚未解析的 body 元素。
- 【补充】可通过脚本位置、`defer`、模块脚本或 DOMContentLoaded 协调时机。
- **Loading an external script does not automatically make it a module.** — 普通 script 与 type=module 不同。

### DOM（文档对象模型）【p.5–7、10–19】

- **The DOM represents the document as objects that scripts can inspect and modify.**
- **Creating a node does not automatically insert it into the document.**
- **Appending an existing node moves that node instead of cloning it.**
- **Selectors return elements or collections, not HTML source strings.**

| 查询 | 返回 | 无匹配 |
|---|---|---|
| `getElementById()` | 单个 Element | null |
| `querySelector()` | 首个匹配 Element | null |
| `querySelectorAll()` | 静态 NodeList | 空集合 |
| `getElementsByClassName()` | live HTMLCollection | 空集合 |
| `getElementsByTagName()` | live HTMLCollection | 空集合 |

**【课件修正】** p.14–19 的 `div.user-panel.main input[name='login']`：

- 查找同时有 `user-panel`、`main` 两个类的 div。
- 再查它内部任意深度、name 为 login 的 input。
- **空格是 descendant，不保证 input 是 div 的直接子元素。**
- `querySelector` 只返回首个匹配项。

### Event Handlers（事件处理）【p.8–9】

- **An event handler is registered for a particular event type.**
- **Assigning onclick replaces the previous onclick property value.**
- **addEventListener allows multiple listeners for the same event.**
- **The callback receives an event object.**
- **A NodeList is not itself a single DOM element.** — 不能简单对集合调用元素的 addEventListener，通常需遍历。

常见事件分组：

- 焦点：`focus`、`blur`。
- 键盘：`keydown`、`keyup`；`keypress` 为遗留接口。
- 鼠标：`click`、`dblclick`、`mousedown`、`mousemove`、`mouseenter`、`mouseleave`、`mouseover`、`mouseout`。
- 表单：`input`【补充】、`change`、`submit`、`reset`。
- 资源：`load`、`error`。
- 剪贴板：`cut`、`copy`、`paste`。
- 拖放：`dragstart`、`dragover`、`drop` 等。

### Form Handling（表单处理）【p.20–26】

- **Reading input values does not submit the form.**
- **Adding a click handler does not automatically cancel native form submission.**
- **preventDefault cancels the event's default action when cancellation is supported.**
- **preventDefault does not stop propagation.** — 阻止冒泡需另用 stopPropagation。
- **Listen to the form's submit event to cover more submission paths.** — 比只监听按钮 click 更稳妥，能覆盖常见 Enter 提交。
- **Input value is normally a string.** — number 输入的 `.value` 也通常是字符串，必要时转换。

**【课件提醒】** p.21–24 示例只是读取并打印字段，未阻止原生提交，还存在不匹配的闭合标签；不能直接当完整 AJAX 表单模板。

### AJAX（异步请求与局部更新）【p.27–30】

- **AJAX fetches data without requiring full-page navigation.**
- **AJAX does not require XML.** — 常用 JSON。
- **AJAX is a technique, not one specific library.**
- **XMLHttpRequest and Fetch are different APIs for network requests.**
- **An asynchronous response arrives later; results cannot normally be returned synchronously from a callback.**

### Fetch（请求、响应与失败）【p.28–30】

- **fetch returns a Promise for a Response.**
- **Response body parsing is another asynchronous step.**
- **HTTP 404/500 normally do not reject fetch's Promise.** — 需检查 `response.ok` 或 status。
- **Network failure and abort can reject the Promise.**
- **JSON request bodies require serialization and an appropriate Content-Type.**
- **A response body is normally consumed once.** — 不要对同一个 body 连续 json 后又 text，除非提前 clone。
- **AbortController can cancel a supported fetch operation.**
- **Ignoring a stale response is different from cancelling the operation.** — 忽略结果不代表服务端没执行。

**【课件修正】** p.29 “必须显式指定 credentials 才发送当前域 Cookie”过时。当前 Fetch 默认 `credentials: "same-origin"`，同源请求通常会携带符合规则的 Cookie。[MDN：Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

- **Same-origin means scheme, host and port match.** — 不是只比较域名。
- **credentials: include does not override all cookie restrictions.** — 仍受 SameSite、Secure、浏览器策略等影响。
- **mode: no-cors does not disable CORS protection.** — 通常得到受限 opaque 响应，不能任意读取。

### jQuery（库，不是原生 DOM）【p.31–34】

- **jQuery wraps DOM operations and provides utilities.**
- **A jQuery collection is not the same type as a native DOM element.**
- **The dollar sign is a valid JavaScript identifier, not proof of jQuery.**
- **jQuery AJAX dataType describes the expected response type.**
- **contentType describes the request body media type.** — 不要和 dataType 混淆。
- **Updating text is different from inserting HTML.** — `.text()` 适合把不可信文本显示出来。

## 2. Comparisons & Distinctions（易混淆概念对比）

| 对比 | 前者 | 后者 |
|---|---|---|
| createElement / appendChild | 创建节点 | 插入或移动节点 |
| querySelector / querySelectorAll | 首个元素或 null | 静态集合 |
| onclick / addEventListener | 单一属性槽 | 可注册多个监听器 |
| preventDefault / stopPropagation | 取消默认行为 | 阻止后续传播 |
| input / change | 随编辑变化频繁触发 | 通常在值被提交/确认时触发，依控件而异 |
| load / DOMContentLoaded | 等待页面相关资源加载 | DOM 解析完成即可 |
| Fetch rejection / HTTP error | 网络、取消等请求失败 | 404/500 通常仍取得 Response |
| dataType / contentType | 预期响应格式 | 请求内容格式 |
| textContent / innerHTML | 作为文本设置 | 解析 HTML，存在注入风险 |

## 3. APIs & Configurations（API 与配置速查）

### DOM & Events

- `document.getElementById("foo")` — 按 id 查单个元素；没有则 null。
- `document.getElementsByClassName("bar")` — 返回 live HTMLCollection。
- `document.getElementsByTagName("article")` — 返回 live HTMLCollection。
- `document.querySelector(".panel input[name='login']")` — 返回首个匹配元素；无匹配 null。
- `document.querySelectorAll(".item")` — 返回静态 NodeList，可遍历。
- `document.createElement("h1")` — 创建未挂载元素。
- `document.createTextNode("Hello")` — 创建文本节点，不解析 HTML。
- `parent.appendChild(child)` — 插入/移动节点，返回 child。
- `element.textContent = text` — 设置纯文本，替换原子内容。
- `element.style.fontSize = "18pt"` — 修改内联样式；JS 属性名用 camelCase。
- `input.value` — 读取当前表单值，通常为字符串。
- `button.onclick = handler` — 设置 click 属性处理器，不要误写 `handler()`。
- `button.addEventListener("click", handler)` — 注册处理器。
- `button.removeEventListener("click", handler)` — 【补充】移除对应函数引用的监听器；capture 配置也需匹配。
- `event.preventDefault()` — 取消可取消事件的默认行为。
- `event.stopPropagation()` — 【补充】阻止传播，不自动取消默认行为。
- `window.onload = handler` — 设置页面 load 处理器，会覆盖原属性值。
- `document.addEventListener("DOMContentLoaded", handler)` — 【补充】DOM 解析完成后执行。
- `new FormData(form)` — 【补充】从表单收集成功控件字段，不自动发送。

### XMLHttpRequest

- `const xhr = new XMLHttpRequest()` — 创建请求对象。
- `xhr.open("GET", url, true)` — 配置异步请求；不会因此立即发送。
- `xhr.onload = function () { ... }` — 接收加载完成事件；仍需检查 HTTP status。
- `xhr.onerror = handler` — 处理网络层错误。
- `xhr.send()` — 发出请求。
- `xhr.responseText` — 文本响应；若为 JSON，需解析。
- `xhr.status` — HTTP 状态码。

### Fetch Options

- `fetch(url)` — 返回 `Promise<Response>`，不直接返回 JSON。
- `fetch(url, { method: "POST" })` — 指定请求方法。
- `headers: { "Content-Type": "application/json" }` — 指定 JSON 请求体类型。
- `body: JSON.stringify(data)` — 将对象编码为请求 JSON 文本。
- `mode: "cors"` — 使用 CORS 模式；不代表服务端已授权。
- `credentials: "same-origin"` — 默认只在同源请求中包含相关凭据。
- `credentials: "include"` — 跨源也允许考虑发送凭据，仍受 Cookie/CORS 规则约束。
- `credentials: "omit"` — 不包含凭据。
- `cache: "no-store"` — Fetch 请求缓存模式，不等于自动设置服务端所有响应缓存策略。
- `redirect: "follow"` — 默认跟随重定向。
- `redirect: "error"` — 遇重定向按错误处理。
- `redirect: "manual"` — 手动模式；浏览器暴露的信息可能受限制。
- `signal: controller.signal` — 将请求与 AbortController 关联。
- `controller.abort()` — 请求取消；不保证撤销服务端已发生的操作。
- `response.ok` — status 为 200–299 时为 true。
- `response.status` — HTTP 状态码；不是 `statusCode`。
- `await response.json()` — 异步读取并解析 JSON；非法 JSON 会失败。
- `await response.text()` — 异步读取文本。

### jQuery

- `$("#foo")` — 返回匹配元素的 jQuery 集合。
- `$("<p>New element</p>")` — 从 HTML 创建 jQuery 包装的节点。
- `newElement.appendTo("#content")` — 挂载到目标。
- `$("div").on("mouseenter mouseleave", handler)` — 为多种事件注册处理器。
- `$("#foo").addClass("noshow").removeClass("happy")` — 修改类，可链式调用。
- `$("#foo").text(value)` — 按文本设置内容。
- `$.get("/mydata.json", callback)` — 发起 GET，请求成功时执行回调。
- `$.ajax({ url, type: "PUT", data, dataType: "json", success })` — 配置 AJAX；dataType 是响应预期格式。
- `contentType: "application/json"` — 【补充】JSON 请求需同时考虑 `data: JSON.stringify(data)`。

### 代码题模板：收集表单 → POST → 更新列表【课件知识组合】

题目假设：页面上已有 `#create-form`、name 为 title 的输入框、`#status` 和 `#items`；API 返回新建条目。

```javascript
const form = document.querySelector("#create-form");
const status = document.querySelector("#status");
const list = document.querySelector("#items");
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async event => {
  // 先取消原生跳转，否则 AJAX 与原生提交可能同时发生。
  event.preventDefault();

  // FormData 根据 name 收集字段；输入值按业务需求转换和清理。
  const fields = new FormData(form);
  const title = String(fields.get("title") ?? "").trim();

  if (!title) {
    status.textContent = "Title is required";
    return;
  }

  submitButton.disabled = true;
  status.textContent = "Saving...";

  try {
    const response = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });

    // 404/500 不会自动进入 catch，所以自己检查。
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const item = await response.json();

    // 不把用户输入拼成 innerHTML，按文本显示。
    const li = document.createElement("li");
    li.textContent = item.title;
    list.appendChild(li);

    form.reset();
    status.textContent = "Saved";
  } catch (error) {
    status.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
});
```

做题顺序：**submit → preventDefault → 读字段 → 校验 → fetch → 检查 status → 解析 body → 改 DOM → 错误与按钮恢复**。

## 4. True / False Traps（判断题陷阱）

- **False** — `createElement immediately displays the element.` — 还需挂载。
- **False** — `querySelector returns every matching element.` — 只返回首个。
- **False** — `A space in a CSS selector means direct child.` — 是后代。
- **False** — `Adding a click handler prevents native form submission.` — 需取消默认行为。
- **False** — `preventDefault stops event bubbling.` — 和传播控制不同。
- **False** — `AJAX requires XML.` — JSON 等也可。
- **False** — `fetch rejects automatically for every 404 response.` — 通常返回正常 Response。
- **False** — `response.json() returns parsed JSON synchronously.` — 返回 Promise。
- **False** — `Fetch never sends cookies unless credentials is explicitly provided.` — 默认 same-origin。
- **False** — `mode: no-cors allows unrestricted access to cross-origin response data.` — 通常得到 opaque 响应。
- **False** — `Aborting a fetch guarantees that the server operation is rolled back.` — 不保证。
- **False** — `jQuery is the browser's native DOM API.` — 它是库。
- **False** — `jQuery dataType specifies the request Content-Type.` — 它描述预期响应。
- **False** — `Any variable named $ must be jQuery.` — `$` 只是合法标识符。

## 5. Exam Quick Reference（考前速查）

- **DOM**：查 → 创建 → 赋值 → 挂载。
- **querySelector 首个；All 静态；getElements 通常 live**。
- **表单**：submit + preventDefault；value 通常 string。
- **Fetch 两次 await**：Response → JSON。
- **HTTP 错误查 ok；网络/解析错误 catch**。
- **Cookie 默认 same-origin；no-cors 不解锁跨域**。
- **jQuery dataType 响应；contentType 请求**。

# Lecture 9 — Callbacks & Event Loop（回调与事件循环）

## 1. Core Concepts（核心概念）

### Synchronous vs. Asynchronous（同步与异步）【p.3–8、23–30】

- **Synchronous calls complete before control returns to the caller.**
- **Asynchronous APIs can return before their operation finishes.**
- **The completion result is delivered later through a callback or another mechanism.**
- **A callback's return value does not become the earlier asynchronous function call's result.**
- **Not every callback is asynchronous.** — `Array.map` 回调通常同步执行。

### Event Loop（事件循环）【p.9–22】

- **JavaScript callbacks on the same main thread do not execute simultaneously.**
- **The current synchronous job runs before queued callbacks can run.**
- **Long-running JavaScript blocks other work on that thread.** — 包括事件处理和通常的界面响应。
- **Host facilities can perform waiting and I/O outside the main JavaScript call stack.**
- **Asynchronous completion order is not guaranteed to match request initiation order.**

**【课件简化】** “周期性执行的一个队列”是教学图。实际环境有任务源、微任务检查点和渲染调度等机制，不应记成“固定间隔每次只轮询一个统一 FIFO”。

### Timers（计时器）【p.31–36】

- **setTimeout schedules a callback; it does not pause the current function.**
- **A zero delay does not mean immediate execution.**
- **The delay is not an exact execution-time guarantee.** — 当前线程忙时会更晚。
- **An IIFE executes immediately when the surrounding expression is evaluated.** — IIFE 本身不是异步机制。

### Error Handling（错误处理）【p.6–8、38】

- **A synchronous try/catch does not generally catch an error thrown in a later callback.**
- **Node-style callbacks commonly use error-first arguments.** — `(err, result)`。
- **Handle the error before using the result.**
- **Returning from an error branch avoids accidentally continuing success logic.**
- 在后续 async/await 模式中，可通过 await 配合 try/catch 处理 Promise rejection。

### Callback Hell & Coordination（嵌套与协调）【p.37–44】

- **Dependent asynchronous operations need explicit sequencing.**
- **Independent operations may be started concurrently.**
- **Nested callbacks can obscure control flow and error handling.**
- 常见题型：
  - 任一操作最先完成就采用结果。
  - 所有操作成功后继续。
  - 每个数组元素执行异步操作。
  - 按依赖顺序串行执行。
  - 忽略迟到结果或取消不再需要的请求。

**【课件代码修正】** p.38：

- `import("fs")` 返回 Promise，不能立即当 fs 对象用。
- `fs.open()` 的文件描述符从回调参数获得，不是异步调用的直接返回值。
- 每一步都应检查 err；不是层层嵌套就自动安全。

## 2. Comparisons & Distinctions（易混淆概念对比）

| 对比 | 前者 | 后者 |
|---|---|---|
| Synchronous / Asynchronous | 当前调用内完成 | 允许稍后完成 |
| Callback / Async callback | 函数参数角色 | 回调的一种执行时机 |
| Concurrent / Parallel | 多项工作生命周期重叠 | 真正同时执行 |
| Timer delay / Actual execution time | 调度延迟条件 | 还受线程占用等影响 |
| Ignore result / Cancel operation | 不采用返回值 | 尝试停止工作 |
| IIFE / setTimeout | 立即调用函数表达式 | 调度以后调用 |

## 3. APIs & Configurations（API 与配置速查）

- `fs.readFile(path, callback)` — Node 异步读文件；回调 `(err, data)`；没有编码时 data 通常为 Buffer。
- `fs.readFile(path, "utf8", callback)` — 异步读取为文本。
- `fs.readFileSync(path, "utf8")` — 同步读取并直接返回文本；失败同步抛错，会阻塞当前线程。
- `setTimeout(callback, delay)` — 调度一次，返回可用于取消的标识/句柄。
- `clearTimeout(timer)` — 【补充】取消尚未执行的定时器。
- `fs.mkdir(path, callback)` — 异步创建目录。
- `fs.open(path, "w", callback)` — 异步打开文件；成功回调获得文件描述符。
- `fs.close(fd, callback)` — 异步关闭文件描述符。
- `fs.unlink(path, callback)` — 异步删除文件。
- `fs.rmdir(path, callback)` — 删除目录的旧式相关用法；具体支持与替代接口依 Node 版本。

### 必会读输出：同步代码先执行【p.31–36】

```javascript
console.log("start");

setTimeout(() => {
  console.log("timer-100");
}, 100);

console.log("middle");

setTimeout(() => {
  console.log("timer-0");
}, 0);

console.log("end");
```

普通情况下输出：

```text
start
middle
end
timer-0
timer-100
```

关键不是“0ms 等于立即”，而是**当前同步代码先跑完，再处理可运行的回调**。

### 必会判断：异步结果不能这样返回

```javascript
function loadText() {
  let result;

  fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    result = data;
  });

  return result; // 通常先返回 undefined
}
```

改题思路：**结果使用逻辑放进 callback，或把接口改成返回 Promise，再 await**。

## 4. True / False Traps（判断题陷阱）

- **False** — `Every callback runs asynchronously.` — map 等回调通常同步。
- **False** — `setTimeout(fn, 0) calls fn immediately.` — 仍要等待调度。
- **False** — `Asynchronous operations always complete in the order they were started.` — 完成时间可不同。
- **False** — `A long synchronous loop cannot affect user interaction.` — 会占用主线程。
- **False** — `Single-threaded JavaScript means the browser has only one thread.` — 宿主可有多个线程。
- **False** — `Returning a value from a readFile callback returns it from the outer function.` — 两层返回不同。
- **False** — `An outer try/catch automatically catches any future callback exception.` — 调用栈已不同。
- **True** — `A synchronous file read can be handled using a surrounding try/catch.` — 同步抛错可捕获。
- **False** — `Ignoring a response cancels the corresponding request.` — 两回事。
- **False** — `An IIFE automatically runs in the background.` — 它通常立即同步运行。

## 5. Exam Quick Reference（考前速查）

- **同步先跑完，回调稍后运行**。
- **callback ≠ 一定 async**。
- **setTimeout 是调度，不是 sleep**。
- **异步返回值不能从 callback 穿越到外层 return**。
- **Node callback：err first**。
- **外层 try/catch 不兜未来回调；长循环阻塞主线程**。

# Lecture 10 — Async Control Flow（异步控制流）

> 来源：L10，4 页；L10b，15 页。L10 提出问题，L10b 给出 Async 库、Promise 与 async/await 方案。

## 1. Core Concepts（核心概念）

### Match the Pattern to the Requirement（根据题意选控制方式）【L10 p.3；L10b p.3–4、9–11】

| 题目要求 | 优先想到 |
|---|---|
| A 完成再开始 B，再开始 C | Promise chain / 顺序 await |
| A、B 都成功才执行 C | Promise.all |
| 任意一个成功即可 | Promise.any |
| 谁先完成就采用谁，包括失败 | Promise.race |
| 等全部完成，并保留成功和失败结果 | Promise.allSettled【补充】 |
| 数组每项执行异步任务并收集结果 | map → Promise.all |
| 限制并发数量 | Async 库 limit 系列等【补充】 |
| 结果过期后不再更新 UI | 请求序号/状态检查；或 AbortController |

### Async Library（第三方异步控制库）【L10b p.4–5】

- **The Async library provides callback-oriented control-flow utilities.**
- **parallel starts multiple tasks without waiting for each previous task to finish.**
- **series starts the next task after the previous one finishes.**
- **waterfall passes one task's result to the next task.**
- **map transforms each input using asynchronous work and collects results.**
- **filter keeps inputs whose asynchronous predicate passes.**
- **Language-level Promises reduce the need for some library patterns, but do not make every utility useless.**

### Promise States（Promise 状态）【L10b p.6–8】

- **pending → fulfilled or rejected**。
- **Settled means fulfilled or rejected.**
- **A Promise's final state cannot be changed after settlement.**
- **A Promise may remain pending forever.**

**【课件修正】** p.7 的 “Every Promise must either resolve or reject”是对正常完成路径的期待，不是运行时保证。忘记调用 resolve/reject 的 Promise 可以一直 pending。

- **The Promise executor runs synchronously.** — `new Promise(executor)` 会立即执行 executor。
- **then/catch handlers run asynchronously as microtasks.**
- **resolve may adopt another Promise's state.** — 调用 resolve 不总意味着立刻 fulfilled。
- **Creating a Promise does not move CPU-heavy work to another thread.**

### Chaining & Error Propagation（链式调用与错误传播）【L10b p.9】

- **then returns a new Promise.**
- **Returning a value fulfills the next Promise with that value.**
- **Returning a Promise makes the chain wait for its outcome.**
- **Throwing rejects the next Promise.**
- **Missing return can break sequencing.**
- **A catch that returns normally recovers the chain.** — 后续 then 可以继续执行。
- **A catch must throw or return a rejected Promise to preserve failure.**

```javascript
taskA()
  .then(resultA => {
    return taskB(resultA); // 返回它，后续才会等待 B
  })
  .then(resultB => {
    console.log(resultB);
  })
  .catch(error => {
    console.error(error);
  });
```

### Promise Combinators（组合方法）【L10b p.10】

| 方法 | 成功条件 | 失败条件 | 结果 |
|---|---|---|---|
| `Promise.all` | 全部 fulfilled | 任一个 rejected | 按输入顺序排列的值数组 |
| `Promise.any` | 任一个 fulfilled | 全部 rejected | 首个成功值；全失败为 AggregateError |
| `Promise.race` | 首个 settled 为 fulfilled | 首个 settled 为 rejected | 首个 settled 的结果 |
| `Promise.allSettled`【补充】 | 等所有输入 settled 后 fulfilled | 输入元素的 rejection 不让组合直接失败 | 按输入顺序排列的状态对象数组 |

**【课件修正】**

- p.10 把 **Promise.any** 写成“first failure 就 catch”是错误的：它会等待其他候选成功，只有全部失败才 reject。
- **Promise.race** 取首个 settled，不是专门等首个成功。
- 这些组合方法**不提供线程并行**；通常是传入的函数调用已经启动工作。
- all 失败、any 成功或 race 完成后，**其他操作不会自动取消**。

补充边界：

- `Promise.all([])`：fulfilled，值为 `[]`。
- `Promise.any([])`：rejected，AggregateError。
- `Promise.race([])`：一直 pending。
- `Promise.allSettled([])`：fulfilled，值为 `[]`。

参考：[MDN：Promise.any](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)、[Promise.race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)。

### async / await（异步函数）【L10b p.11–15】

- **An async function always returns a Promise.** — `return 3` 对调用者表现为兑现值 3 的 Promise。
- **await pauses the surrounding async function, not the whole JavaScript thread.**
- **await yields the fulfillment value or throws the rejection reason.**
- **Code before the first await runs synchronously during invocation.**
- **Sequential await can serialize otherwise independent operations.**
- **try/catch catches rejection from a Promise that is awaited inside the try.**

**【课件过时】** p.15 “await 只能写在 async 函数里”有现代例外：支持的 ES 模块可以使用 top-level await；普通非 async 函数中仍不能随便写 await。

**【课件代码修正】** p.7 Fetch 示例：

- Response 应检查 `status` 或 `ok`，不是 `statusCode`。
- 不必为了包装 fetch 再手写一个漏掉 rejection 转发的 Promise。
- 如果内层 fetch 失败而没有连接到外层 reject，外层 Promise 可能一直 pending。

## 2. Comparisons & Distinctions（易混淆概念对比）

| 对比 | 前者 | 后者 |
|---|---|---|
| all / any | 全部成功 | 至少一个成功 |
| any / race | 忽略候选失败，等首个成功 | 首个完成，成功失败都算 |
| series / waterfall | 依次执行 | 依次执行且传递前一步结果 |
| return Promise / 不 return | 链会等待 | 链可能提前继续 |
| await / Blocking sleep | 暂停当前 async 流程 | 阻塞执行线程 |
| catch 后正常返回 / 再 throw | 恢复成功链 | 继续传播失败 |

## 3. APIs & Configurations（API 与配置速查）

### Async Library【L10b p.4】

- `async.map(files, fs.stat, callback)` — 为每个文件异步取信息；最终回调得到结果数组，通常保持输入对应顺序。
- `async.filter(files, predicate, callback)` — predicate 以回调报告是否保留该项。
- `async.parallel([taskA, taskB], callback)` — 并发启动任务，最终汇总结果或错误。
- `async.series([taskA, taskB], callback)` — 按顺序执行。
- `async.waterfall([taskA, taskB], callback)` — 顺序执行并向后传结果；课件提到该模式。

### Promise

- `new Promise((resolve, reject) => { ... })` — executor 立即执行；最终结果经 resolve/reject 报告。
- `resolve(value)` — 解析 Promise；若 value 是 Promise/thenable，会采用其后续状态。
- `reject(error)` — 以该原因拒绝；习惯传 Error 对象。
- `promise.then(onFulfilled)` — 注册成功处理，返回新 Promise。
- `promise.catch(onRejected)` — 注册拒绝处理，返回新 Promise。
- `promise.finally(cleanup)` — 【补充】无论成功失败都执行清理；清理自身抛错可改变后续结果。
- `Promise.resolve(value)` — 获得按该值解析的 Promise；不是把任何 Promise 强行立即 fulfilled。
- `Promise.reject(error)` — 获得已 rejected 的 Promise。
- `Promise.all(promises)` — 全成功才成功；任一拒绝则组合拒绝；不自动取消其余任务。
- `Promise.any(promises)` — 首个成功；全拒绝才失败。
- `Promise.race(promises)` — 首个 settled 决定结果。
- `Promise.allSettled(promises)` — 【补充】等待全部结果，不因某个输入拒绝而直接失败。
- `await promise` — 在当前异步流程中取得值或抛出拒绝原因。

### 代码题 1：两个独立请求，全成功再处理

```javascript
async function loadDashboard() {
  // 先调用两个函数，让请求都启动。
  // 不要先 await 用户，再启动统计，否则变成串行。
  const [userResponse, statsResponse] = await Promise.all([
    fetch("/api/me"),
    fetch("/api/stats")
  ]);

  if (!userResponse.ok || !statsResponse.ok) {
    throw new Error("HTTP request failed");
  }

  const [user, stats] = await Promise.all([
    userResponse.json(),
    statsResponse.json()
  ]);

  return { user, stats };
}
```

### 代码题 2：有依赖，必须串行

```javascript
async function loadOrders() {
  const userResponse = await fetch("/api/me");
  if (!userResponse.ok) throw new Error("Cannot load user");

  const user = await userResponse.json();

  // 订单地址依赖 user.id，所以这里不能盲目并发。
  const ordersResponse = await fetch(`/api/users/${user.id}/orders`);
  if (!ordersResponse.ok) throw new Error("Cannot load orders");

  return ordersResponse.json();
}
```

### 代码题 3：数组异步映射

```javascript
async function loadUsers(ids) {
  return Promise.all(
    ids.map(async id => {
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) throw new Error(`Cannot load user ${id}`);

      return response.json();
    })
  );
}
```

- `map(async ...)` 返回 **Promise 数组**。
- `Promise.all(...)` 才把它们组合成结果数组。
- `await ids.map(...)` 只 await 一个普通数组，不会自动等待数组里的 Promise。
- `forEach(async ...)` 也不会让外层函数自动等待全部回调。

### 必会读输出：Promise 与 timer【补充】

```javascript
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");
```

普通浏览器脚本环境输出：

```text
A
D
C
B
```

记法：**当前同步代码 → 微任务 → 后续 timer task**。不要用这一个例子替代对 Node 所有队列和阶段的完整分析。

## 4. True / False Traps（判断题陷阱）

- **False** — `Promise.any rejects when the first input rejects.` — 必须全部候选拒绝。
- **False** — `Promise.race waits for the first successful result.` — 首个失败也能决定结果。
- **True** — `Promise.all returns values in input order rather than completion order.` — 顺序对应输入。
- **False** — `Promise.all automatically cancels remaining requests after rejection.` — 不自动取消。
- **False** — `Every Promise eventually settles.` — 可以永远 pending。
- **False** — `The executor passed to new Promise runs asynchronously.` — executor 同步。
- **True** — `then handlers execute asynchronously.` — 已兑现 Promise 的 then 也不会同步插队。
- **False** — `An async function can return a plain number directly to its caller without a Promise.` — 调用结果是 Promise。
- **False** — `await blocks the entire browser thread until the request completes.` — 暂停当前 async 函数。
- **False** — `await always improves concurrency.` — 连续 await 可能变串行。
- **False** — `catch always keeps the chain rejected.` — 正常返回可恢复。
- **False** — `await arrayOfPromises waits for every Promise in the array.` — 需 all 等组合方法。
- **False** — `forEach waits for async callbacks to finish.` — 不会。
- **False** — `await is permitted only inside async functions in all modern JavaScript contexts.` — ES 模块存在顶层 await。
- **False** — `Promise combinators automatically create background threads.` — 并不创建线程。

## 5. Exam Quick Reference（考前速查）

- **All = 全成功；Any = 首成功；Race = 首完成；AllSettled = 全收集**。
- **any 全失败 → AggregateError**。
- **组合完成 ≠ 其他任务取消**。
- **then 记得 return；catch 正常返回会恢复**。
- **async 永远 Promise；await 不阻塞整个线程**。
- **独立任务先启动再一起等；依赖任务顺序等**。
- **map(async) → Promise[] → Promise.all**。
- **同步 → microtask → timer（基础浏览器例子）**。

# Lecture 11A — Client-side Templates（客户端模板）

## 1. Core Concepts（核心概念）

### Why Templates?（模板的职责）【p.3–7】

- **Templates separate reusable structure from changing data.**
- **The same template can render multiple records or page regions.**
- **Client-side templates work with AJAX-fetched data.**
- **Generating HTML and inserting HTML are separate operations.**
- **A template engine does not automatically fetch data or update the DOM.**
- **Manual DOM mutation becomes difficult to maintain as structures grow.** — 模板减少重复拼接，但不会自动解决所有状态同步问题。

### Underscore Templates（Underscore 模板）【p.8–9】

- **_.template compiles template text into a rendering function.**
- **Calling the compiled function with data produces output text.**
- **jQuery can insert that output into the DOM.**
- 模板变量必须与传入数据结构一致；模板写 `foo.name`，不能只传 `{ name: "Luke" }`。
- 模板可以内联定义、放在非执行型 script 容器中，或通过 AJAX 加载。

| 语法 | 含义 | 安全含义 |
|---|---|---|
| `<% code %>` | 执行模板 JavaScript | 不自动输出表达式 |
| `<%= expression %>` | 插值输出 | 默认不进行 HTML escaping |
| `<%- expression %>` | HTML 转义后输出 | 显示不可信文本时通常更合适 |

**不要把 Underscore 和 EJS 的转义符号记反。** 它们外观相似，但默认规则不同。[Underscore：template](https://underscorejs.org/#template)

### Mustache（Mustache 模板）【p.10】

- **Mustache uses a template and a view object to produce text.**
- **Ordinary interpolation escapes HTML by default.**
- **Unescaped interpolation is available, but must be used deliberately.**
- **Logic-less does not mean the engine cannot iterate or resolve view values.** — 不主张在模板里写任意 JS 业务代码。
- 课件的 view 中 `calc` 是函数，渲染时可以获得相应计算结果；不等于模板文本支持任意 JS 表达式。

**VitePress 提醒：Mustache 的双花括号示例放在 fenced code block 中，避免被 Vue 当成页面插值。**

## 2. Comparisons & Distinctions（易混淆概念对比）

| 对比 | 前者 | 后者 |
|---|---|---|
| Template / Data | 稳定结构 | 每次变化的值 |
| Compile / Render | 模板文本生成函数 | 函数结合数据生成输出 |
| Render / Mount | 生成 HTML 字符串 | 插入 DOM |
| Underscore interpolate / escape | `<%=` 原样插值 | `<%-` HTML 转义 |
| Underscore / Mustache | 可以嵌入 JS 逻辑 | 更强调 logic-less 模板 |
| Client template / Server template | 浏览器生成输出 | 服务端生成输出 |

## 3. APIs & Configurations（API 与配置速查）

- `const render = _.template(templateText)` — 编译模板，返回函数；不自动渲染或挂载。
- `const html = render({ plans })` — 将数据传入，返回输出字符串。
- `_.each(plans, callback)` — 遍历条目；可在模板执行区域中调用。
- `$("#target").append(html)` — 追加内容，不清空原内容。
- `$("#target").html(html)` — 【补充】替换目标内部 HTML；输入必须考虑注入风险。
- `$("#template").html()` — 【补充】读取页面模板容器中的内容。
- `$.get("/tmpl/user", callback)` — 异步加载模板文本，拿到后再编译。
- `Mustache.render(templateText, view)` — 模板与 view 生成字符串，不自动挂载 DOM。

### 代码题：AJAX 数据 → 模板 → DOM【p.8–11；代码整理】

假设已加载 Underscore、jQuery，页面存在 `#target`。

```javascript
// 先编译一次，后面可反复传不同数据。
// 用 <%- ... %> 显示经过 HTML 转义的文本。
const renderUsers = _.template(`
  <ul>
    <% _.each(users, function (user) { %>
      <li><%- user.name %></li>
    <% }); %>
  </ul>
`);

async function loadUsers() {
  const response = await fetch("/api/users");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const users = await response.json();

  // render 只生成字符串。
  const html = renderUsers({ users });

  // 此处才更新现有 DOM，替换之前内容。
  $("#target").html(html);
}
```

记忆顺序：**拿模板 → compile → 拿数据 → render(data) → mount**。

### Mustache 示例【p.10】

```javascript
const view = {
  title: "Joe",
  calc() {
    return 2 + 4;
  }
};

const output = Mustache.render(
  "{{title}} spends {{calc}}",
  view
);

// "Joe spends 6"
```

## 4. True / False Traps（判断题陷阱）

- **False** — `Compiling a template automatically inserts it into the DOM.` — 编译、渲染、挂载分开。
- **True** — `One template can render multiple data objects.` — 结构复用。
- **False** — `Client-side templates require a full-page reload for each render.` — 可结合 AJAX 局部更新。
- **False** — `Underscore <%= ... %> always escapes HTML.` — 默认不转义；`<%-` 才转义。
- **False** — `A template can use foo.name when the provided view contains only a top-level name property.` — 数据层级不匹配。
- **False** — `append replaces the previous content.` — 它追加。
- **False** — `A template engine automatically protects every output context from injection.` — HTML 转义也不等于任意 URL、JS、CSS 上下文都安全。
- **False** — `Mustache templates evaluate arbitrary JavaScript expressions like ordinary JavaScript code.` — 不是这种执行模型。

## 5. Exam Quick Reference（考前速查）

- **Template + Data → HTML string → DOM insertion**。
- **Underscore**：`_.template(text)` → function → `render(data)`。
- **`<%` 执行；`<%=` 原样；`<%-` 转义**。
- **append 追加；html 替换**。
- **Mustache.render(template, view)**。
- **数据字段层级必须对齐；模板不自动 AJAX、不自动挂载**。

# Lecture 11B — Single Page Apps & Build Tools（SPA 与构建工具）

## 1. Core Concepts（核心概念）

### SPA Motivation（SPA 动机）【p.3–13】

- **Traditional page navigation often loads a new HTML document.**
- **A page may require additional requests for scripts, styles, images and data.**
- **An SPA can update views without a full-document navigation for each interaction.**
- **Data and additional code may still be fetched after initial load.**
- **SPA means a client-side application model, not exactly one network request.**

**【课件简化】**

- “每次翻页每个资源都重新请求”忽略了缓存等机制。
- “所有 JS 放一个文件、所有 CSS 放一个文件”是课件的构建目标示意，不是 SPA 定义。
- 现代 SPA 可以代码分割、懒加载、多 chunk，不要求一次下载全部内容。
- 使用模块本身，不会自动得到 SPA 路由和页面状态管理。

### Build Pipeline（构建流程）【p.14–20】

- **Source files and deployable assets may have different structures.**
- **A build process transforms source modules and resources into browser-consumable output.**
- **Bundling is not the same as compiling JavaScript into machine code.**
- **Task runners orchestrate work; bundlers organize dependencies and output.**
- **A dependency graph starts from configured entry points.**

| 工具职责 | 常见工作 |
|---|---|
| Task runner | watch、复制资源、启动 JS/CSS 处理、组织任务 |
| Bundler | 解析依赖、组合模块、生成 bundle/chunk |
| Loader / Transformer | 将某类输入转换为可处理的模块内容 |
| Plugin | 参与更广泛的构建阶段与产物处理 |

### Module Systems & Tools（模块系统与工具）【p.17–26】

- **Grunt and Gulp are task runners.**
- **RequireJS is associated with AMD.**
- **Browserify primarily bundles CommonJS modules for browsers.**
- **Webpack supports multiple module forms and resource processing through its ecosystem.**
- **Babel transforms JavaScript syntax; Webpack organizes and bundles dependencies.**
- **Webpack can integrate build tasks, but it does not automatically replace every tool in every workflow.**
- 课件把 AMD 称为 dead、CommonJS 称为 aging，属于生态评价；考试技术判断应记职责和语法，不把“没人用”“运行时已删除”当事实。

### Webpack Dependency Graph（Webpack 依赖图）【p.26–28】

- **Webpack starts at entry points and follows dependencies.**
- **Source files are not included merely because they exist in the source directory.**
- **Loaders transform matched resources.**
- **Plugins customize broader build behavior.**
- **Output can contain runtime code that loads and caches bundled modules.**
- **An application may produce multiple chunks and assets.**
- **Development mode does not imply production-style minification.**

### CSS Loader Order（CSS loader 顺序）【p.27】

- **Loaders in a normal use chain execute from right to left.**
- `["style-loader", "css-loader"]`：
  1. css-loader 先处理 CSS 依赖等，使其成为可交给后续链条处理的模块内容。
  2. style-loader 再把样式注入页面。
- **style-loader does not mean “extract CSS into a standalone file.”** — 提取文件需要相应工具或配置。

参考：[Webpack：Loaders](https://webpack.js.org/concepts/loaders/)

### ProvidePlugin（自动提供模块标识符）【p.27】

- **ProvidePlugin supplies configured modules when matching free identifiers are used.**
- 例如模块中使用 `$` 时，自动引入 jQuery 的相关引用。
- **It does not simply install a universal window.$ global for every script.**
- 不等于 npm install；依赖仍需可被解析。

参考：[Webpack：ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/)

## 2. Comparisons & Distinctions（易混淆概念对比）

| 对比 | 前者 | 后者 |
|---|---|---|
| MPA / SPA | 常通过新文档导航切换页面 | 常通过客户端更新视图 |
| Module system / Bundler | 定义导入导出与依赖形式 | 解析依赖并生成输出 |
| Task runner / Bundler | 调度任务 | 处理模块依赖图与产物 |
| Babel / Webpack | 语法转换 | 模块打包与构建整合 |
| Loader / Plugin | 转换匹配资源 | 参与更广泛构建流程 |
| css-loader / style-loader | 处理 CSS 模块依赖等 | 将样式注入页面 |
| Source / Public output | 开发源码 | 可部署、可访问产物 |
| ProvidePlugin / Global assignment | 按标识符自动提供模块引用 | 显式给全局对象设置属性 |

## 3. APIs & Configurations（API 与配置速查）

### AMD / RequireJS【p.23】

- `requirejs.config({ baseUrl: "lib" })` — 配置模块解析基础路径。
- `paths: { app: "../app" }` — 配置模块 ID 到路径的映射。
- `requirejs(["app/main"])` — 加载指定入口模块。
- `define(function () { return value; })` — 定义 AMD 模块并返回导出值。
- `define(function (require) { ... })` — AMD 简化包装形式；里面看似同步的 require 不等于 Node 原生 CommonJS 运行环境。

### CommonJS【p.24–25】

- `module.exports = { foo, bar: 7 }` — 导出对象。
- `const foo = require("./myModule").foo` — 加载模块并读取导出属性。
- 浏览器直接运行 CommonJS 代码通常需要 bundler 或兼容支持。

### Webpack Configuration【p.27】

- `context: path.join(__dirname, "src/client")` — 设置解析入口等配置时使用的基础目录，通常要求绝对路径。
- `entry: "./main.js"` — 指定依赖图起点；不是输出文件名。
- `mode: "development"` — 开发模式，使用相应默认优化与调试配置。
- `mode: "production"` — 【补充】生产模式采用相应优化默认值。
- `output.filename: "[name].js"` — `[name]` 按入口或 chunk 名替换。
- `output.path: path.resolve(__dirname, "public/js")` — 输出磁盘目录，要求绝对路径。
- `module.rules` — 按资源匹配条件配置转换规则。
- `test: /\.css$/` — 匹配 CSS 文件。
- `use: ["style-loader", "css-loader"]` — 常规转换阶段右到左执行。
- `test: /\.ejs$/` — 匹配 EJS 模板文件。
- `use: ["ejs-loader"]` — 通过相应 loader 处理模板，具体导出行为依版本和配置。
- `plugins: [new webpack.ProvidePlugin(...)]` — 注册插件实例。
- `new webpack.ProvidePlugin({ _: "underscore", $: "jquery", jQuery: "jquery" })` — 为匹配到的自由标识符自动提供相关模块引用。

### 配置读题模板【p.27；整理为 CommonJS 文件】

```javascript
// 文件名可用 webpack.config.cjs，明确采用 CommonJS。
const path = require("node:path");
const webpack = require("webpack");

module.exports = {
  // ./main.js 从这里开始解析。
  context: path.resolve(__dirname, "src/client"),

  // 从入口继续追踪 import / require 等依赖。
  entry: "./main.js",

  mode: "development",

  output: {
    // 单字符串入口默认通常名为 main，输出如 main.js。
    filename: "[name].js",

    // 磁盘路径，不是浏览器 URL。
    path: path.resolve(__dirname, "public/js")
  },

  module: {
    rules: [
      {
        test: /\.css$/,

        // 常规执行：css-loader → style-loader。
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.ejs$/,
        use: ["ejs-loader"]
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: "underscore",
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
```

做题顺序：**找到 entry → 跟依赖 → 看 test 匹配什么 → loader 顺序 → plugin 做什么 → output 到哪里**。

## 4. True / False Traps（判断题陷阱）

- **False** — `An SPA makes only one HTTP request during its entire lifetime.` — 会继续请求数据和资源。
- **False** — `An SPA must put all JavaScript in exactly one bundle.` — 可拆分 chunk。
- **False** — `Native import/export automatically implements client-side routing.` — 模块与路由不同。
- **False** — `Every file in src is automatically included in a Webpack bundle.` — 取决于依赖图和配置。
- **True** — `Webpack follows dependencies starting from configured entry points.` — 入口构建依赖图。
- **False** — `Babel and Webpack have the same primary responsibility.` — 转换与打包不同。
- **False** — `Gulp is primarily an HTTP server framework.` — 它是任务运行工具。
- **False** — `Loaders in a normal Webpack use array execute left to right.` — 常规转换右到左。
- **False** — `style-loader automatically extracts all CSS into a separate CSS file.` — 通常注入页面。
- **False** — `ProvidePlugin guarantees that window.$ exists for every script.` — 它主要提供模块中的标识符引用。
- **False** — `Webpack output is always minified and unreadable.` — 取决于 mode 和配置。
- **False** — `A bundler must translate JavaScript into machine code.` — 浏览器产物仍可为 JavaScript。
- **False** — `Using CommonJS means the code runs natively in every browser.` — 浏览器通常需要处理。

## 5. Exam Quick Reference（考前速查）

- **SPA**：减少完整文档切换；不是一个请求、一个文件。
- **Task runner**：组织任务；**Bundler**：依赖图与输出。
- **Grunt/Gulp → tasks；RequireJS → AMD；Browserify → CommonJS**。
- **Webpack → entry → dependencies → loaders/plugins → output**。
- **Babel 转语法；Webpack 打包**。
- **CSS 链右到左：css-loader → style-loader**。
- **ProvidePlugin 自动提供引用，不等于全局 window 属性**。
- **development 不保证压缩；output.path 是磁盘绝对路径**。