// 获取本地存储的用户名
var username = localStorage.getItem("username");
var commodity;
$(function(){

    //判断用户是否登录
	if(username == '' || username == 'undefined' || username == null) {
		window.location.href = '../login.html';
	} else {
		$('#username').text(username);
    }
    

    $(document).ready(function(){
        console.log("123");
        $.ajax({
            type: "GET",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: COMMODITIEDETAIL,
            data:{'commodityCode':'20190001'},
            success: function (result) {
                console.log(result);
                // result = eval('(' + result + ')');
                commodity = result.data.commodityDetail;
                //document.getElementById("url").innerHTML = commodity.url;
                document.getElementById("commodityName").innerHTML = commodity.commodityName;
                document.getElementById("describe").innerHTML = commodity.describe;
                document.getElementById("endTime").innerHTML = getMyDate(commodity.endTime);
                document.getElementById("marketPrice").innerHTML = commodity.marketPrice;
                document.getElementById("seckillPrice").innerHTML = commodity.seckillPrice;
                document.getElementById("startTime").innerHTML = getMyDate(commodity.startTime);
            },  
            error : function() {
                alert("异常！");
            }
        });
    })
})
function getMyDate(time){
    var oDate = new Date(time),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth()+1,
        oDay = oDate.getDate(),
        oTime = oYear +'-'+ getZF(oMonth) +'-'+ getZF(oDay)+" "+getZF(oDate.getHours())+":"+getZF(oDate.getMinutes())+":"+getZF(oDate.getSeconds());//最后拼接时间
    return oTime;
};

//补0操作,当时间数据小于10的时候，给该数据前面加一个0
function getZF(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}