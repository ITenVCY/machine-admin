var redis = require('redis');
var client = redis.createClient(6379, "127.0.0.1");
const schedule = require('node-schedule');
var timeApi = require('./datetime');
var demoJson = require('./testjson');
const { cmpTime } = require('./datetime');

//redis 同步
let getString = function(key) {
	return new Promise(function (resovle, reject) {
		client.get(key,function(err, res){
			return resovle(res);
		});
	});
 };
	
 let setString = function(key, value) {
	return new Promise(function (resovle, reject) {
		client.set(key, value,function(err, res){
			return resovle(res);
		});
	});
 };

 let hgetString = function(timekey,key) {
	return new Promise(function (resovle, reject) {
		client.hget(timekey ,key,function(err, res){
			return resovle(res);
		});
	});
 };

 let hsetString = function(timekey ,key, value) {
	return new Promise(function (resovle, reject) {
		client.hset(timekey, key, value,function(err, res){
			return resovle(res);
		});
	});
 };

let hexitsKey = function(hname,key){
    return new Promise(function (resovle, reject) {
        client.hexists(hname, key, function(err, res){
            return resovle(res);
		});
	});
}

let exitsKey = function(key){
    return new Promise(function (resovle, reject) {
        client.exists(key, function(err, res){
            return resovle(res);
		});
	});
}


let delKey = function(name){
    return new Promise(function (resovle, reject) {
        client.del(name, function(err, res){
            return resovle(res);
		});
	});
}

let renameKey = function(name, newname){
    return new Promise(function (resovle, reject) {
        client.rename(name, newname, function(err, res){
            return resovle(res);
		});
	});
}

// //刷新全部数据
// function flushAllData(time)
// {
//     schedule.scheduleJob('* 2 * * * *',()=>{//每分钟触发
//         console.log("send all day data");
//     }); 
// }

async function getDayDate(){

}

//创建新的日期时间
async function createNewDayInfo(){
    let classMax = parseInt(await hgetString("workTime", "classCount"));
    let startAndEndTime = JSON.parse(await hgetString("workTime", "allTime"));
    let nextTime = "";
    if(cmpTime(startAndEndTime["startTime"],startAndEndTime["endTime"])){//小于结束时间是不是没有跨天
        nextTime = timeApi.getNextDayDate();
    }else{
        nextTime = timeApi.getNowDayDate();
    }
    console.log(nextTime);
    for(let i = 0; i < classMax; ++i)
    {
        if(null == await hsetString(nextTime, "class"+i, JSON.stringify(demoJson.classDemo)))
        {
            return false;
        }
    }
    if(null == await setString("newClassTime", nextTime)){
        return false;
    }
    if(null == await hsetString(nextTime, "nowClass", "1")){
        return false;
    }
    if( null == await hsetString(nextTime, "classCount", classMax+"")){
        return false;
    }
    return true;
}
//console.log(createNewDayInfo());

//刷新传入班次数据
async function flushClassData(classId, nowDate)
{
    let value = await hgetString(nowDate, "class"+classId);
   
    if(value == null)
    {
        console.log("flushClassData nowDate" + nowDate);
        return -1;
    }
    let classValue = JSON.parse(value);
    //console.log(classValue["trueTime"], getNowTime());
    let sec = timeApi.intervalTime(classValue["trueTime"], timeApi.getNowTime());
    classValue["state"] = 2;//结束
    classValue["classQP"] = parseInt(await getString("classQP"));//
    classValue["sec"] = sec;//
    classValue["strandTime"] = Math.floor(parseInt(await getString("standTime")) / 2);
   
    classValue["runTime"] = Math.floor(parseInt(await getString("runTime")) / 2);
    classValue["offLineTime"] = Math.floor(parseInt(await getString("offLineTime")) / 2);
    classValue["alarmTime"] = Math.floor(parseInt(await getString("alarmTime")) / 2);

    classValue["strandPercent"] = classValue["strandTime"] / sec;
    classValue["rundPercent"] =  classValue["runTime"] / sec;
    classValue["alarmPercent"] = classValue["alarmTime"] / sec;
    classValue["offLinePercent"] = 1 - (classValue["strandPercent"] + classValue["rundPercent"] + classValue["alarmPercent"]);
    // console.log(nowDate, "class"+classId, JSON.stringify(classValue));
    console.log(classValue, sec);
    if(null == await setString("sampleFlag", "end"))
    {
        console.log("flushClassData -2");
        return -2;
    }
    if(null == await hsetString(nowDate, "class"+classId, JSON.stringify(classValue)) )
    {
        console.log("flushClassData -1");
        return -1;
    }
    return 0;
}

//////////////////////////////////////
//生产统计
//////////////////////////////////////
//1. 当日产报
async function setStartClassStates(classId){//启动ID为CLASSID的班次
    let nowDate = await getString("newClassTime");
    if( null != nowDate){
        let classValue = {};
        classValue["state"] = 1;//结束
        classValue["classQP"] = 0;//
        classValue["trueTime"] =  timeApi.getNowTime();
        classValue["strandTime"] = "";
        classValue["runTime"] = "";
        classValue["offLineTime"] = "";
        classValue["alarmTime"] = "";
    
        classValue["strandPercent"] = 0;
        classValue["rundPercent"] =  0;
        classValue["alarmPercent"] = 0;
        classValue["offLinePercent"] = 0;
        classValue["sec"] = 0;
        console.log(classValue);
    
        if(null != await hsetString(nowDate, "class"+classId, JSON.stringify(classValue)) && 
           null != await setString("sampleFlag", "start") && 
           null != await hsetString(nowDate, "nowClass", ++classId + '')
        ){
            return demoJson.sucQuestion;
        }      
    }
    return demoJson.errorQuestion;
};

