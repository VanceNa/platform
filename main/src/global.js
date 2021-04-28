const g = window.g
let baseUrl = 'http://10.0.2.197:8878'
let hrBaseUrl = '' // 人机融合地址
let hrWsUrl = '' // 人机融合WebSocket地址
let uicsrUrl = '' // 机器人迁移至中台各功能模块地址
let webrtcUrl = '' // webrtc注册账号获取及释放地址
let kgUrl = '' //知识图谱
let mspUrl = '' //msp地址
let questionUrl = '' // 问答接口剥离
let rcmsUrl = '' //rcms 地址
let accessKey =''  // 授权码
// 兼容之前版本的定义形式
if (g && typeof g === 'object') {
    if (typeof g.url === 'string') {
        baseUrl = g.url
    }
    if (typeof g.hrWsUrl === 'string') {
        hrWsUrl = g.hrWsUrl
    }
    if (typeof g.hrBaseUrl === 'string') {
        hrBaseUrl = g.hrBaseUrl
    }
    if (typeof g.uicsrUrl === 'string') {
        uicsrUrl = g.uicsrUrl
    }
    if (typeof g.webrtcUrl === 'string') {
        webrtcUrl = g.webrtcUrl
    }
    if (typeof g.webrtcUrl === 'string') {
        webrtcUrl = g.webrtcUrl
    }
    if (typeof g.kgUrl === 'string') {
        kgUrl = g.kgUrl
    }
    if (typeof g.mspUrl === 'string') {
        mspUrl = g.mspUrl
    }
    if (typeof g.questionUrl === 'string') {
        questionUrl = g.questionUrl
    }
    if (typeof g.rcmsUrl === 'string') {
        rcmsUrl = g.rcmsUrl
    }
    if (typeof g.accessKey === 'string') {
        accessKey = g.accessKey
    }

}

global.accessKey = accessKey
// 使用环境变量文件注入应用数据
global.baseUrl = baseUrl || process.env.app_base_url
global.currentBaseUrl = global.baseUrl + '/analyticSystem'
global.sysApi = global.baseUrl + '/sys'
global.hrmApi = global.baseUrl + '/hrm'
global.xformApi = global.baseUrl + '/xform'
global.fileApi = global.baseUrl + '/fileManager'
global.qualityUrl = global.baseUrl + '/qualityInspectionSystem'
global.taskApi = global.baseUrl + '/task'
global.uicsrUrl = uicsrUrl || `${global.baseUrl}/uicsr/`
global.questionUrl = questionUrl || `${global.baseUrl}/uicsrqa/`
global.assistantUrl = global.baseUrl + '/assistant'
global.kgUrl = kgUrl || global.baseUrl + '/knowledgeGraph/'
global.transformUrl = global.baseUrl + '/data-transform'  //数据入库子站

global.videoStreamUrl = process.env.app_video_stream_url

global.mspUrl = mspUrl

global.rcmsUrl = global.baseUrl+'/rcms'
// 人机融合系统地址，迁移页面使用
// websocket url
global.hrWsUrl = hrWsUrl || process.env.app_hris_ws_url
// base url
global.hrBaseUrl = global.baseUrl + '/hris'

global.roleCode = [
    // 'admin', // 系统管理员或者超级管理员
    'seatman', // 坐席人员
    'headman', // 组长
    'qa', // 质检员
    'qa_suvs', // 质检主管
]

// ivs页面路径地址
global.ivsUrl = global.baseUrl + '/ivs'
// 流程管理
global.flowApi = global.baseUrl + '/process'

// 智慧中台地址
global.aiUrl = global.baseUrl + '/ai'

// 数据管理平台 (客户画像)
global.dmpUrl = global.baseUrl + '/dmp'
// 表单引擎地址
global.formEngineUrl = global.baseUrl + '/formEngine/formCreater'

// 质检
global.qualityUrl = global.baseUrl + '/qualityInspectionSystem'
global.formHeader = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        // 'prefer-service-zone': 'lsk',
    },
}

global.jsonHeader = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        // 'prefer-service-zone': 'lsk',
    },
}

// FAQ配置
global.faqUrl = global.baseUrl + '/faq/'
// global.callUrl = 'http://10.0.33.90:7090/#/'
global.websocketUrl = global.baseUrl + '/faq/'
global.staticConfig = {
    answerType: [{
        value: '0',
        label: '咨询类',
    },
    // {
    //   value: '1',
    //   label: '办理类',
    // },
    // {
    //   value: '2',
    //   label: '指令类',
    // },
    // {
    //   value: '3',
    //   label: '闲聊类',
    // },
    {
        value: '4',
        label: '流程类',
    },
    {
        value: '5',
        label: '转人工',
    },
    ],
    messageType: [{
        value: '',
        label: '全部',
    },
    {
        value: '1',
        label: '模型管理',
    },
    {
        value: '2',
        label: '机器测试',
    },
    {
        value: '3',
        label: '其他',
    },
    ],
}

// 迁移质检打分需要
global.roleOptions = ['全部角色', '坐席', '客户']
global.positionOptions = ['前', '后']
global.positionOptionsText = ['全文', '开头', '结束']
// 1 关键词 2 上下文 3 频次 4 静默5 主观项 6 语速 7 抢话
global.ruleTypes = [
    { id: '1', label: '关键词' },
    { id: '2', label: '上下文' },
    { id: '3', label: '频次' },
    { id: '4', label: '静默' },
    { id: '5', label: '主观项' },
    { id: '6', label: '语速' },
    { id: '7', label: '抢话' },
]
//角色集合
global.roles = [
    { id: '0', label: '全部' },
    { id: '1', label: '坐席' },
    { id: '2', label: '客户' },
]
//出现/不出现
global.appearStatus = [
    { id: '1', label: ' 出现' },
    { id: '0', label: '不出现' },
]
//关键词检测范围
global.examRanges = [
    { id: '0', label: '全文' },
    { id: '1', label: '开头' },
    { id: '2', label: '结束' },
]
//检测内容检测范围
global.testContentExamRanges = [
    { id: '0', label: '全文' },
    { id: '3', label: '后' },
    { id: '4', label: '前' },
    { id: '5', label: '附近' },
]
//应用渠道
global.applicationChannels = [
    { id: '1', label: '通用' },
    { id: '2', label: '语音' },
    // { id: '3', label: '文本' },
]
//静默类型
global.silenceTypes = [
    { id: '1', label: '时长' },
    { id: '2', label: '次数' },
    { id: '3', label: '占比' },
    { id: '4', label: '单次最大静默时长' },
    { id: '5', label: '首次静默时长' },
    { id: '6', label: '平均静默时长' },
]
//语速类型
global.wordSpeedTypes = [
    { id: '1', label: '平均语速' },
    { id: '2', label: '最大语速' },
]
//上下文条件
global.conditions = [
    { id: '1', label: '关键词' },
    { id: '2', label: '响应时间' },
    // { id: 3, label: '语义' },//后期需要加上此项
]
//检测内容条件
global.testContents = [
    { id: '1', label: '关键词' },
    { id: '3', label: '挂机/会话关闭' },
]
//规则内容类型
global.ruleContentTypes = [
    { id: '1', label: '关键词' },
    { id: '2', label: '语义' },
]

// webrtc码号注册及释放使用
global.webrtcUrl = webrtcUrl || process.env.app_webrtc_url


export default global
