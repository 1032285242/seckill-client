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
// function initDayReport() {
//     var table = $('#commodity_table').DataTable({
//         "oLanguage": {
//             "sProcessing": "正在获取数据，请稍后...",
//             "sLengthMenu": "每页显示 _MENU_ 条记录",
//             "sZeroRecords": "抱歉， 没有找到",
//             "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
//             "sInfoEmpty": "没有数据",
//             "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
//             "sSearch":"搜索",
//             "oPaginate": {
//                 "sFirst": "首页",
//                 "sPrevious": "前一页",
//                 "sNext": "后一页",
//                 "sLast": "尾页"
//             },
//             "sZeroRecords": "没有检索到数据"
//         },
//         "pagingType":   "full_numbers",
//         "deferRender": false,
//         "paging": true, //是否显示分页器
//         "bFilter": false, //是否启用内置搜索功能：可以跨列搜索。
//         "bLengthChange": false, //是否允许用户，在下拉列表自定义选择分页大小(10, 25, 50 and 100),需要分页支持
//         "bInfo": true, //是否显示表格相关信息：例如翻页信息等。
//         "ajax":{
//             "url": SECKILLCOMMODITIES,
//             "type":"GET",
//         },
//         "columns": [//返回列表名称
//             { "data": "url" },
//             { "data":"commodityCode"},
//             { "data": "commodityName" },
//             { "data": "seckillPrice" },
//             { "data":"nowStock"},
//         ]
//     });
//     return table;
// }

// /**
//  *  BsTable动态表格生成
//  */
// DataQuery.sqlExecute = function (){

//     // var sql = $('#sql').val();
//     // var connectInfo = $('#connectInfo').val();

//     $('#commodity_table').bootstrapTable({
//         ajax: function (request) {
//             $.ajax({
//                 type: "GET",
//                 url: SECKILLCOMMODITIES,
//                 contentType: "application/json;charset=utf-8",
//                 dataType: "json",
//                 json: 'callback',
//                 success: function (json) {

//                     var dynamicHeader = [];
//                     dynamicHeader.push({
//                         field: "state",
//                         check: true
//                     });

//                     for (var i = 0; i<(Object.keys(json[0])).length; i++) {
//                         var property = (Object.keys(json[0]))[i];
//                         //console.log(property);
//                         dynamicHeader.push({
//                             "title": property,
//                             "field": property,
//                             switchable: true,
//                             sortable: true
//                         });
//                     }

//                     //console.log(Object.keys(json[0]));

//                     $('#DataQueryTable').bootstrapTable('destroy').bootstrapTable({
//                         data: json,
//                         toolbar: '#toolbar',
//                         cache: false,
//                         striped: true,
//                         sidePagination: "client",
//                         sortOrder: "desc",
//                         pageSize: 25,
//                         pageNumber: 1,
//                         pageList: "[25, 50, 100, All]",
//                         showToggle: true,
//                         showColumns: true,
//                         showExport: true,
//                         exportDataType: "basic",
//                         pagination: true,
//                         strictSearch: true,
//                         search: true,
//                         columns: dynamicHeader
//                     });
//                 },
//                 error: function () {
//                     alert("SQL查询错误，请输入正确的SQL语句！");
//                     location.reload();
//                 }
//             });
//         }
//     });
// };

function initDayReport() {
    var httpurl = "http://localhost:8080/commodity/queryCommoditiesList"
    var obj = {} ;
    $.ajax({
        url: httpurl,//要连接的接口
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            console.log(result)
            if (result.code == "200") {
                pageInfo = result.data;
                console.log(pageInfo);
                // console.log(type);
                // setPageInfo();
                setPageInfo(pageInfo);
            } else {
                alert("错误码；" + result.code + "   错误信息：" + result.message);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('XMLHttpRequest:');
            console.log(XMLHttpRequest);
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
            console.log(property);
            console.log(result[i].url);
            text_tr += '<td>'
            text_tr += '<a href="http://www.baidu.com"><img style="width: 50% "src="'
            text_tr += result[i].url+'"alt=""></a><div class="caption">'
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
        
       
        console.log(text)
        console.log( $('#All'))
        $('#All').append(text);
    }