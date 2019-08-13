// 获取本地存储的用户名
var username = localStorage.getItem("username");
$(function(){

    //判断用户是否登录
	if(username == '' || username == 'undefined' || username == null) {
		window.location.href = '../login.html';
	} else {
		$('#username').text(username);
    }
    
    initDayReport();

    $(document).ready(function(){
        // $.ajax({
        //     type: "GET",//方法类型
        //     dataType: "json",//预期服务器返回的数据类型
        //     url: COMMODITIES,
        //     success: function (result) {
        //         if (result.resultCode == 200) {
        //             alert("SUCCESS");
        //         };
        //     },
        //     error : function() {
        //         alert("异常！");
        //     }
        // });
    })
})

//初始化显示今日日报表
function initDayReport() {
    var table = $('#commodity_table').DataTable({
        "oLanguage": {
            "sProcessing": "正在获取数据，请稍后...",
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
            "sInfoEmpty": "没有数据",
            "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
            "sSearch":"搜索",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            },
            "sZeroRecords": "没有检索到数据"
        },
        "pagingType":   "full_numbers",
        "deferRender": false,
        "paging": true, //是否显示分页器
        "bFilter": false, //是否启用内置搜索功能：可以跨列搜索。
        "bLengthChange": false, //是否允许用户，在下拉列表自定义选择分页大小(10, 25, 50 and 100),需要分页支持
        "bInfo": true, //是否显示表格相关信息：例如翻页信息等。
        "ajax":{
            "url": COMMODITIES,
            "type":"GET",
        },
        "columns": [//返回列表名称
            { "data":"commodityCode"},
            { "data": "commodityName" },
            { "data": "state" },
            { "data": "seckillPrice" },
            { "data":"stock"},
        ]
    });
    return table;
}