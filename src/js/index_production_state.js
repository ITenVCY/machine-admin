var clickflag = 1;

function day_state(){
    if(clickflag == 1)
    {
        return;
    }
    clear_css_and_img(clickflag);
    clickflag = 1;
    $("#day_state_id").addClass("css-lf-navegation-select");
    $("#day_img").attr("src","../img/cb-select.png");
    change_ifream("index_day_state.html","frame_container");
}

function week_state(){
    if(clickflag == 2)
    {
        return;
    }
    clear_css_and_img(clickflag);
    clickflag = 2;
    $("#week_state_id").addClass("css-lf-navegation-select");
    $("#wek_img").attr("src","../img/cb-select.png");
    change_ifream("index_week_state.html","frame_container");
}

function month_state(){
    if(clickflag == 3)
    {
        return;
    }
    clear_css_and_img(clickflag);
    clickflag = 3;
    $("#month_state_id").addClass("css-lf-navegation-select");
    $("#month_img").attr("src","../img/cb-select.png");
    change_ifream("index_month.html","frame_container");
}

function old_month_state(){
    if(clickflag == 4)
    {
        return;
    }
    clear_css_and_img(clickflag);
    clickflag = 4;
    $("#old_month_state_id").addClass("css-lf-navegation-select");
    $("#old_month_img").attr("src","../img/cb-select.png");
    change_ifream("index_old_month.html","frame_container");
}

function range_class(){
    if(clickflag == 5)
    {
        return;
    }
    clear_css_and_img(clickflag);
    clickflag = 5;
    $("#rang_class_id").addClass("css-lf-navegation-select");
    change_ifream("index_range_class.html","frame_container");
}

function clear_css_and_img(id){
    switch(id) {
        case 1:
            $("#day_state_id").attr("class","css-day-navegation");   
            $("#day_img").attr("src","../img/cb-no-select.png");
            break;
        case 2:
            $("#week_state_id").attr("class","css-day-navegation");    
            $("#wek_img").attr("src","../img/cb-no-select.png");  
            break;
        case 3:
            $("#month_state_id").attr("class","css-day-navegation");      
            $("#month_img").attr("src","../img/cb-no-select.png");
            break;
        case 4:
            $("#old_month_state_id").attr("class","css-day-navegation");      
            $("#old_month_img").attr("src","../img/cb-no-select.png");
            break;
        case 5:
            $("#rang_class_id").attr("class","css-day-navegation");      
            break;
        case -1:
        default:
           break;
   } 
}


