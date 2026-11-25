import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const home = {
  key: 'home',
  eyebrow: 'NAYA CORP · 企业数字化伙伴',
  headline: '让复杂业务，',
  highlightedHeadline: '进化得更简单。',
  subheadline:
    '我们将云原生、数据智能与可信 AI 融入业务现场，帮助成长型企业构建面向下一轮增长的数字竞争力。',
  primaryCtaLabel: '预约技术咨询',
  primaryCtaHref: '/contact',
  secondaryCtaLabel: '探索解决方案',
  secondaryCtaHref: '/services',
  introTitle: '以工程确定性，交付业务增长',
  introBody:
    'Naya Corp（诺瓦科技）是一家专注于企业级软件、云与人工智能的技术服务公司。我们相信，真正有效的数字化不是堆叠技术，而是让战略、产品、数据和组织形成同一条价值链。从业务诊断到平台落地，从首个试点到规模化运营，我们的跨职能团队始终与客户共同承担结果，用清晰的架构、可靠的交付和可持续的治理，让每一次技术投入都转化为可衡量的经营价值。',
  mission: '以领先而务实的技术能力，帮助企业把复杂问题转化为清晰、可执行、可持续的增长路径。',
  vision:
    '成为企业最值得信赖的长期数字化伙伴，让每一个组织都能借助云、数据与 AI，释放更大的商业潜能。',
  stats: [
    { label: '服务企业', value: '180+' },
    { label: '交付项目', value: '260+' },
    { label: '客户续约率', value: '96%' },
    { label: '核心系统可用性', value: '99.99%' },
  ],
  contactInfo: {
    address: '上海市浦东新区张江高科技园区科苑路 88 号 8 号楼 12 层',
    addressEn: '12F, Building 8, 88 Keyuan Road, Zhangjiang, Shanghai, China',
    phone: '400-860-2026',
    email: 'hello@nayacorp.cn',
    workingHours: '周一至周五 09:00–18:00（法定节假日除外）',
  },
  socialLinks: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/nova-corp', icon: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com/nova-corp', icon: 'github' },
    { label: '微信公众号', href: 'https://weixin.qq.com/', icon: 'wechat' },
  ],
  footerTagline: '技术驱动增长，合作成就长期价值。',
  published: true,
} satisfies Prisma.HomeContentUncheckedCreateInput;

