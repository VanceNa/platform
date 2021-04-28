export default {
  actions: {
    triggerPlayerInfoMaxCallback(context) {
      if (context.state.playerInfo.maxCallback) {
        context.state.playerInfo.maxCallback()
      }
    },
  },
  state: {
    token: null,
    count: 0,
    project: {
      // 质检任务
      projectId: '',
      projectType: '', // 即时任务或循环任务,
      taskId: '',
    },
    Strategy: {
      // 系统自动评分
      strategyId: '',
    },
    algorithmTreeId: {
      sortid: '',
    },
    StringData: {
      // 系统自动评分
      clusterRuleId: '',
      pageType: '',
      clusterRole: '',
    },
    StringRule: {
      // 聚类规则 执行结果
      clusterRuleId: '',
    },
    assigView: {
      configId: '',
    },
    assigViewOrder: {
      configId: '',
    },
    qaView: {
      playInfoVosList: [],
    },
    recordingPlayPage: {
      frompage: '',
      recordId: '',
      engineID: '',
      callNo: '', // 来电号码
      mblNo: '', // 来电号码
      from: '', // 记录播放器当前播放的内容是从哪个界面跳到录音播放页产生的
      fromPage: '', // 记录关闭或缩小播放器后，应该跳转到哪个页面
      callSTime: '', //录音时间
      callId: '', // 录音编号
      id: '', // 录音id
      fileUrl: '', // 录音地址
      playType: '', // 录音标签页id(暂时用不到)
      qaScoreType: '', // 初检还是复检
      reTaskId: '', // 复议任务id
      calibrateId: '', // 校准会任务id
      calibrateTaskId: '', // 校准会任务id
      searchModel: {}, // 质检校准会任务状态
      scoreResultRole: '', // 质检结果查看{坐席，组长，主管}角色存储
      resultScoreIndex: '', // 质检结果查看坐席 tab
      appealStatus: '', // 质检结果查看 成绩状态
      shensuTabIndex: '', // 申诉管理 未处理已处理tab
      isCreator: '', // 收否可以进行校准会标准评分
      calibrateTaskState: '',
      wfTaskId: '',
      wfTaskUserOpt: '',
      appealId: '',
      procTaskId: '',
      FuyiTask_EndTime: '',
      scoreId: '',
      wfTaskStatus: '',
      pageId: '',
      submiter: '',
      submiterName: '',
      orderNo: '',
      projectId: '',
      taskId: '',
      jsonParams: '',
      taskStatus: '',
      secAppFlag: '',
      isQaScore: false,
      seatNo: '',
      orderFlag: '', // 播放器用来区分订单和录音标记
      callFlag: false, // 初检提交人已打分标记
      isSampled: 0, // 录音池是否抽样
    },
    playerInfo: {
      page: '', // 播放器界面属于哪个界面
      isMaximization: true,
      voiceTotalTime: '',
      currentTime: '',
      timeSection: [],
      exist: false,
      extendClassName: '',
      maxCallback: null, // 播放器最大化回调事件
    },
    intellSampleView: {
      configId: '',
    },
    intellSampleViewOrder: {
      configId: '',
    },
    thenaticAnalysisId: {
      subjectId: '',
    },
    loginUserinfo: {
      accountId: '',
      companyId: '',
      realName: '',
      sexuality: '',
      account: '',
    },
    keywordsHigh: {
      keywords: '',
    },
    returnVisitData: {
      detailId: '',
      objectId: '',
    },
    mytaskHide: {
      hidden: '',
    },
    reviewTaskPagesize: {
      pagesize: 0,
    },
    notScoreList: {
      scoreList: [],
      formPosition: '',
    },
    returnVisitConfig: {
      taskId: '',
      projectId: '',
      showTaskResult: false,
      showDetailPage: false,
      matchRecordCount: 0,
      allRecordCount: 0,
      matchRatio: 0,
    },
    thematicClass: {
      thematicClassTree: [],
    },
    voiceDetal: [],
    pageInfo: {
      currentPage: 'homepage',
    },
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setProject(state, project) {
      if (project) {
        state.project.projectId = project.projectId
        state.project.projectType = project.projectType
        state.project.taskId = project.taskId
      }
    },
    setStrategy(state, Strategy) {
      if (Strategy) {
        state.Strategy.strategyId = Strategy.strategyId
      }
    },
    setStringData(state, StringData) {
      if (StringData) {
        state.StringData.clusterRuleId = StringData.clusterRuleId
        state.StringData.clusterRole = StringData.clusterRole
        state.StringData.pageType = StringData.pageType
      }
    },
    setStringRule(state, StringRule) {
      if (StringRule) {
        state.StringRule.clusterRuleId = StringRule.clusterRuleId
      }
    },
    setAssignView(state, obj) {
      state.assigView.configId = obj.configId
    },
    setAlgorithmTree(state, algorithmTreeId) {
      if (algorithmTreeId) {
        state.algorithmTreeId.sortid = algorithmTreeId.sortid
      }
    },
    setAssignVieworder(state, obj) {
      state.assigViewOrder.configId = obj.configId
    },
    setMytaskHide(state, obj) {
      state.mytaskHide.hidden = obj.hidden
    },
    setReviewTaskPagesize(state, obj) {
      state.reviewTaskPagesize.pagesize = obj.pagesize
    },
    setNotScoreList(state, obj) {
      if (obj.scoreList) {
        state.notScoreList.scoreList = obj.scoreList
      }
      if (obj.formPosition) {
        state.notScoreList.formPosition = obj.formPosition
      }
    },
    setRecordingPlayPage(state, obj) {
      if (obj) {
        if (typeof obj.from !== 'undefined') {
          state.recordingPlayPage.from = obj.from
        }

        if (obj.id) {
          state.recordingPlayPage.id = obj.id
        }
        if (obj.fromPage) {
          state.recordingPlayPage.fromPage = obj.fromPage
        }

        if (obj.callSTime) {
          state.recordingPlayPage.callSTime = obj.callSTime
        }
        if (obj.callNo) {
          state.recordingPlayPage.callNo = obj.callNo
        }
        if (obj.mblNo) {
          state.recordingPlayPage.mblNo = obj.mblNo
        }
        if (obj.assignType) {
          state.recordingPlayPage.assignType = obj.assignType
        }
        if (obj.recordingPlayTab) {
          state.recordingPlayPage.recordingPlayTab = obj.recordingPlayTab
        }
        if (obj.callId) {
          state.recordingPlayPage.callId = obj.callId
        }
        if (obj.id) {
          state.recordingPlayPage.id = obj.id
        }
        if (obj.fileUrl) {
          state.recordingPlayPage.fileUrl = obj.fileUrl
        } else if (obj.fileUrl === '' || obj.fileUrl === null) {
          state.recordingPlayPage.fileUrl = ''
        }
        if (obj.scoreResultRole) {
          state.recordingPlayPage.scoreResultRole = obj.scoreResultRole
        }
        if (obj.resultScoreIndex) {
          state.recordingPlayPage.resultScoreIndex = obj.resultScoreIndex
        }
        if (obj.appealStatus) {
          state.recordingPlayPage.appealStatus = obj.appealStatus
        }
        if (obj.shensuTabIndex) {
          state.recordingPlayPage.shensuTabIndex = obj.shensuTabIndex
        }
        if (obj.wfTaskId) {
          state.recordingPlayPage.wfTaskId = obj.wfTaskId
        }
        if (obj.wfTaskUserOpt) {
          state.recordingPlayPage.wfTaskUserOpt = obj.wfTaskUserOpt
        }
        if (obj.wfTaskStatus) {
          state.recordingPlayPage.wfTaskStatus = obj.wfTaskStatus
        }
        if (obj.appealId) {
          state.recordingPlayPage.appealId = obj.appealId
        } else {
          state.recordingPlayPage.appealId = ''
        }
        if (obj.FuyiTask_EndTime) {
          state.recordingPlayPage.FuyiTask_EndTime = obj.FuyiTask_EndTime
        }
        if (obj.procTaskId) {
          state.recordingPlayPage.procTaskId = obj.procTaskId
        }
        if (obj.scoreId) {
          state.recordingPlayPage.scoreId = obj.scoreId
        } else {
          state.recordingPlayPage.scoreId = ''
        }
        if (
          obj.isCreator == 0 ||
          obj.isCreator == 1 ||
          obj.isCreator == '0' ||
          obj.isCreator == '1'
        ) {
          state.recordingPlayPage.isCreator = obj.isCreator
        } else {
          state.recordingPlayPage.isCreator = ''
        }
        if (obj.playType) {
          state.recordingPlayPage.playType = obj.playType
        }
        if (typeof obj.qaScoreType === 'number') {
          state.recordingPlayPage.qaScoreType = obj.qaScoreType
        }
        if (obj.reTaskId) {
          state.recordingPlayPage.reTaskId = obj.reTaskId
        }
        if (obj.projectId) {
          state.recordingPlayPage.projectId = obj.projectId
        }
        if (obj.calibrateId) {
          state.recordingPlayPage.calibrateId = obj.calibrateId
        }
        if (obj.calibrateTaskId) {
          state.recordingPlayPage.calibrateTaskId = obj.calibrateTaskId
        }
        if (obj.searchModel) {
          state.recordingPlayPage.searchModel = obj.searchModel
        }
        if (obj.calibrateTaskState) {
          state.recordingPlayPage.calibrateTaskState = obj.calibrateTaskState
        }
        if (obj.isReturnVisit) {
          state.recordingPlayPage.returnVisitData = obj
          state.recordingPlayPage['from'] = 'returnVisitConfig'
          state.recordingPlayPage['fromPage'] = 'returnVisitConfig'
        }
        if (obj.pageId) {
          state.recordingPlayPage.pageId = obj.pageId
        }
        if (obj.orderNo) {
          state.recordingPlayPage.orderNo = obj.orderNo
        }
        if (obj.submiterName) {
          state.recordingPlayPage.submiterName = obj.submiterName
        }
        if (obj.submiter) {
          state.recordingPlayPage.submiter = obj.submiter
        }
        if (obj.projectId) {
          state.recordingPlayPage.projectId = obj.projectId
        }
        if (obj.taskId) {
          state.recordingPlayPage.taskId = obj.taskId
        } else {
          state.recordingPlayPage.taskId = ''
        }
        if (obj.taskStatus) {
          state.recordingPlayPage.taskStatus = obj.taskStatus
        }
        if (obj.secAppFlag == 0 || obj.secAppFlag == 1) {
          state.recordingPlayPage.secAppFlag = obj.secAppFlag
        } else {
          state.recordingPlayPage.secAppFlag = ''
        }
        if (obj.isSampled || obj.isSampled == 0) {
          state.recordingPlayPage.isSampled = obj.isSampled
        }
        if (obj.seatNo) {
          state.recordingPlayPage.seatNo = obj.seatNo
        }
        if (obj.orderFlag) {
          state.recordingPlayPage.orderFlag = obj.orderFlag
        }
        if (obj.isQaScore != undefined && obj.isQaScore != null) {
          state.recordingPlayPage.isQaScore = obj.isQaScore
        }
        if (obj.frompage != undefined && obj.frompage != null) {
          state.recordingPlayPage.frompage = obj.frompage
        }
        if (obj.recordId != undefined && obj.recordId != null) {
          state.recordingPlayPage.recordId = obj.recordId
        }
        if (obj.engineID != undefined && obj.engineID != null) {
          state.recordingPlayPage.engineID = obj.engineID
        }
      }
    },
    setOrderRecordingPlayPage(state, obj) {
      if (obj) {
        if (obj.callId) {
          state.recordingPlayPage.callId = obj.callId
        }
        if (obj.orderFlag) {
          state.recordingPlayPage.orderFlag = obj.orderFlag
        }
        if (obj.callFlag) {
          state.recordingPlayPage.callFlag = obj.callFlag
        }
      }
    },
    setPlayerInfo(state, obj) {
      if (obj == null) {
        state.playerInfo = {
          url: '', // 录音的url
          isMaximization: true,
          voiceTotalTime: '',
          currentTime: '',
          timeSection: [],
          exist: false,
          isclosedialog: true,
          extendClassName: '',
          maxCallback: null,
        }
      } else {
        if (obj.page) {
          state.playerInfo.page = obj.page
        }
        if (obj.isclosedialog) {
          state.playerInfo.isclosedialog = obj.isclosedialog
        }
        if (typeof obj.isMaximization === 'boolean') {
          state.playerInfo.isMaximization = obj.isMaximization
        }
        if (obj.voiceTotalTime) {
          state.playerInfo.voiceTotalTime = obj.voiceTotalTime
        }
        if (obj.currentTime) {
          state.playerInfo.currentTime = obj.currentTime
        }
        if (obj.timeSection) {
          state.playerInfo.timeSection = obj.timeSection
        }
        if (obj.extendClassName != undefined) {
          state.playerInfo.extendClassName = obj.extendClassName
        }
        if (obj.maxCallback != undefined) {
          state.playerInfo.maxCallback = obj.maxCallback
        }
        if (typeof obj.exist === 'boolean') {
          state.playerInfo.exist = obj.exist
          if (obj.exist === false) {
            state.playerInfo.isMaximization = true
            state.playerInfo.voiceTotalTime = ''
            state.playerInfo.currentTime = ''
            state.playerInfo.timeSection = []
          }
        }
      }
    },
    setLoginUserinfo(state, obj) {
      if (obj == null) {
        state.loginUserinfo = null
      } else {
        if (obj.accountId) {
          state.loginUserinfo.accountId = obj.accountId
        }
        if (obj.companyId) {
          state.loginUserinfo.companyId = obj.companyId
        }
        if (obj.realName) {
          state.loginUserinfo.realName = obj.realName
        }
        if (obj.sexuality) {
          state.loginUserinfo.sexuality = obj.sexuality
        }
        if (obj.account) {
          state.loginUserinfo.account = obj.account
        }
      }
    },
    setKeywordsHigh(state, obj) {
      if (obj == null) {
        state.keywordsHigh = null
      } else {
        state.keywordsHigh = {}
        state.keywordsHigh.keywords = obj.keywords
      }
    },
    setThematicAnalysisId(state, obj) {
      state.thenaticAnalysisId.subjectId = obj.subjectId
    },
    setTaskResult(state, obj) {
      if (obj == null) {
        state.returnVisitConfig = null
      } else {
        state.returnVisitConfig.taskId = obj.taskId
        state.returnVisitConfig.projectId = obj.projectId
        state.returnVisitConfig.showTaskResult = true
        state.returnVisitConfig.showDetailPage = true
        state.returnVisitConfig.allRecordCount = obj.allRecordCount
        state.returnVisitConfig.matchRecordCount = obj.matchRecordCount
        state.returnVisitConfig.matchRatio = obj.matchRatio
      }
    },
    setThematicClass(state, obj) {
      // 需判断是否已经有值
      if (obj == null) {
        state.thematicClass.thematicClassTree = []
      } else {
        state.thematicClass.thematicClassTree.push(obj.thematicClassTree)
      }
    },
    delThematicClass(state, classId) {
      if (classId) {
        let thematicClasss = state.thematicClass.thematicClassTree
        thematicClasss = thematicClasss.filter(function(item) {
          return item.subjectClassId !== classId
        })
        state.thematicClass.thematicClassTree = thematicClasss
      }
    },
    updateThematicClass(state, obj) {
      if (obj !== null && obj !== '') {
        state.thematicClass.thematicClassTree.forEach(function(item) {
          if (item.subjectClassId == obj.thematicClassTree.subjectClassId) {
            item.className = obj.thematicClassTree.className
            item.classRemark = obj.thematicClassTree.classRemark
            console.info('save labels')
            console.info(obj.thematicClassTree.labels)
            // console.info(obj.thematicClassTree.labelscontent)
            if (
              obj.thematicClassTree.labels != undefined &&
              obj.thematicClassTree.labels != ''
            ) {
              item.labels = obj.thematicClassTree.labels
              // item.labelscontent = obj.thematicClassTree.labelscontent
            }
          }
        })
      }
    },
    setVoiceDetal(state, obj) {
      if (obj == null) {
        state.voiceDetal = []
      } else {
        state.voiceDetal = obj
      }
    },
    setPageInfo(state, obj) {
      if (obj == null) {
        state.pageInfo.currentPage = 'homepage'
      } else if (obj.currentPage) {
        state.pageInfo.currentPage = obj.currentPage
      }
    },
    setMenuId(state, obj) {
      if (obj == '') {
        state.menuId = ''
      } else {
        state.menuId = obj
      }
    },
  },
}
