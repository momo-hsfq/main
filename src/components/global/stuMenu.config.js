module.exports = [{
  name: '课表查询',
  id: '1',
  sub: [{
    name: '学期课表',
    componentName: 'Stu1_1'
  }, {
    name: '教室课表',
    componentName: 'Stu1_2'
  }]
}, {
  name: '成绩查询',
  id: '2',
  sub: [{
    name: '学期成绩',
    componentName: 'Stu2'
  }]
}, {
  name: '网上选课',
  id: '3',
  sub: [{
    name: '网上选课',
    componentName: 'Stu3'
  }]
},{
  name: '个人信息',
  id: '4',
  sub: [{
    name: '个人信息',
    componentName: 'Stu4_1'
  }, {
    name: '社会实践',
    componentName: 'SocialPractice'
  }, {
    name: '课外活动',
    componentName: 'ExtracurricularActivities'
  }, {
    name: '成果奖励',
    componentName: 'AchievementAndAward'
  }, {
    name: '修改密码',
    componentName: 'Stu4_2'
  }, {
      name: '换绑手机号',
      componentName: 'Stu4_3'
    }, {
      name: '换绑邮箱',
      componentName:'Stu4_4'
    }]
},{
  name: '学生互评',
  id: '5',
  sub: [{
    name: '我评价的',
    componentName: 'PeerAssessment1'
  },{
      name: '评价我的',
      componentName: 'PeerAssessment2'
  }]
},{
    name:'学工管理',
    id: '6',
    sub: [{
        name:'学生互评',
        id:'6-1',
        sub_sub:[{
          name:'我评价的',
          componentName:'PeerAssessment1'
        },{
          name:'评价我的',
          componentName:'PeerAssessment2'
        }]
      },{
        name: '换绑手机号',
        id:'6-2',
        componentName: 'Stu4_3'
      },{
        name:'邮箱发送验证码',
        id:'6-3',
        componentName:'Stu4_5'
      }]
      
  }]