const services = [
  {
    slug: 'cloud-native',
    title: '云原生架构升级',
    shortDescription: '构建弹性、可观测、可持续演进的企业技术底座。',
    description: ` 让基础设施成为业务加速器

云原生不是一次服务器迁移，而是研发效率、系统韧性与成本结构的系统性升级。我们从业务负载和现有资产出发，设计渐进式演进路线，避免为了技术而技术。

### 核心能力

- **容器与编排**：Kubernetes 平台、多环境交付与资源治理
- **应用现代化**：单体拆分、微服务边界设计与遗留系统改造
- **可观测性**：指标、日志、链路追踪与 SLO 驱动的运维体系
- **弹性与韧性**：自动扩缩容、容灾演练、发布回滚与成本优化

> 好的平台让开发团队专注于业务创新，而不是反复处理环境差异。

### 交付方式

我们通过架构评估、试点迁移和规模化推广三个阶段推进项目，并为客户团队提供可运行的工程模板、操作手册与能力转移。`,
    icon: 'cloud',
    coverImage: 'https://picsum.photos/seed/nova-service-cloud/1200/800',
    capabilities: [
      '云战略与架构设计',
      'Kubernetes 平台工程',
      '微服务现代化',
      'SRE 与可观测性',
      'FinOps 成本治理',
    ],
    deliverables: [
      '目标架构蓝图',
      '云原生交付流水线',
      '可观测性基座',
      '容灾与回滚预案',
      '平台运营手册',
    ],
    featured: true,
    order: 1,
    published: true,
  },
  {
    slug: 'data-intelligence',
    title: '数据智能与决策',
    shortDescription: '打通数据孤岛，让可信数据成为经营决策的共同语言。',
    description: ` 从数据资产到经营洞察

分散在业务系统、设备与协作工具中的数据，只有进入稳定的治理和交付体系，才能真正支持决策。我们帮助企业建立从采集、建模到分析和应用的端到端能力。

### 核心能力

- 企业数据架构与指标体系建设
- 实时数仓、湖仓一体与流批一体处理
- 数据质量、血缘、权限与全生命周期治理
- 管理驾驶舱、自助分析与智能预测

### 实施原则

1. 以高频经营场景定义数据产品，而非先建设大而全的平台。
2. 优先保障关键指标的口径一致与可追溯。
3. 通过数据契约连接业务团队，让消费反馈驱动持续优化。

| 层级 | 关键产出 | 业务价值 |
| --- | --- | --- |
| 数据底座 | 统一模型与质量规则 | 减少重复建设 |
| 指标体系 | 可信指标与血缘 | 对齐经营口径 |
| 分析应用 | 看板与预测模型 | 缩短决策周期 |`,
    icon: 'data',
    coverImage: 'https://picsum.photos/seed/nova-service-data/1200/800',
    capabilities: ['湖仓一体架构', '实时数据管道', '指标平台', '数据治理', '经营分析'],
    deliverables: ['数据战略地图', '统一数据模型', '指标体系', '治理看板', '经营分析驾驶舱'],
    featured: true,
    order: 2,
    published: true,
  },
  {
    slug: 'enterprise-ai',
    title: '企业级 AI 应用工程',
    shortDescription: '把大模型能力嵌入核心流程，构建可信、可控、可量产的 AI 产品。',
    description: ` 从模型能力到业务结果

我们关注的不只是模型效果，更是 AI 能否稳定融入真实工作流。NAYA Corp 将产品设计、模型工程、知识工程与安全治理整合为一套可落地的方法。

### 应用场景

- 企业知识助手与智能客服
- 文档理解、合同审阅与专业内容生成
- 销售洞察、需求预测与运营优化
- 面向开发与职能团队的智能工作台

### 工程体系

围绕检索增强生成、工具调用、智能体编排和效果评估，建立灰度发布、人工复核、数据反馈与成本监控机制。所有模型输入与输出均纳入权限、隐私和内容安全边界。

> AI 产品的护城河来自高质量业务上下文、稳定工作流和持续反馈，而不仅是模型本身。`,
    icon: 'code',
    coverImage: 'https://picsum.photos/seed/nova-service-ai/1200/800',
    capabilities: [
      'AI 场景诊断',
      'RAG 知识工程',
      '智能体工作流',
      '模型评估与可观测性',
      'AI 安全治理',
    ],
    deliverables: ['场景价值评估', 'AI 产品原型', '企业知识底座', '评估数据集', '生产运营看板'],
    featured: true,
    order: 3,
    published: true,
  },
  {
    slug: 'security-resilience',
    title: '安全合规与业务韧性',
    shortDescription: '将安全嵌入产品与交付过程，让风险可见、可控、可恢复。',
    description: ` 安全不是上线前的检查项

面对不断变化的威胁与合规要求，企业需要把安全能力融入架构、研发和运营的每一天。我们以风险和业务影响为起点，帮助客户建立主动防御体系。

### 服务范围

- 安全架构评审与威胁建模
- 身份权限、零信任与数据保护
- DevSecOps 与软件供应链安全
- 等级保护、数据合规与审计支持
- 业务连续性、灾难恢复与应急演练

我们提供可执行的整改路线图，并区分必须立即处理的关键风险与可以分阶段完善的长期能力，确保安全投入与业务优先级保持一致。`,
    icon: 'shield',
    coverImage: 'https://picsum.photos/seed/nova-service-security/1200/800',
    capabilities: ['零信任架构', '数据安全治理', 'DevSecOps', '合规评估', '灾难恢复'],
    deliverables: ['风险热力图', '威胁模型', '整改优先级', '安全基线', '应急演练报告'],
    featured: false,
    order: 4,
    published: true,
  },
  {
    slug: 'digital-products',
    title: '全渠道数字产品',
    shortDescription: '从用户洞察到体验交付，打造一致、易用、可持续迭代的产品。',
    description: ` 用产品思维连接品牌与客户

优秀的数字体验来自对用户任务的深刻理解。我们的产品团队将研究、体验设计、前后端工程和增长运营连接起来，帮助企业在多个触点提供一致价值。

### 工作方法

- 通过用户访谈和行为数据识别关键任务
- 建立设计系统与可复用组件规范
- 采用小步发布、实验指标和反馈闭环
- 覆盖 Web、移动端与业务中台

我们既能与客户现有团队协作，也能承担从产品定义到规模化运营的端到端交付，确保业务目标、用户体验和技术实现保持一致。`,
    icon: 'smartphone',
    coverImage: 'https://picsum.photos/seed/nova-service-product/1200/800',
    capabilities: ['用户研究', '体验设计', '全栈产品开发', '设计系统', '增长实验'],
    deliverables: ['用户旅程地图', '交互原型', '设计系统', '可上线产品', '增长实验方案'],
    featured: false,
    order: 5,
    published: true,
  },
  {
    slug: 'workflow-automation',
    title: '智能流程自动化',
    shortDescription: '连接系统与人，让跨部门协作更透明、更高效。',
    description: ` 消除流程中的等待与重复

当审批、数据同步和跨系统协作依赖人工搬运时，效率与准确性都会受到影响。我们从端到端流程视角出发，识别瓶颈并设计适度的自动化方案。

### 能力组合

- 业务流程梳理与价值流分析
- API 集成、事件驱动与系统连接
- 规则引擎、任务编排与智能文档处理
- 流程挖掘与持续优化

我们不过度追求全自动，而是在效率、风险和可解释性之间找到最佳平衡。关键节点保留人工审核，并通过流程指标持续验证收益。`,
    icon: 'workflow',
    coverImage: 'https://picsum.photos/seed/nova-service-workflow/1200/800',
    capabilities: ['流程诊断', 'API 与事件集成', '智能文档处理', '任务编排', '流程挖掘'],
    deliverables: ['流程地图', '自动化方案', '系统连接器', '异常处理机制', '效率收益报告'],
    featured: false,
    order: 6,
    published: true,
  },
] satisfies Prisma.ServiceUncheckedCreateInput[];

