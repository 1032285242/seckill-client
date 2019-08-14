// 获取本地存储的用户名
var username = localStorage.getItem("username");
$(function(){

    //判断用户是否登录
	if(username == '' || username == 'undefined' || username == null) {
		window.location.href = '../login.html';
	} else {
		$('#username').text(username);
    }
    $(document).ready(function(){
        initDayReport();
    })
})

function initDayReport() {
    var httpurl = SECKILLCOMMODITIES
    $.ajax({
        url: httpurl,//要连接的接口
        type: 'GET',
        dataType: 'json',
        success: function (result) {

            if (result.code == "200") {
                pageInfo = result.data;

                setPageInfo(pageInfo);
            } else {
                alert("错误码；" + result.code + "   错误信息：" + result.message);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('网络异常！尝试刷新网页解决问题')
        }
    });
};

    function setPageInfo(result) {
        var i = 0
        var col = 5
        var j = 0
        var text=''
        var text_tr=''
        for (i; i<result.length;i++) {
            var property = result[i].commodityCode;

            text_tr += '<td>'
            text_tr += '<a href="./seckillNormalPage.html?id='+result[i].commodityCode+'"><img class="image_commodity" style="width: 50% "src="'
            text_tr += 'http://10.1.84.27:8080/images/'+result[i].url+'"alt=""><div class="caption">'
            text_tr +='<h4>'+result[i].commodityName+'</h4>'
            text_tr +='<h4><p>价格：'+result[i].seckillPrice+'</p></h4>'
            if(result[i].nowStock==0){
                text_tr +='<h4>剩余库存：<button disabled="disabled" style="background-color: #8f9192;" class="radius_style">'+result[i].nowStock+'</button></h4>' 
            }else{
                text_tr +='<h4>剩余库存：<button disabled="disabled" class="radius_style   label-info">'+result[i].nowStock+'</button></h4>'
            }
            text_tr += '</td>'
            j++
            if(j%col==0){
                text +='<tr>'+text_tr+'</tr>'
                text_tr=''
            }
        }
        text +='<tr>'+text_tr+'</tr>'
        
        $('#All').append(text);
    }