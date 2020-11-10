var currentFirstDate =new Date();
var weekarry = [];

function getNowTime(){
    var date = new Date();
    var hours = date.getHours();
    if(hours < 10)
    {
        hours = '0' + hours;
    }
    var mins = date.getMinutes();
    if(mins < 10)
    {
        mins = '0' + mins;
    }
    return ''+hours+":"+mins;
}

function getWeekDate(n){
    weekarry = [];
    setDate(addDate(currentFirstDate, n));
    return weekarry;
}
function getOldMonthDate(){//获取上月日期
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = 1;
    if(month == 0)//若是一月份则是去年
    {
        month = 12;
        day = 1;
        return ""+year-1+month+day;
    }
    return ''+year+month+day;
}
function getNowWeekDate(){
    return getWeekDate(0);//获取本周七天
}
function getOldWeekDate(){
    return getWeekDate(-7);//获取过去七天
}
function getOldDayDate(){//过去昨天的日期
    var date = new Date();
    var day = date.getDay();
    return getWeekDate(1)[day-2];
}
function getNowDayDate(){
    var date = new Date();
    var day = date.getDay();
    return getWeekDate(1)[day-1];
}
function getNextDayDate(){//获取明天日期
    var date = new Date();
    var day = date.getDay();
    return getWeekDate(1)[day];
}
function cmpTime(d1, d2){
  return parseInt(d1.replace(/:/,"")) < parseInt(d2.replace(/:/,""))? true : false;
}
//console.log(cmpTime("8:43","20:12"));

function intervalTime(startTime,endTime) {
    let bgts = startTime.split(":");
    let edts = endTime.split(":");
    let sec = 0;
    let hoursStart = parseInt(bgts[0]);
    let hourEnd = parseInt(edts[0]);
    let misStart =  parseInt(bgts[1])
    let misEnd =  parseInt(edts[1])

    hourEnd < hoursStart ?
    sec+=((24 + hourEnd - hoursStart) * 60 + (misEnd - misStart))*60:
    sec+=((hourEnd-hoursStart) * 60 + (misEnd - misStart))*60;//分钟
    sec += 60;

    return sec;
}
//console.log(intervalTime("11:30","11:31"));

function addDate(date, n){
    date.setDate(date.getDate() + n);        
    return date;
}

function formatDate(date){             
    var year = date.getFullYear();
    var month = (date.getMonth()+1);
    if(month < 10)
    {
        month = "0" + month;
    }
    var day = date.getDate()
    if(day < 10)
    {
        day = "0" + day;
    }
    return ''+year+month+day;
};

function setDate(date){
    var week = date.getDay()-1;
    date = addDate(date,week*-1);
    currentFirstDate = new Date(date);
    
    for(var i = 0; i < 7; i++){             
       weekarry.push(formatDate(i==0 ? date : addDate(date,1)));
    } 
}


module.exports = {
    weekarry,
    getOldMonthDate,//获取上月日期
    getNowWeekDate,//获取本周天数
    getOldWeekDate,//获取过去七天
    getOldDayDate,//获取昨天时间
    getNowDayDate,//获取今天时间
    getNextDayDate,//获取明天日期
    getNowTime, //获取当前几时几分
    intervalTime,//获取两个时间间的间隔
    cmpTime,
}