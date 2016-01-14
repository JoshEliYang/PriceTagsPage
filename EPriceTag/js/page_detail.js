var data_id = $.url().param('id');
var data_qrcode;

function detailCancel(){
	var cancel_url = document.referrer;	
	window.location.replace(cancel_url);
}
function detailUpdatejump(){
	var detailupdatejump_url = "page_update.html?id="+data_id;
	window.location.replace(detailupdatejump_url);
}
$(function() {
	$.ajax({
		method : 'GET',
		url : 'http://192.168.1.13:8080/pricetaginfo/pricetags/'+data_id,
		async : false,
		dataType : 'json',
		crossDomain : true,
		// contentType : 'application-json',
		beforeSend : function(xhr) {
			// xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
		},
		success : function(data) {
			$('#goods_name').html(data.data.goodsName);
			$('#goods_unit').html(data.data.unit);
			if (data.data.visible == 1) {
				$('#goods_visible').html("是");
			}else{
				$('#goods_visible').html("否");
			}
			

			$('#goods_shopid').html(data.data.shopId);
			$('#goods_type').html(data.data.type);
			$('#goods_salesprice').html(parseFloat(data.data.salesPrice));
			$('#goods_propmprice').html(parseFloat(data.data.propmPrice));
			$('#goods_marketprice').html(parseFloat(data.data.marketPrice));	
			$('#goods_No').html(data.data.goodsNo);
			$('#goods_origin').html(data.data.goodsOrigin);
			$('#goods_specifications').html(data.data.specifications);
			data_qrcode = data.data.qrCode;
			console.log(data.data.qrCode);
		},
		error : function() {
			alert('error');
		}
	});
	$('#box').window({
		width : 500,
		height : 600,
		modal : true,
		title : '详情页面',
		collapsible : false,
		minimizable : false,
		maximizable :false,
		closable : false,
		draggable : false,
		resizable : false,
	});
	$("#qrcode").qrcode({ 
	    //render: "table", //table方式 
	    width: 150, //宽度 
	    height:150, //高度 
	    text: data_qrcode //任意内容 
	});
	
});
// $('#page3_cancel').click(function(){
// 	window.history.go(-1);
// });