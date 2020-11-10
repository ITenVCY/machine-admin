var state=1; //只有1状态下才能增加班次
var classCount = 1;
var classCount1 = 0;
function pd_dl(){
    var input=document.getElementById("pwd").value;
    if (input=="123")
    {
        $("#pb1").addClass("css_pd_select");
        $("#pb2").attr("class","css_pd_banci"); 
    }
    //classCount = 1;
}
// function pd_zjbanci(){
    
//     var d=$('#pd_bc');
//    $('#pb2_pd_body').append('<div><div style="width: 519px;height: 215px; margin-top: 37px;margin-left: 43px;border: 1px solid #5880F4;"></div></div>');
//     //$('#pb2_pd_body').append($('#pd_bc').clone().attr('pb2_pd_body','pb2_pd_body2'));

// }

function pd_zjbanci(){
    if(state==1){
        classCount1=classCount;
        var d=$('#pd_bc');
        $('#pb2_pd_body').append(setId());
        classCount ++;
      //$('#pb2_pd_body').append($('#pd_bc').clone().attr('pb2_pd_body','pb2_pd_body2'));
      state=0;
    }
    else{
        alert("请先保存上一个班次");
    }
}

function setId(){

    var html = '<div id="pd_bc' + classCount1 + '" class="banci">' + 
                '<div class="bc_head">' +
                '<span class="bc_text_num">第'+ classCount1 + '班</span>' +
                '<input class="bc_text_true" type ="button" value="确认" onclick="onclick_true()">' +
            '</div>' +
            '<hr class="bc_line1">' +
            '<div class="bc_body"> '+
                '<div class="bc_time"> '+
                    '<span class="bc_time_text1 bc_time_text">上班时间</span>' +
                    '<hr class="bc_line2"></hr>'+
                    '<span class="bc_time_text2 bc_time_text">下班时间</span>' +
                '</div>' +
                '<div class="bc_time_last">'+
                    '<input id = "start_time' + classCount1 + '" type="time" name="请选择时间" class="time1" value=""  /> '+
                    '<input id = "end_time' + classCount1 + '" type="time" name="请选择时间2" class="time2" /> '+
                    '<hr class="bc_line3"></hr>' +
                    '<hr class="bc_line4"></hr>' +
                '</div>' +                               
            '</div>' + 
            '</div> ';

    return html;
}
function onclick_true(){
    var getidvalue=document.getElementById("start_time"+classCount1).value;
    console.log(getidvalue);
    if(getidvalue==""){
        
        alert("请先设置上班时间！");
    }
    else{
        alert("上班时间为："+getidvalue);
    }
}