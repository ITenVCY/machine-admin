var express=require('express');
var app =express();
var bodyParser = require('body-parser'); 
var dayApi = require('./api');
var cmd=require('node-cmd');
const exec = require('child_process').execFile;
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });

//////////////////////////////////////
//APP启动
app.get('/startApp',async function(req,res){//某个班次结束
    //判断当前属于那一天
    let date = new Date();
    //let time = await 
    //若已经到了第二天就将时间改变
    //开始刷新数据
    //return res.json(ret);
});
//////////////////////////////////////


//////////////////////////////////////
//生产统计
//////////////////////////////////////
//1. 当日产报
app.get('/getDayProductionData',async function(req,res){//获取当天所有数据
    
});

app.get('/getClassProductionDate',async function(req,res){//获取当前所有班次的加工信息
    
});

app.get('/setStartClass',async function(req,res){//某个班次结束
    let classId = 0;
    if(req.query.hasOwnProperty("classId"))
    {
        classId = req.query["classId"] <= 0 ? classId : req.query["classId"];
    }

    let ret = await dayApi.setStartClassStates(req.query["classId"]);
    console.log("api", ret);
    return res.json(ret);
});

app.get('/setEndClass',async function(req,res){//某个班次结束
    let classId = 0;
    if(req.query.hasOwnProperty("classId"))
    {
        classId = req.query["classId"] <= 0 ? classId : req.query["classId"];
    }

    let ret = await dayApi.setEndClassStates(classId);
    console.log("api", ret);
    return res.json(ret);
});
//////////////////////////////////////
//2. 当周

//////////////////////////////////////
//3. 上周

//////////////////////////////////////
//4. 上月

//////////////////////////////////////
//5. 时间
//设置排班信息，已完成
// {
//     "classCount":3,//班次总数
//     "classTime":[
//         {
//             "startTime":"8:00",
//             "endTime":"17:00"
//         },{
//             "startTime":"17:00",
//             "endTime":"2:00"
//         },{
//             "startTime":"2:00",
//             "endTime":"8:00"
//         }
//     ]
// }
app.post('/setClassStartTimeAndEndTime',async function(req,res){
    console.log(req.body);  
    let ret = await dayApi.setClassTime(req.body["classTime"], req.body["classCount"]);
    return res.json(ret);
});
//////////////////////////////////////


//////////////////////////////////////
//机床档案

//////////////////////////////////////

//////////////////////////////////////
///智能APP
// http://127.0.0.1:13001/startDesktopApp?appId=0
app.get('/startDesktopApp',async function(req,res){//启动某个APP
    let retValue = {};
    retValue.msgDesc = "查询失败";
    retValue.msgCode = -1;

    let path = await dayApi.getAppPath(req.query["appId"]);
    if(path == null){
        return retValue;
    }
    console.log(path);

    exec(path);
    retValue.msgDesc = "查询成功";
    retValue.msgCode = 0;
    return res.json(retValue);
 });

//  {
//      "appId" : 0,        
//      "path":"D:\\Program Files (x86)\\Beyond Compare 2\\BC2.exe"
//  }
 app.post('/setDesktopAppPath',async function(req,res){//设置APP启动路径
    let value = await dayApi.setAppPath(req.body["appId"], req.body["path"]);
    console.log(value);
    return res.json(value);
 });

// http://127.0.0.1:13001/startCalc
app.get('/startCalc',function(req,res){//启动计算器
    cmd.get('calc');//计算器

    return res.json({
        "msgDesc":"成功",
        "msgCode":0,
    });
 });
// http://127.0.0.1:13001/openNotePad
app.get('/openNotePad',function(req,res){//启动记事本
    cmd.get('notepad');//记事本
    
    return res.json({
        "msgDesc":"成功",
        "msgCode":0,
    });
});
//////////////////////////////////////

var server = app.listen(13001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
    //dayApi.flushAllData();
});