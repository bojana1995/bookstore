function shoppingCartContent() {
	$.ajax({
		url: "/myUser/getCurrentlyActive",
		type: "GET"
	}).then(function(currentlyActive){
		idCurrentlyActive = currentlyActive.id;
		
		$.ajax({
			url: "/book/" + idCurrentlyActive + "/booksInMyShoppingCart",
			type: "GET",
			contentType: "application/json",
			datatype: 'json',
			crossDomain: true,
		    headers: {  'Access-Control-Allow-Origin': '*' },
			xhrFields: {
				withCredentials: true
			},
			success: function(data){
				if (data) {
					if (data.length == 0) {
						//red = "<p style=\"color:orange\"><i><b>Shopping cart is empty.</b></i></p>";
						//$("#labelShoppingCartContent").append(red);
					} else {
						//red = "<p style=\"color:orange\"><i><b>Products ordered:</b></i></p>";
						//$("#labelShoppingCartContent").append(red);
						
						for (i = 0; i < data.length; i++) {
							
						}
					}
				} else{
					swal({
						  title: "",
						  text: "Error trying to display shopping cart content!",
						  icon: "error",
						  timer: 2000,
						  buttons: false
					});
				}
			},
			error: function(data){
				swal({
					  title: "",
					  text: "ERROR!!!",
					  icon: "error",
					  timer: 2000,
					  buttons: false
				});
			}
		});	
	});
}




function payOrder() {
	$("#modalPaymentType").modal();
	
	$("#btnPayPal").click(function(){
		swal({
			title: "",
			text: "You will be redirected to a PayPal payment page.",
			icon: "success",
			timer: 2000,
			buttons: false
		}).then(() => {
			location.href = "https://developer.paypal.com/developer/accounts/"
		});
	});
	
	$("#btnBitcoin").click(function(){
		swal({
			title: "",
			text: "You will be redirected to a Bitcoin payment page.",
			icon: "success",
			timer: 2000,
			buttons: false
		}).then(() => {
			location.href = "https://sandbox.coingate.com/"
		});
	});
}



