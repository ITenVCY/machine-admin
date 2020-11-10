var questions=[
    {
        "msgDesc":"查询成功",
        "msgCode":0,
        "data":{
            "secondDepartment":"",
            "expert":"no",
            "compid":3,
            "primaryDepartment":"",
            "ID":7
        }
    }
];

var errorParamQuestion=[
    {
        "msgDesc":"查询失败,请检查参数是否正常",
        "msgCode":-1,
    }
];


var errorQuestion=[
    {
        "msgDesc":"查询失败",
        "msgCode":-1,
    }
];

var redisErrorQuestion=[
    {
        "msgDesc":"查询失败",
        "msgCode":-1,
    }
];

var startQuestion=[
    {
        "msgDesc":"启动成功",
        "msgCode":0,
    }
];

var sucQuestion=[
    {
        "msgDesc":"成功",
        "msgCode":0,
    }
];

var endQuestion=[
    {
        "msgDesc":"暂停成功",
        "msgCode":0,
    }
];

var dayQuestion=[
    {
        "msgDesc":"查询成功",
        "msgCode":0,
        "data":{
            "dayActualStartTime":"8:00",
            "dayAlarmTime":1234,
            "dayRunTime":1245,
            "dayStrandTime":54654,
            "dayOffLineTime":123,
            "runGCodeName":"/prog/O123",
            "dayQP":7,
            "dayAlarmPercent":"0.25",
            "dayRunPercent":"0.25",
            "dayStrandPercent":"0.25",
            "dayOffLinePercent":"0.25",
        }
    }
];

//0未开始， 1正在进行中， 2已结束
var classQuestion=[
{
    "msgDesc":"查询成功",
    "msgCode":0,
    "data":{
        "class1":{
            "state": 2,
            "startTime":"8:00",
            "strandTime":54654,
            "runTime":1245,
            "alarmPercent":"0.25",
            "runPercent":"0.25",
            "strandPercent":"0.25",
            "offLinePercent":"0.25",
        },
        "class2":{
            "state": 1,
            "startTime":"14:00",
            "strandTime":1234,
            "runTime":456,
            "alarmPercent":"0.25",
            "runPercent":"0.25",
            "strandPercent":"0.25",
            "offLinePercent":"0.25",
        },
        "class3":{
            "state": 0,
            "startTime":"17:00",
            "strandTime":0,
            "runTime":0,
            "alarmPercent":"0",
            "runPercent":"0",
            "strandPercent":"0",
            "offLinePercent":"0",
        },
    }
}
];


var classDemo={
    "state": 0,
    "sec":0,
    "classQP": 0,
    "trueTime": "0:0",
    "strandTime": 0,
    "runTime": 0,
    "offLineTime": 0,
    "alarmTime": 0,
    "strandPercent": 0,
    "rundPercent": 0,
    "alarmPercent": 0,
    "offLinePercent": 0
};

var dayDemoData={
    "dayActualStartTime":"0",//当天实际启动时间
    "dayAlarmTime":0,//当天报警事件
    "dayRunTime":0,//运行
    "dayStrandTime":0,//待机
    "dayOffLineTime":0,//离线
    "runGCodeName":"",//G名称
    "dayQP":0,//加工总件数
    "dayAlarmPercent":0,//
    "dayRunPercent":0,//
    "dayStrandPercent":0,//
    "dayOffLinePercent":0,//
}

module.exports = {
    errorParamQuestion,
    errorQuestion,
    dayQuestion,
    classQuestion,
    startQuestion,
    endQuestion,
    classDemo,
    dayDemoData,
    sucQuestion,
}