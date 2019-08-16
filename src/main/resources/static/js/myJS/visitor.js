function buyBook(id) {
	$.ajax({
		url: "/book/buy/" + id,
		type: "POST",
		contentType: "application/json",
		datatype: 'json',
		crossDomain: true,
	    headers: {  'Access-Control-Allow-Origin': '*' },
		xhrFields: {
			withCredentials: true
		},
		success: function(data){
			if(data){
				swal({
				     title: "",
				     text: "Successfully buying a book.",
				     icon: "success",
				     timer: 2000,
				     buttons: false
				});
			}else{
				swal({
					  title: "",
					  text: "Failed to buy book!",
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
}



function showModalShoppingCartContent() {
	$("#divShoppingCartContent").empty();
	modalHTML = "<div id=\"modalShoppingCartContent\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\"><div class=\"modal-dialog\" role=\"document\"><div class=\"modal-content\"><div class=\"modal-header\"><h5 class=\"modal-title\">My shopping cart</h5><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div><div class=\"modal-body\"><p id=\"knjige\"></p><label style=\"padding-left:30px; padding-top:30px\" id=\"labelTotalForPayment\">Total: </label></div><div class=\"modal-footer\"><button id=\"btnPaypal\" type=\"button\" onClick=\"javaScript:paypal();return false;\" class=\"btn orange\">PayPal</button><button type=\"button\" id=\"btnBitcoin\" onClick=\"javaScript:bitcoin();return false;\" class=\"btn black\">Bitcoin</button></div></div></div></div>";
	$("#divShoppingCartContent").append(modalHTML);
	
	$.ajax({
		url: "/myUser/getCurrentlyActive",
		type: "GET"
	}).then(function(currentlyActive){
		idCurrentlyActive = currentlyActive.id;
	
		$.ajax({
			url: "/book/" + idCurrentlyActive + "/booksInMyShoppingCart",
			type : "GET",
			contentType : "application/json",
			datatype : 'json',
			success : function(data) {
				if (data) {
					if (data.length == 0) {
						red = "<p><i><b>Your shopping cart is empty.</b></i></p>";
						$("#knjige").append(red);
						
						$("#btnPaypal").hide();
						$("#btnBitcoin").hide();
					} else {
						$("#knjige").empty();
						red = "";
						
						totalForPayment = 0;
						
						for (i = 0; i < data.length; i++) {
							red += "<div class=\"item\" style=\"padding:30px\"><img src=\"" + data[i].image + "\" width=\"90px\" height=\"150px\" alt=\"img\"><h3><strong>" + data[i].title + "</strong></h3><h6><span class=\"price\" style=\"color:red\"><b>" + data[i].price + "</b> RSD</span></h6></div><div style=\"padding-bottom: 30px\"></div><br><br><br>";						
							totalForPayment += data[i].price;
						}
						
						$("#knjige").append(red);
						$("#labelTotalForPayment").append("<h4 style=\"color:red\"><i><strong>" + totalForPayment + " RSD</strong></i></h4>");
					}
				} else {
					swal({
						  title: "",
						  text: "Error trying to display the list of available books!",
						  icon: "error",
						  timer: 2000,
						  buttons: false
					});
				}
			},
			error : function(data) {
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
			
	$("#modalShoppingCartContent").modal();
}



function paypal() {
	swal({
		title: "",
		text: "You will be redirected to a PayPal payment page.",
		icon: "success",
		timer: 2000,
		buttons: false
	}).then(() => {
		location.href = "https://developer.paypal.com/developer/accounts/"
	});
}



function bitcoin() {
	swal({
		title: "",
		text: "You will be redirected to a Bitcoin payment page.",
		icon: "success",
		timer: 2000,
		buttons: false
	}).then(() => {
		location.href = "https://sandbox.coingate.com/"
	});
}



