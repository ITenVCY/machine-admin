function select_production_state(){
    $("#head-production-state").addClass("css-hd-sle");
    $("#head-machine-info").attr("class","head-pub");
    $("#head-intelligent-app").attr("class","head-pub");
    change_ifream_to_production();
}

function select_machine_info(){
    $("#head-production-state").attr("class","head-pub");
    $("#head-machine-info").addClass("css-hd-sle");
    $("#head-intelligent-app").attr("class","head-pub");
    change_ifream_to_machine_info();
}

function select_intelligent_app(){
    $("#head-production-state").attr("class","head-pub");
    $("#head-machine-info").attr("class","head-pub");
    $("#head-intelligent-app").addClass("css-hd-sle");
    change_ifream_to_intellgent();
}

function change_ifream(index_src, id){
    $("#" + id).attr("src","../template/" + index_src);
}

function change_ifream_to_production(){
    change_ifream("index_production_state.html", "frame_container");
}

function change_ifream_to_machine_info(){
    change_ifream("index_machine_info.html", "frame_container");
}

function change_ifream_to_intellgent(){
    change_ifream("index_intelligent.html", "frame_container");
}