var jsonData = "";
$.ajax({
	method : 'GET',
	url : 'http://127.0.0.1:8080/pricetaginfo/pricetags',
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
            	url : 'http://127.0.0.1:8080/pricetaginfo/pricetags/'+dele_id,
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
    		// 	type : 'POST',
    		// 	url : 'http://127.0.0.1:8080/pricetaginfo/pricetags',
    		// 	async : false,
    		// 	contentType : 'application/json',
    		// 	data : '{"goodsOrigin":"11","specifications":"11","marketPrice":0.0,"shopId":"1","goodsNo":"123123","goodsName":"asdasdasd2222222","unit":"11","salesPrice":0.0,"propmPrice":0.0,"qrCode":"aaaa","visible":0,"id":7,"type":0}',
    		// 	crossDomain : true,
    		// 	success : function(response){
    		// 		if(response.code==0){alert(response.msg);}
    		// 		window.location.reload();
    		// 	},
    		// 	error : function(response){
    		// 		alert(response.msg);
    		// 	}
    		// });
        }
        else {

        }
    });
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
	$('#table').datagrid({
		width : 1200,
		title : '表格',
		// url : jsonData_after,
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
		// 		]],
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
				halign : 'center'
			},
			//qrcode应暂不显示
			{
				field : 'qrCode',
				title : 'qrCode',
				width : 100,
				halign : 'center',
				hidden : true
			},
			//visible应暂不显示
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
				halign : 'center'
			},
			//id应暂不显示
			{
				field : 'id',
				title : 'id',
				width : 100,
				halign : 'center',
				hidden : true
			},
			//type应暂不显示
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
					console.log(row.id);	
					return '<a href = "#" id = "detail' + row.id + '" class = "easyui-linkbutton" onclick = "openUrl(' + row.id + ')">详情</a>' + '|' +'<a href = "#" class = "easyui-linkbutton" onclick = "dataUpdate(' + row.id + ')">修改</a>' + '|' + '<a href = "#" class = "easyui-linkbutton" onclick = "Dele(' + row.id + ')">删除</a>';
				}
			}	
		]] 

	});
	$("#table").datagrid('loadData', jsonData_after);
});