const cases = [
  {
    slug: 'smart-manufacturing-data-platform',
    title: '全球制造集团智能运营数据平台',
    client: '远航制造集团',
    industry: '智能制造',
    year: 2026,
    summary: '打通 12 个工厂的数据孤岛，建立实时运营与智能决策体系。',
    description: ` 挑战

远航制造集团的设备、订单与质量数据分散在不同工厂和系统中，管理层难以及时掌握跨区域经营状况，异常分析高度依赖资深工程师。

## 方案

Naya Corp 团队统一数据模型与关键指标，接入 MES、ERP 和物联网平台，建设实时湖仓一体底座，并为质量、生产和供应链团队提供差异化数据产品。

### 关键工作

- 梳理 300+ 指标并建立唯一业务口径
- 构建设备时序数据与生产事件流
- 通过质量知识图谱定位缺陷根因
- 建立面向工厂与管理层的双层运营看板

> 平台上线后，经营例会从核对数字转向讨论行动，数据真正成为共同语言。

## 成果

项目分三批完成推广，工厂侧使用率和数据可信度均达到预期，为后续预测性维护与智能排产奠定基础。`,
    coverImage: 'https://picsum.photos/seed/nova-case-manufacturing/1200/800',
    techStack: ['Kubernetes', 'Apache Flink', 'Trino', 'PostgreSQL', 'Power BI'],
    highlights: ['12 个工厂统一接入', '300+ 经营指标治理', '质量异常定位效率显著提升'],
    results: [
      { label: '经营数据链路', value: 'T+7 → T+1' },
      { label: '库存周转', value: '+28%' },
      { label: '报表制作工时', value: '-72%' },
    ],
    featured: true,
    order: 1,
    published: true,
  },
  {
    slug: 'retail-ai-service-copilot',
    title: '零售集团 AI 服务副驾',
    client: '星澜零售集团',
    industry: '零售与消费',
    year: 2026,
    summary: '让 2,000 余名一线服务人员即时获取商品、政策与客户上下文。',
    description: `## 挑战

商品规则频繁变化，历史知识散落在文档和群聊中，新员工培训周期长，客户问题经常需要跨部门确认。

## 方案

我们构建了面向门店与客服中心的 AI 服务副驾，将商品资料、会员政策、售后流程和订单系统整合到统一工作台，并为低置信度回答设置人工升级机制。

### 设计重点

- 基于权限控制客户与会员信息访问
- 通过引用溯源提升答案可信度
- 用真实服务会话持续构建评估集
- 将人工反馈纳入知识更新流程

## 成果

服务副驾先在两座城市的 80 家门店试点，验证效果后逐步推广，成为一线人员可信赖的工作伙伴。`,
    coverImage: 'https://picsum.photos/seed/nova-case-retail/1200/800',
    techStack: ['NestJS', 'React', 'PostgreSQL', 'Redis', 'RAG', 'LLM Gateway'],
    highlights: ['统一企业知识入口', '答案引用与人工接管', '覆盖 2,000+ 一线人员'],
    results: [
      { label: '自助解决率', value: '76%' },
      { label: '平均响应时长', value: '-64%' },
      { label: '新人培训周期', value: '-40%' },
    ],
    featured: true,
    order: 2,
    published: true,
  },
  {
    slug: 'fintech-cloud-core-modernization',
    title: '金融科技核心系统云原生改造',
    client: '澄明金融科技',
    industry: '金融科技',
    year: 2025,
    summary: '在不停机前提下完成核心交易系统现代化与发布体系升级。',
    description: `## 挑战

原有核心系统发布窗口长、扩容速度慢，营销活动期间容量规划压力突出，同时需要满足严格的审计与业务连续性要求。

## 方案

项目采用绞杀者模式逐步拆分核心模块，以双写与流量校验降低迁移风险，并建设统一的容器平台、灰度发布和全链路可观测体系。

| 阶段 | 范围 | 风险控制 |
| --- | --- | --- |
| 评估 | 依赖与性能基线 | 回滚演练 |
| 试点 | 非关键交易模块 | 影子流量 |
| 推广 | 核心服务分批迁移 | 灰度与自动熔断 |

## 成果

在完整年度审计周期内保持稳定运行，交付效率与资源利用率同步提升。`,
    coverImage: 'https://picsum.photos/seed/nova-case-fintech/1200/800',
    techStack: ['Java', 'Kubernetes', 'Kafka', 'OpenTelemetry', 'Vault'],
    highlights: ['核心服务零停机迁移', '发布频率提升 8 倍', '建立统一 SLO 体系'],
    results: [
      { label: '发布周期', value: '2 周 → 2 天' },
      { label: '资源利用率', value: '+35%' },
      { label: '系统可用性', value: '99.99%' },
    ],
    featured: true,
    order: 3,
    published: true,
  },
  {
    slug: 'logistics-route-optimization',
    title: '智慧物流调度与路径优化',
    client: '云帆供应链',
    industry: '物流供应链',
    year: 2025,
    summary: '融合订单、路网与车辆约束，构建可解释的日常调度决策系统。',
    description: `## 挑战

调度依赖个人经验，临时加单、车辆故障和交通变化导致计划频繁失效，人工沟通成本高。

## 方案

Naya Corp 与客户运营团队共同定义约束规则，建设订单预测、车辆匹配和路径优化服务，并为调度员提供原因解释与人工调整能力。

### 系统亮点

- 每 15 分钟滚动更新调度建议
- 支持时效、装载率和司机偏好多目标优化
- 异常事件自动触发重规划
- 通过仿真回放验证方案效果

## 成果

系统从区域干线试点扩展至全国网络，在提升装载效率的同时改善司机工作体验。`,
    coverImage: 'https://picsum.photos/seed/nova-case-logistics/1200/800',
    techStack: ['Python', 'OR-Tools', 'PostGIS', 'Kafka', 'React'],
    highlights: ['多约束实时优化', '调度建议可解释', '异常自动重规划'],
    results: [
      { label: '车辆装载率', value: '+19%' },
      { label: '单均运输成本', value: '-14%' },
      { label: '计划调整时间', value: '-58%' },
    ],
    featured: false,
    order: 4,
    published: true,
  },
  {
    slug: 'healthcare-data-governance',
    title: '医疗集团数据治理与科研平台',
    client: '清禾医疗集团',
    industry: '医疗健康',
    year: 2025,
    summary: '在严格隐私边界下，为临床科研提供可信、合规的数据服务。',
    description: `## 挑战

各医院数据标准不一，科研取数周期长，敏感数据使用难以审计，数据质量缺乏持续反馈。

## 方案

项目建立统一主数据、术语与质量规则，采用去标识化、分级授权和全链路审计机制，为科研人员提供自助式数据集申请与分析环境。

### 治理机制

1. 数据入湖前完成标准与质量校验
2. 按用途、范围和期限授予最小权限
3. 数据集版本与科研项目建立关联
4. 质量问题自动回流责任科室

## 成果

科研数据准备从数周缩短至数天，同时保持完整审计记录和可追溯的数据版本。`,
    coverImage: 'https://picsum.photos/seed/nova-case-healthcare/1200/800',
    techStack: ['FHIR', 'PostgreSQL', 'Airflow', 'Great Expectations', 'Keycloak'],
    highlights: ['跨院主数据统一', '敏感数据分级授权', '数据集全生命周期审计'],
    results: [
      { label: '数据准备周期', value: '-83%' },
      { label: '核心字段完整率', value: '99.2%' },
      { label: '审计追溯时间', value: '<5 分钟' },
    ],
    featured: false,
    order: 5,
    published: true,
  },
  {
    slug: 'energy-operations-digital-twin',
    title: '新能源场站运营数字孪生',
    client: '启元新能源',
    industry: '能源科技',
    year: 2024,
    summary: '连接场站设备与经营数据，实现设备健康与发电收益的协同分析。',
    description: `## 挑战

设备状态监测与经营分析彼此分离，运维人员难以及时识别影响发电量的潜在风险。

## 方案

我们建设场站级数据底座，将传感器、工单、气象和电价数据统一建模，通过设备健康评分与损失归因辅助运维决策。

### 应用价值

- 提前识别关键部件异常趋势
- 量化停机损失并优化检修窗口
- 结合功率预测安排运维资源
- 为资产组合投资提供历史表现分析

## 成果

试点场站验证后，平台已推广至多个区域运营中心，形成持续迭代的资产运营能力。`,
    coverImage: 'https://picsum.photos/seed/nova-case-energy/1200/800',
    techStack: ['TimescaleDB', 'Kafka', 'Grafana', 'Python', 'Azure Digital Twins'],
    highlights: ['设备健康实时评分', '发电损失智能归因', '多场站统一运营'],
    results: [
      { label: '非计划停机', value: '-31%' },
      { label: '故障预警提前量', value: '7 天' },
      { label: '运维工单闭环率', value: '98%' },
    ],
    featured: false,
    order: 6,
    published: true,
  },
] satisfies Prisma.CaseUncheckedCreateInput[];

