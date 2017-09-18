//限免时间
// setTime2(time);
//轮循
function setTime2(time){
    timer=setInterval('countTime2(time)',1000);   
}
//删掉轮循
function countTime2(time){
    var t = parseInt(time) - new Date().getTime(),h = 0,m = 0,s = 0,timer;
	if(t >= 0){
      h = Math.floor(t / 1000 / 60 / 60);
      m = Math.floor(t / 1000 / 60 % 60);
      s = Math.floor(t / 1000 % 60);
    }
    if(h < 10){
        h = '0' + h;
    }
    if(m < 10){
        m = '0' + m;
    }
    if(s < 10){
        s = '0' + s;
    }
	$("#t_h").html(h);
    $("#t_m").html(m);
    $("#t_s").html(s);
    if(h<= 0 && s<=0 && m<=0){
    	clearInterval(timer);
    }
}