async function setEndClassStates(classId){//结束ID 为CLASSID的班次
    let retValue = {};
    retValue.msgDesc = "查询失败";
    retValue.msgCode = -1;
    let nowDate = await getString("newClassTime");//获取当前班次属于那个时间
    if(await flushClassData(classId, nowDate) < 0)
    {
        console.log(1);
        return retValue;
    }

    let maxClassId = await hgetString("workTime", "classCount");
    console.log("203", maxClassId);
    if((maxClassId - 1) == classId)//最后一个班次
    {
        console.log("最后一个班次");
        //更新当前时间    
        if(null == await delKey("workTime"))
        {
            console.log(4);
            return retValue;
        }
        console.log("214",ret);
        if(true == await exitsKey("workTimeNew"))
        {
            if(null == await renameKey("workTimeNew", "workTime"))
            {
                console.log(5);
                return retValue;
            }
        }
        //创建新的日期模板     
        if(false == await createNewDayInfo())
        {
            console.log(3);
            return retValue;
        }
    }
    retValue.msgCode = 0;
    retValue.msgDesc = "查询成功";
    return retValue;
};

// {
//     "state": 2,
//     "classQP": 0,
//     "trueTime": "16:45",
//     "strandTime": 9,
//     "runTime": 0,
//     "offLineTime": 0,
//     "alarmTime": 0,
//     "strandPercent": 0.15,
//     "rundPercent": 0,
//     "alarmPercent": 0,
//     "offLinePercent": 0.85
//  }
async function getAllClassStatus(){
    let retValue = {};
    retValue.msgDesc = "查询失败";
    retValue.msgCode = -1;
    let nowDate = await getString("newClassTime");//获取当前班次属于那个时间
    let maxClassId = await hgetString("workTime", "classCount");
    let retJson = {};
    if(maxClassId <= 0)
    {
        return retValue;
    }
    

    for(let i = 0; i < maxClassId; ++i){

        let tmp = JSON.parse(await hgetString(nowDate, "class"+i));
        if(tmp == null){
            return retValue;
        }
        if(i == 0)
        {
            retJson["startTime"] = tmp["trueTime"];
        }
        console.log(tmp);
        retJson["QP"] += tmp["classQP"];
        retJson["sec"] += tmp["sec"];
        retJson["strandTime"] += tmp["strandTime"];
        retJson["runTime"] += tmp["runTime"];
        retJson["offLineTime"] += tmp["offLineTime"];
        retJson["alarmTime"] += tmp["alarmTime"];
    }
    console.log(nowDate ,retJson);
}
//getAllClassStatus();
//////////////////////////////////////
//2. 当周

//////////////////////////////////////
//3. 上周

//////////////////////////////////////
//4. 上月

//////////////////////////////////////

//////////////////////////////////////
//5. 排班
async function setClassTime(time, count){//设置排班数据
    let retValue = {};
    retValue.msgDesc = "查询失败";
    retValue.msgCode = -1;
    if(time.length != count){  
        retValue.msgCode = -2;
        return retValue;
   }

    if(null == await hsetString("workTimeNew","classCount", count)){
        retValue.msgCode = -3;
        return retValue;
    }

    let startTime = time[0]["startTime"];
    let endTime = time[count-1]["endTime"];
    let allTime = {
        "startTime": startTime,
        "endTime":endTime
    };
    if(null == await hsetString("workTimeNew","allTime", JSON.stringify(allTime))){
        retValue.msgCode = -4;
        return retValue;
    }

    for(let i = 0; i < count; ++i){
        if(null == await hsetString("workTimeNew", "class"+i, JSON.stringify(time[i]))){
            console.log(i, "class"+i, JSON.stringify(time[i]));
            retValue.msgCode = -5;
            return retValue;
        }
    }
    retValue.msgDesc = "查询成功";
    retValue.msgCode = 0;
    console.log(retValue);
    return retValue;
}
//////////////////////////////////////

//////////////////////////////////////
//机床档案

//////////////////////////////////////

//////////////////////////////////////
///智能APP
//设置APP路径
async function setAppPath(index, path){
    let retValue = {};
    retValue.msgDesc = "查询失败";
    retValue.msgCode = -1;
    if(await hsetString("appPath", index, path) == null){
        retValue.msgCode = -2;
        return retValue;
    }
    retValue.msgCode = 0;
    retValue.msgDesc = "查询成功";
    return retValue;
}

async function getAppPath(index){
    return await hgetString("appPath", index);
}


///////////////////////////
module.exports = {
    setStartClassStates,
    setEndClassStates,

    setClassTime,
    //机床档案
    //智能APP
    setAppPath,
    getAppPath,
}