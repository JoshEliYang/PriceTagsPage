var data_id = $.url().param('id');
var data_qrcode;

function updateCancel () {
	window.history.go(-1); 
}
$(function() {
	$.ajax({
		method : 'GET',
		url : 'http://127.0.0.1:8080/pricetaginfo/pricetags/'+data_id,
		async : false,
		dataType : 'json',
		crossDomain : true,
		// contentType : 'application-json',
		beforeSend : function(xhr) {
			// xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
		},
		success : function(data) {
			$('#goods_name').html(data.data.goodsName);
			$('#goods_unit').val(data.data.unit);
			if (data.data.visible == 1) {
				$('#goods_visible1').attr("checked", "true");
			}else{
				$('#goods_visible2').attr("checked", "true");
			}
			$('#goods_shopid').val(data.data.shopId);
			$('#goods_type').val(data.data.type);
			$('#goods_salesprice').val(parseFloat(data.data.salesPrice));
			$('#goods_propmprice').val(parseFloat(data.data.propmPrice));
			$('#goods_marketprice').val(parseFloat(data.data.marketPrice));	
			$('#goods_No').val(data.data.goodsNo);
			$('#goods_origin').val(data.data.goodsOrigin);
			$('#goods_specifications').val(data.data.specifications);
			$('#goods_qrcode').val(data.data.qrCode);
			data_qrcode = data.data.qrCode;
			// console.log(data.data.qrCode);	
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

function updateSubmit(){
	var visible_radio;
	if ($('#goods_visible1').prop("checked")){
		visible_radio = 1;
	}
	if($('#goods_visible2').prop("checked")){
		visible_radio = 0;
	}
	// var update_data = '{"goodsOrigin":"'+ $('#goods_origin').val() +'","specifications":"'+ $('#goods_specifications').val() +'","marketPrice":' + parseFloat($('#goods_marketprice').val()) + ',"shopId":"' + $('#goods_shopid').val() +'","goodsNo":"' + $('#goods_No').val() + '","goodsName":"' + $('#goods_name').html() + '","unit":"' + $('#goods_unit').val() + '","salesPrice":' + parseFloat($('#goods_salesprice').val()) + ',"propmPrice":' + parseFloat($('#goods_propmprice').val()) + ',"qrCode":"' + $('#goods_qrcode').val() + '","visible":' + parseInt(visible_radio) + ',"id":' + parseInt(data_id) + ',"type":' + parseInt($('#goods_type').val()) + '}';
	var update_data = '{"goodsName":"asdasdasd2222222","goodsOrigin":"11","specifications":"11","marketPrice":0.0,"shopId":"1","goodsNo":"123123","unit":"11","salesPrice":0.0,"propmPrice":0.0,"qrCode":"aaaa","visible":0,"id":3,"type":0}';
	console.log(update_data);

	$.ajax({
		type : 'PATCH',
		url : 'http://127.0.0.1:8080/pricetaginfo/pricetags/'+data_id,
		contentType : 'application/json',
		data : update_data,
		crossDomain : true,
		success : function() {
			console.log("successed！");
		},
		error : function() {
			alert('error');
		}
	});
}