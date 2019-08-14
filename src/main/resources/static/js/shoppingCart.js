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
					$("#shoppingCartContentLabel").empty();
					$("#shoppingCartContentTable").empty();
					
					if (data.length == 0) {
						red = "Shopping cart is empty.";
						$("#shoppingCartContentLabel").append(red);
						$("#shoppingCartContentLabel").show();
					} else {
						red = "Products ordered:";
						$("#shoppingCartContentLabel").append(red);
						$("#shoppingCartContentLabel").show();
						$("#shoppingCartContentTable").append("<thead><tr><th scope=\"col\" class=\"text-center\"><i>Title</i></th><th scope=\"col\" class=\"text-center\"><i>Author</i></th><th scope=\"col\" class=\"text-center\"><i>Description</i></th><th scope=\"col\" class=\"text-center\"><i>Publishing year</i></th><th scope=\"col\" class=\"text-center\"><i>Publisher</i></th><th scope=\"col\" class=\"text-center\"><i>Price</i></th></tr></thead><tbody>");
						
						for (i = 0; i < data.length; i++) {
							noviRed = "<tr><td>" + data[i].title
									+ "</td><td>" + data[i].author
									+ "</td><td>" + data[i].description
									+ "</td><td>" + data[i].publishingYear
									+ "</td><td>" + data[i].publisher
									+ "</td><td>" + data[i].price
							$("#shoppingCartContentTable").append(noviRed);
						}
						
						$("#shoppingCartContentTable").append("</tbody>");
						
						btnPayOrder = "<a href=\"#\" onclick=\"payOrder();return false;\"><button class=\"btn yellow\" style=\"float:right\">Pay order</button></a>";
						$("#divPayOrder").append(btnPayOrder);
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