const team = [
  {
    slug: 'lin-zhiyuan',
    name: '林知远',
    role: '创始人兼首席技术官',
    bio: '拥有 16 年企业架构与技术管理经验，长期服务制造、金融与零售行业，擅长将复杂业务目标转化为可演进的系统架构。',
    avatar: 'https://picsum.photos/seed/nova-team-lin/800/800',
    expertise: ['企业架构', '云原生', 'AI 工程', '技术战略'],
    socialLinks: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nova-lin', icon: 'linkedin' },
    ],
    featured: true,
    order: 1,
    published: true,
  },
  {
    slug: 'su-qinghe',
    name: '苏清禾',
    role: '联合创始人兼产品合伙人',
    bio: '专注企业数字产品与 AI 产品化 12 年，擅长从用户任务出发设计工作流，让先进技术以自然、可信的方式进入业务现场。',
    avatar: 'https://picsum.photos/seed/nova-team-su/800/800',
    expertise: ['产品战略', '体验设计', 'AI 产品', '创新工作坊'],
    socialLinks: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nova-su', icon: 'linkedin' },
    ],
    featured: true,
    order: 2,
    published: true,
  },
  {
    slug: 'zhou-yan',
    name: '周砚',
    role: '数据与 AI 负责人',
    bio: '曾负责大规模数据平台和机器学习系统建设，关注数据治理、模型评估与 AI 运营，让智能能力既有效也可控。',
    avatar: 'https://picsum.photos/seed/nova-team-zhou/800/800',
    expertise: ['数据架构', 'RAG', '机器学习', 'MLOps'],
    socialLinks: [{ label: 'GitHub', href: 'https://github.com/nova-zhou', icon: 'github' }],
    featured: true,
    order: 3,
    published: true,
  },
  {
    slug: 'chen-xun',
    name: '陈洵',
    role: '云平台与 SRE 负责人',
    bio: '拥有跨公有云与混合云平台的落地经验，擅长高可用架构、平台工程和成本治理，以可靠性工程支持业务快速迭代。',
    avatar: 'https://picsum.photos/seed/nova-team-chen/800/800',
    expertise: ['Kubernetes', 'SRE', '可观测性', 'FinOps'],
    socialLinks: [{ label: 'GitHub', href: 'https://github.com/nova-chen', icon: 'github' }],
    featured: true,
    order: 4,
    published: true,
  },
  {
    slug: 'xu-wanyin',
    name: '徐晚吟',
    role: '安全与合规负责人',
    bio: '深耕企业安全治理与隐私合规，致力于把安全要求转化为研发团队可执行、可验证的工程实践。',
    avatar: 'https://picsum.photos/seed/nova-team-xu/800/800',
    expertise: ['零信任', '数据安全', 'DevSecOps', '合规审计'],
    socialLinks: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nova-xu', icon: 'linkedin' },
    ],
    featured: false,
    order: 5,
    published: true,
  },
  {
    slug: 'gao-yuan',
    name: '高原',
    role: '客户成功与交付负责人',
    bio: '拥有十余年复杂项目交付经验，善于建立跨组织协作机制，以透明沟通、风险前置和价值复盘保障项目成功。',
    avatar: 'https://picsum.photos/seed/nova-team-gao/800/800',
    expertise: ['项目治理', '敏捷交付', '价值管理', '组织协作'],
    socialLinks: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nova-gao', icon: 'linkedin' },
    ],
    featured: false,
    order: 6,
    published: true,
  },
] satisfies Prisma.TeamMemberUncheckedCreateInput[];

