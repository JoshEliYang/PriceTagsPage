var jsonData = "";
//测试数据（URL）
var g_url = "http://127.0.0.1:8080/pricetaginfo/pricetags";
var data_origins = ["澳大利亚","日本","美国","新西兰"];
var data_areas = [{"id":"KJG001","name":"杨浦店"},{"id":"KJG002","name":"大华店"},{"id":"KJG003","name":"徐汇店"},{"id":"KJG004","name":"浦东店"}];
//正式数据（URL）
// var g_url = "http://120.26.54.131:8080/pricetag/pricetags"
$.ajax({
	method : 'GET',
	url : g_url,
	async : false,
	dataType : 'json',
	crossDomain : true,
	beforeSend : function(xhr) {
		// xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
	},
	success : function(data) {
		// console.log(data);
		jsonData = data;
	},
	error : function() {
		alert('error');
	}
});

function window_onload(){
	if(location.href.indexOf('#reloaded')==-1){
		window.history.go(0);
	}
}
// json对象解析
var jsonData_str = JSON.stringify(jsonData.data);
var jsonData_after = eval("(" + jsonData_str + ")");


function Dele(index){
	var dele_id = index;
    $.messager.confirm("操作提示", "您确定要执行操作吗？", function (data) {
        if (data) {
            // location.reload();
            // alert(dele_id);
            // ==========删除=================>
            $.ajax({
				async : false,
				type : 'DELETE',
				url : g_url+'/'+dele_id,
				success : function(){
					alert("删除成功！");
				},
				error : function(){
					alert("删除失败！");
				}
            });
			window.location.reload();
			//==========insert===============>
			// $.ajax({
				// type : 'POST',
				// url : 'http://127.0.0.1:8080/pricetaginfo/pricetags',
				// async : false,
				// contentType : 'application/json',
				// data : '{"goodsOrigin":"11","specifications":"11","marketPrice":0.0,"shopId":"1","goodsNo":"123123","goodsName":"asdasdasd2222222","unit":"11","salesPrice":0.0,"propmPrice":0.0,"qrCode":"aaaa","visible":0,"id":7,"type":0}',
				// crossDomain : true,
				// success : function(response){
				// 	if(response.code==0){alert(response.msg);}
				// 	window.location.reload();
				// },
				// error : function(response){
				// 	alert(response.msg);
				// }
			// });
        }
        else {

        }
    });
}
function keyClear(){
	$('#select_shop').val(0);
	$('#select_area').val(0);
	$('#input_search').val("");
}

function keySearch(){
	var select_shop_value = $('#select_shop').val();
	var select_area_text = $('#select_area option:selected').text();
	var select_input_key = $('#input_search').val();
	var search_json_data = {"select_shop":select_shop_value,"select_area":select_area_text,"input_search":select_input_key};
	
	window.sessionStorage.temp_data = search_json_data;


	console.log(sessionStorage.temp_data.select_area);
}

function openUrl(index){
	var jump_url = "page_detail.html?id="+index;
	window.location.href = jump_url;
}

function dataUpdate(index){
	// alert(index);
	var jump_url = "page_update.html?id="+index;
	window.location.href = jump_url;
}
$(function(){
	// $("#tb").append('<div id="box2" style="padding : 5px"></div>');
	$("#tb").append('<div id="box2" style="padding : 5px"></div>');
	$("#box2").append('<span id="span_shop">区域：</span><select id="select_shop"></select>');
	$("#box2").append('<span id="span_area">商品产地：</span><select id="select_area"></select>');
	$("#box2").append('<a href="javascript:void(0)" id="clear_button" class="easyui-linkbutton" iconCls="icon-clear" style="float : right; height : 20px;" onclick="keyClear()">清空</a>');
	$("#box2").append('<a href="javascript:void(0)" id="search_button" class="easyui-linkbutton" iconCls="icon-search" style="float : right; height: 20px;" onclick="keySearch()">查询</a>');
	$("#box2").append('<input id="input_search" type="text" class="textbox" name="user">');
	$("#box2").append('<span id="span_search">商品名（支持模糊）</span>');
	$("#select_shop").append('<option value=0>全部</option>');
	$("#select_area").append('<option value=0>全部</option>');

	$('#tree_box').tree({
		url : 'tree.json',
		animate : true,
		formatter : function(node){
			return node.text;
		}
	});

	$('#table').datagrid({
		width : 1200,
		title : '表格',
		fitColumns : true,
		singleSelect : true,
		striped : true,
		rownumbers : true,
		//分页
		// pagination : true,
		// pageSize : 10,
		// pageList : [10,20,30,40,50],
		toolbar : '#tb',
		//固定列
		// frozenColumns:[[
		//                {title:'编号',field:'code',width:50}
		// ]],
		columns : [[
			{
				field : 'shopId',
				title : 'shopId',
				width : 100,
				halign : 'center'
			},
			{
				field : 'goodsNo',
				title : 'goodsNo',
				width : 100,
				halign : 'center'
			},
			{
				field : 'goodsName',
				title : 'goodsName',
				width : 100,
				halign : 'center'
			},
			{
				field : 'unit',
				title : 'unit',
				width : 100,
				halign : 'center'
			},
			{
				field : 'salesPrice',
				title : 'salesPrice',
				width : 100,
				halign : 'center'
			},
			{
				field : 'propmPrice',
				title : 'propmPrice',
				width : 100,
				halign : 'center',
				hidden : true
			},
			//qrcode不显示
			{
				field : 'qrCode',
				title : 'qrCode',
				width : 100,
				halign : 'center',
				hidden : true
			},
			//visible不显示
			{
				field : 'visible',
				title : 'visible',
				width : 100,
				halign : 'center',
				hidden : true
			},
			{
				field : 'goodsOrigin',
				title : 'goodsOrigin',
				width : 100,
				halign : 'center'
			},
			{
				field : 'specifications',
				title : 'specifications',
				width : 100,
				halign : 'center'
			},
			{
				field : 'marketPrice',
				title : 'marketPrice',
				width : 100,
				halign : 'center',
				hidden : true
			},
			//id不显示
			{
				field : 'id',
				title : 'id',
				width : 100,
				halign : 'center',
				hidden : true
			},
			//type不显示
			{
				field : 'type',
				title : 'type',
				width : 100,
				halign : 'center',
				hidden : true
			},
			{
				field : 'opt',
				title : '操作',
				width : 100,
				align : 'center',
				formatter : function(value, row, index){
					// console.log(row.id);
					return '<a href = "javascript:void(0)" id = "detail' + row.id + '" onclick = "openUrl(' + row.id + ')">详情</a>' + '|' +'<a href = "javascript:void(0)" onclick = "dataUpdate(' + row.id + ')">修改</a>' + '|' + '<a href = "javascript:void(0)" onclick = "Dele(' + row.id + ')">删除</a>';
				}
			}
		]]

	});
	$("#table").datagrid('loadData', jsonData_after);

	$.each(data_areas,function(i,val){
		var value = parseInt(i)+1;
		$("#select_shop").append('<option value="'+ value +'">'+val.name+'</option>');
	});
	$.each(data_origins,function(i,val){
		var value = parseInt(i)+1;
		$("#select_area").append('<option value="'+ value +'">'+val+'</option>');
	});
	$.parser.parse();
});