const posts = [
  {
    slug: 'enterprise-ai-from-poc-to-production',
    title: '企业 AI 如何从概念验证走向规模化生产',
    excerpt: '以业务价值为起点，建立可评估、可治理、可持续的 AI 工程体系。',
    coverImage: 'https://picsum.photos/seed/nova-blog-ai-production/1200/675',
    author: '林知远',
    category: 'AI 实践',
    tags: ['生成式 AI', 'MLOps', '企业落地'],
    content: `## 热闹的 Demo 与真实的生产系统

一个大模型原型可以在几天内令人惊艳，但让它稳定服务真实业务，需要解决权限、数据质量、评估、成本和异常处理等系统性问题。企业 AI 项目的分水岭，不在模型演示，而在能否持续交付可衡量的业务价值。

### 第一步：选择窄而清晰的场景

优先选择高频、规则相对明确、结果容易验证的任务，例如内部知识检索、工单分类或文档摘要。用一张业务画布明确：

- 当前流程的耗时与错误成本
- 系统辅助的具体决策或动作
- 可接受的质量和人工复核边界
- 上线后由谁持续运营

> 不要问“大模型能做什么”，而要问“哪个业务环节最值得被重新设计”。

### 第二步：把评估变成日常工程

评估集应覆盖真实输入、边界案例和历史失败，而不是只保留成功示例。为每个场景定义任务级指标，再由业务专家进行抽样复核。

| 指标 | 关注问题 | 建议 |
| --- | --- | --- |
| 任务成功率 | 是否真正完成工作 | 按场景分别统计 |
| 事实一致性 | 回答是否有依据 | 保留引用与溯源 |
| 人工接管率 | 是否增加一线负担 | 设置自动升级阈值 |
| 单次任务成本 | 规模化是否经济 | 结合模型路由优化 |

### 第三步：为变化设计系统

模型、知识和业务规则都会变化。通过版本化提示词、数据集与工具接口，建立灰度发布和回滚机制；同时记录输入、输出、延迟和用户反馈，形成可分析的运营闭环。

生产化不是一次性里程碑，而是一种持续学习的能力。当业务、产品和工程团队共享同一套指标与反馈机制，AI 才会从实验项目变成可靠的生产力。`,
    readingMinutes: 8,
    publishedAt: new Date('2026-11-20T09:00:00.000Z'),
    featured: true,
    order: 1,
    published: true,
  },
  {
    slug: 'rag-knowledge-base-quality',
    title: 'RAG 知识库的关键，不只是向量检索',
    excerpt: '从文档处理、语义切分到权限与引用，系统提升企业知识助手的可信度。',
    coverImage: 'https://picsum.photos/seed/nova-blog-rag/1200/675',
    author: '周砚',
    category: 'AI 实践',
    tags: ['RAG', '知识工程', '搜索'],
    content: `## 检索质量是答案质量的上限

当知识助手答非所问时，问题往往不在生成模型，而在进入模型之前的文档处理、检索与上下文组织。一个看似简单的搜索框，背后是完整的信息工程。

### 文档进入系统之前

企业文档常常包含扫描件、复杂表格、旧版制度与重复附件。建议先建立文档可信度清单：

1. 确认来源与业务责任人
2. 识别版本、生效日期和适用范围
3. 提取标题层级、表格与脚注
4. 将重复、过期和冲突内容送入治理流程

### 切分要保留语义结构

机械地按固定字符数切分，可能把条件与结论分开。更合理的方式是优先沿章节、段落和列表边界切分，并保留标题路径作为元数据。

| 文档类型 | 推荐策略 | 必须保留的元数据 |
| --- | --- | --- |
| 制度规范 | 按条款切分 | 版本、生效日期 |
| 产品手册 | 按功能章节切分 | 产品型号、章节 |
| 工单记录 | 按会话轮次切分 | 时间、状态 |

### 权限必须进入检索层

不能先生成答案，再在界面上隐藏部分引用。权限过滤应在检索候选中完成，确保模型看不到用户无权访问的内容。

> 用户无法验证的答案，不应该被呈现为确定结论。

最后，为每个回答提供可点击引用，并允许用户一键反馈“找不到依据”。这些信号既是评估数据，也是知识治理的入口。`,
    readingMinutes: 7,
    publishedAt: new Date('2026-11-12T09:00:00.000Z'),
    featured: true,
    order: 2,
    published: true,
  },
  {
    slug: 'platform-engineering-developer-experience',
    title: '平台工程的下一步：以开发者体验衡量内部平台',
    excerpt: '把自助服务、可靠模板和反馈机制作为平台产品的核心能力。',
    coverImage: 'https://picsum.photos/seed/nova-blog-platform/1200/675',
    author: '陈洵',
    category: '云原生',
    tags: ['平台工程', 'Kubernetes', 'DevEx'],
    content: `## 内部平台也是产品

很多团队投入大量资源建设平台，却发现使用率不高。原因通常不是技术能力不足，而是平台没有解决开发者最频繁、最具体的问题。

### 从端到端任务开始

不要只统计集群数量，而要观察开发者从代码提交到稳定运行的完整路径：

- 创建服务需要填写多少信息
- 首次部署需要等待多久
- 出现故障时能否快速定位
- 回滚是否需要联系多个团队

### 提供有观点的黄金路径

平台应提供少量经过验证的服务模板，内置日志、指标、追踪、权限和发布策略。模板不是限制选择，而是降低常见决策的成本。

> 开发者不需要记住所有最佳实践，他们需要一条默认就正确的路。

### 建立体验指标

| 体验指标 | 含义 |
| --- | --- |
| 首次部署时间 | 新服务上手成本 |
| 变更前置时间 | 从提交到生产的效率 |
| 失败恢复时间 | 平台与工具的可诊断性 |
| 自助完成率 | 对人工支持的依赖程度 |

平台团队需要像产品团队一样访谈用户、分析使用数据并持续消除摩擦。自助服务不是最终目标，让业务团队安全、快速地交付价值才是。`,
    readingMinutes: 6,
    publishedAt: new Date('2026-11-05T09:00:00.000Z'),
    featured: true,
    order: 3,
    published: true,
  },
  {
    slug: 'data-metrics-governance',
    title: '指标治理：让经营数据从“看起来一致”到真正可信',
    excerpt: '通过指标语义层、责任机制和数据契约，减少口径争议与重复建设。',
    coverImage: 'https://picsum.photos/seed/nova-blog-metrics/1200/675',
    author: '周砚',
    category: '数据战略',
    tags: ['指标平台', '数据治理', '经营分析'],
    content: `## 同一个收入，为什么有三个数字

当销售、财务和管理层使用不同口径讨论收入时，问题往往不是某张报表算错了，而是指标缺少共同定义、责任人与适用范围。

### 指标不只是名称

一个可执行的指标定义应包含业务含义、计算公式、统计粒度、时间范围、数据来源与责任人。对于“活跃客户”这类指标，还必须明确活跃行为与去重规则。

### 建立分层语义

- **原始数据**：保留业务系统事实，避免过早聚合
- **基础模型**：统一实体、关系与标准字段
- **指标语义层**：集中管理计算逻辑与维度
- **消费应用**：看板、分析与运营系统复用同一指标

### 用数据契约连接生产与消费

上游字段变化前，应通过契约评估对下游的影响。契约可以包括 schema、更新频率、质量阈值和兼容性要求。

> 数据质量不是月末检查，而是数据进入每一次消费之前就应该满足的条件。

治理的起点不是建立更多委员会，而是选择影响经营决策的关键指标，先把它们的责任、口径和反馈机制运行起来。`,
    readingMinutes: 6,
    publishedAt: new Date('2026-10-28T09:00:00.000Z'),
    featured: false,
    order: 4,
    published: true,
  },
  {
    slug: 'zero-trust-practical-roadmap',
    title: '零信任落地路线：从身份与资产可见性开始',
    excerpt: '避免概念先行，以具体业务风险推动身份、设备与访问策略持续改进。',
    coverImage: 'https://picsum.photos/seed/nova-blog-zero-trust/1200/675',
    author: '徐晚吟',
    category: '安全合规',
    tags: ['零信任', '身份安全', '风险管理'],
    content: `## 零信任不是替换所有安全产品

零信任的核心是：不因请求来自内网就默认信任，而是基于身份、设备状态、资源敏感度与上下文持续评估访问风险。

### 从三个基础问题开始

1. **谁在访问？** 统一人员、服务与机器身份，减少共享账号。
2. **访问什么？** 建立关键资产、数据流与暴露面清单。
3. **风险是否可接受？** 为不同场景定义认证强度和审批机制。

### 分阶段推进

| 阶段 | 重点 | 可验证成果 |
| --- | --- | --- |
| 可见 | 身份与资产盘点 | 关键系统覆盖清单 |
| 收敛 | 强认证与最小权限 | 高风险账号减少 |
| 自适应 | 风险信号与策略联动 | 异常访问自动阻断 |
| 持续 | 演练与度量 | 恢复与处置时间下降 |

### 兼顾安全与体验

每次验证都增加摩擦，因此策略应基于风险分级。普通内部工具可以低摩擦访问，敏感数据导出和管理操作则需要更强认证与完整审计。

> 安全建设的成功标准，是风险下降且业务仍然顺畅，而不是拦截越来越多的请求。`,
    readingMinutes: 7,
    publishedAt: new Date('2026-10-20T09:00:00.000Z'),
    featured: false,
    order: 5,
    published: true,
  },
  {
    slug: 'manufacturing-ai-quality-inspection',
    title: '制造业 AI 质检：从准确率走向可运营的质量闭环',
    excerpt: '将视觉模型、工艺知识与人员反馈连接起来，持续降低漏检和误报。',
    coverImage: 'https://picsum.photos/seed/nova-blog-quality/1200/675',
    author: '高原',
    category: '客户故事',
    tags: ['智能制造', '计算机视觉', '质量闭环'],
    content: `## 模型准确率不是唯一目标

在真实产线上，单一缺陷类别的准确率很难代表整体效果。光照变化、来料差异和设备抖动都会影响结果，误报过多还会让一线人员逐渐忽略系统提示。

### 先定义质量成本

项目启动时，我们与客户共同定义漏检、误报、复检工时和停线损失，形成可比较的基线。这让团队能够判断模型优化是否真正创造价值。

### 建立人机协同流程

- 高置信度结果自动进入后续流程
- 边界样本交由质检人员复核
- 复核结果作为模型与规则优化输入
- 缺陷样本自动关联批次、工艺参数与设备状态

### 持续运营比首次上线更重要

| 机制 | 解决的问题 |
| --- | --- |
| 样本回流 | 新型缺陷与工况变化 |
| 漂移监控 | 来料和设备状态变化 |
| 版本回滚 | 新模型效果不稳定 |
| 批次追溯 | 质量问题的根因定位 |

> 好的 AI 质检系统不是替代质检员，而是让他们的经验更快沉淀为组织能力。

通过把模型、工艺知识和现场反馈连接成闭环，质量优化才能从一次性项目变成持续改进的日常运营。`,
    readingMinutes: 7,
    publishedAt: new Date('2026-10-12T09:00:00.000Z'),
    featured: false,
    order: 6,
    published: true,
  },
  {
    slug: 'cloud-cost-optimization-without-stopping-growth',
    title: '云成本优化，不以牺牲业务增长为代价',
    excerpt: '用单位经济性、资源标签和容量治理找到真正值得优化的成本。',
    coverImage: 'https://picsum.photos/seed/nova-blog-cloud-cost/1200/675',
    author: '陈洵',
    category: '云原生',
    tags: ['FinOps', '成本治理', 'Kubernetes'],
    content: `## 从账单数字走向单位经济性

云成本上升并不一定意味着浪费，它也可能代表业务增长。更有价值的问题不是“怎样把账单降下来”，而是“每一笔基础设施投入带来了多少业务产出”。

### 建立成本分配机制

通过组织、产品、环境与负责人标签，把共享平台成本以清晰规则分配下去。标签之外，还应记录成本归属和回收周期。

### 优先处理高价值问题

1. 识别长期闲置和无owner资源
2. 为开发测试环境设置自动回收策略
3. 根据真实负载设置资源请求与弹性边界
4. 评估存储分层、网络路径和商业定价
5. 建立容量预算与异常增长告警

| 优化动作 | 风险 | 建议 |
| --- | --- | --- |
| 缩容闲置资源 | 误伤临时任务 | 先观察完整业务周期 |
| 自动停机 | 影响协作环境 | 支持延期与白名单 |
| 购买承诺 | 需求变化 | 分阶段承诺并定期复核 |

> 最有效的成本优化，通常来自架构与产品决策，而不是反复调整账单。

把成本可见性交还给团队，并让业务负责人参与容量决策，FinOps 才能从财务控制变成增长能力。`,
    readingMinutes: 6,
    publishedAt: new Date('2026-10-06T09:00:00.000Z'),
    featured: false,
    order: 7,
    published: true,
  },
  {
    slug: 'digital-transformation-team-operating-model',
    title: '数字化转型下半场：技术之外的团队协作设计',
    excerpt: '以产品团队、业务负责人和共享能力中心重构组织协作方式。',
    coverImage: 'https://picsum.photos/seed/nova-blog-team-model/1200/675',
    author: '苏清禾',
    category: '组织与创新',
    tags: ['数字化转型', '组织协作', '产品运营'],
    content: `## 系统上线不等于转型完成

当技术平台已经可用，企业面对的挑战往往转向决策速度、跨部门协作和责任边界。没有与之匹配的运营机制，再先进的系统也可能只是旧流程的数字化副本。

### 围绕价值流组建团队

产品团队应包含业务、产品、设计、工程与数据能力，并对一个完整的业务结果负责。共享能力中心则提供平台、安全、数据标准与专业支持。

### 明确三类责任

- **业务负责人**：定义价值、优先级与验收标准
- **产品团队**：持续发现问题并交付可运营方案
- **共享能力中心**：建设可复用能力，避免局部重复投资

### 建立稳定的协作节奏

| 机制 | 频率 | 目的 |
| --- | --- | --- |
| 价值评审 | 每月 | 校准业务结果 |
| 产品复盘 | 每两周 | 调整方向与风险 |
| 架构评审 | 按需 | 控制长期技术债 |
| 运营回顾 | 每季度 | 沉淀流程与能力 |

> 组织转型不是一次重组，而是在一次次真实决策中形成新的协作习惯。

从清晰责任、透明指标和小范围试点开始，让团队在交付价值的过程中逐步建立信任，比一次性绘制宏大的组织蓝图更有效。`,
    readingMinutes: 6,
    publishedAt: new Date('2026-09-28T09:00:00.000Z'),
    featured: false,
    order: 8,
    published: true,
  },
] satisfies Prisma.BlogPostUncheckedCreateInput[];

const main = async (): Promise<void> => {
  await prisma.$transaction(async (tx) => {
    await tx.homeContent.upsert({
      where: { key: home.key },
      update: { ...home, deletedAt: null },
      create: home,
    });

    for (const service of services) {
      await tx.service.upsert({
        where: { slug: service.slug },
        update: { ...service, deletedAt: null },
        create: service,
      });
    }

    for (const record of cases) {
      await tx.case.upsert({
        where: { slug: record.slug },
        update: { ...record, deletedAt: null },
        create: record,
      });
    }

    for (const member of team) {
      await tx.teamMember.upsert({
        where: { slug: member.slug },
        update: { ...member, deletedAt: null },
        create: member,
      });
    }

    for (const post of posts) {
      await tx.blogPost.upsert({
        where: { slug: post.slug },
        update: { ...post, deletedAt: null },
        create: post,
      });
    }
  });

  process.stdout.write(
    `Seed complete: 1 home, ${services.length} services, ${cases.length} cases, ${team.length} team members, ${posts.length} posts.\n`,
  );
};

main()
  .catch((error: unknown) => {
    process.stderr.write(`Seed failed: ${error instanceof Error ? error.name : 'UnknownError'}\n`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
