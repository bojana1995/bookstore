$(document).ready(function() {
	$.ajax({
		url : "/book/getAll",
		type : "GET",
		contentType : "application/json",
		datatype : 'json',
		success : function(data) {
			if (data) {
				if (data.length == 0) {
					red = "No books available.";
					$("#noBooksLabel").append(red);
					$("#noBooksLabel").show();
				} else {
					red = "Please select the book you want to update:";
					$("#noBooksLabel").append(red);
					$("#noBooksLabel").show();
					$("#booksTable").append("<thead><tr><th scope=\"col\" class=\"text-center\"><i>Title</i></th><th scope=\"col\" class=\"text-center\"><i>Author</i></th><th scope=\"col\" class=\"text-center\"><i>Description</i></th><th scope=\"col\" class=\"text-center\"><i>Publishing year</i></th><th scope=\"col\" class=\"text-center\"><i>Publisher</i></th><th scope=\"col\" class=\"text-center\"><i>Price</i></th><th scope=\"col\" class=\"text-center\"></th><th scope=\"col\" class=\"text-center\"></th></tr></thead><tbody>");

					for (i = 0; i < data.length; i++) {
						noviRed = "<tr><td>" + data[i].title
								+ "</td><td>" + data[i].author
								+ "</td><td>" + data[i].description
								+ "</td><td>" + data[i].publishingYear
								+ "</td><td>" + data[i].publisher
								+ "</td><td>" + data[i].price
								+ "</td><td>" + "<input id=\"btnSelect\" type=\"button\" class=\"btn black\" value=\"Select\" onclick =\"showUpdateForm(" + data[i].id + ")\">"
								+ "</td><td>" + "<input id=\"btnDelete\" type=\"button\" class=\"btn yellow\" value=\"Delete\" onclick =\"deleteModal(" + data[i].id + ")\">"
						$("#booksTable").append(noviRed);
					}
					
					$("#booksTable").append("</tbody>");
				}
			} else{
				alert("Error trying to display the list of available books.");
			}
		},
		error : function(data) {
			alert('ERROR!!!');
		}
	});
	
	$.ajax({
		url : "/book/getAll",
		type : "GET",
		contentType : "application/json",
		datatype : 'json',
		success : function(data) {
			if (data) {
				if (data.length == 0) {
					red = "There is no book you can buy.";
					$("#noBooksForBuyingLabel").append(red);
					$("#noBooksForBuyingLabel").show();
				} else {
					red = "Please select the book you want to buy:";
					$("#noBooksForBuyingLabel").append(red);
					$("#noBooksForBuyingLabel").show();
					
					for (i = 0; i < data.length; i++) {
						//TODO: privremeno zakucano dok ne odradim upload slike na server
						data[i].image = "images/img2.jpg";
						
						htmlRow = "<div class=\"col-lg-3 col-md-6\"><div class=\"item\"><img src=" + data[i].image + " width=\"90px\" height=\"150px\" alt=\"img\"><h3><a href=\"javascript:details(" + data[i].id + ")\"><strong>" + data[i].title + "</strong></a></h3><h6><span class=\"price\">" + data[i].price + " RSD</span> / <a href=\"javascript:buyBook(" + data[i].id + ")\">Buy Now</a></h6></div><div style=\"padding-bottom: 30px\"></div></div>";
						$("#bookItems").append(htmlRow);
					}
				}
			} else{
				alert("Error trying to display the list of available books.");
			}
		},
		error : function(data) {
			alert('ERROR!!!');
		}
	});
});



function add() {
	var forma = $('form[id="addBookForm"]');
	var title = forma.find('[name=title]').val();
	var author = forma.find('[name=author]').val();
	var description = forma.find('[name=description]').val();
	var publishingYear = forma.find('[name=publishingYear]').val();
	var publisher = forma.find('[name=publisher]').val();
	var price = forma.find('[name=price]').val();
			
	formData = JSON.stringify({
		title:$("#addBookForm [name='title']").val(),
		author:$("#addBookForm [name='author']").val(),
		description:$("#addBookForm [name='description']").val(),
		publishingYear:$("#addBookForm [name='publishingYear']").val(),
		publisher:$("#addBookForm [name='publisher']").val(),
		price:$("#addBookForm [name='price']").val()
	});
			
	$.ajax({
		url: "/book/add",
		type: "POST",
		data: formData,
		contentType: "application/json",
		datatype: 'json',
		crossDomain: true,
	    headers: {  'Access-Control-Allow-Origin': '*' },
		xhrFields: {
			withCredentials: true
		},
		success: function(data){
			if(data){
				location.reload();
			}else{
				alert("Failed to add book.");
			}
		},
		error: function(data){
			alert('ERROR!!!');
		}
	});
}
	


function showUpdateForm(id) {
	$("#divUpdateBookForm").empty();
	
	form = "<form action=\"javascript:update(" + id + ")\" id=\"updateBookForm\" method=\"POST\"><div class=\"row\"><div class=\"col-md-5\"><input type=\"text\" id=\"titleUpdate\" name=\"titleU\" placeholder=\"title\" required><span class=\"required-star\">*</span></div><div class=\"col-md-5\"><input type=\"text\" id=\"authorUpdate\" name=\"authorU\" placeholder=\"author\" required><span class=\"required-star\">*</span></div><div class=\"col-md-5\"><input type=\"text\" id=\"descriptionUpdate\" name=\"descriptionU\" placeholder=\"description\" required><span class=\"required-star\">*</span></div><div class=\"col-md-5\"><input type=\"number\" id=\"publishingYearUpdate\" name=\"publishingYearU\" placeholder=\"publishing year\" required><span class=\"required-star\">*</span></div><div class=\"col-md-5\"><input type=\"text\" id=\"publisherUpdate\" name=\"publisherU\" placeholder=\"publisher\" required><span class=\"required-star\">*</span></div><div class=\"col-md-5\"><input type=\"number\" id=\"priceUpdate\" name=\"priceU\" placeholder=\"price\" required><span class=\"required-star\">*</span></div><div class=\"col-md-11\" id=\"divValidationUpdate\"></div><div class=\"col-lg-8 col-md-12\"><button class=\"btn black\" id=\"btnUpdate\" type=\"submit\">Update</button></div></div></form>";
	$("#divUpdateBookForm").append(form);

	$.ajax({
		url: "/book/" + id,
		type: "GET"
	}).then(function(data){
		$('#titleUpdate').val(data.title);
		$('#authorUpdate').val(data.author);
		$('#descriptionUpdate').val(data.description);
		$('#publishingYearUpdate').val(data.publishingYear);
		$('#publisherUpdate').val(data.publisher);
		$('#priceUpdate').val(data.price);
	});
}



function update(id) {
	var forma = $('form[id="updateBookForm"]');
	var title = forma.find('[name=titleU]').val();
	var author = forma.find('[name=authorU]').val();
	var description = forma.find('[name=descriptionU]').val();
	var publishingYear = forma.find('[name=publishingYearU]').val();
	var publisher = forma.find('[name=publisherU]').val();
	var price = forma.find('[name=priceU]').val();
			
	formData = JSON.stringify({
		title:$("#updateBookForm [name='titleU']").val(),
		author:$("#updateBookForm [name='authorU']").val(),
		description:$("#updateBookForm [name='descriptionU']").val(),
		publishingYear:$("#updateBookForm [name='publishingYearU']").val(),
		publisher:$("#updateBookForm [name='publisherU']").val(),
		price:$("#updateBookForm [name='priceU']").val()
	});
			
	$.ajax({
		url: "/book/update/" + id,
		type: "PUT",
		data: formData,
		contentType: "application/json",
		datatype: 'json',
		crossDomain: true,
	    headers: {  'Access-Control-Allow-Origin': '*' },
		xhrFields: {
			withCredentials: true
		},
		success: function(data){
			if(data){
				location.reload();
			}else{
				alert("Failed to update book.");
			}
		},
		error: function(data){
			alert('ERROR!!!');
		}
	});
}



function deleteModal(id) {
	$("#deleteBookModal").modal();
		
	$("#btnYes").click(function(){
		$.ajax({
			url: "/book/delete/" + id,
			type: "DELETE",
			contentType: "application/json",
			datatype: 'json',
			crossDomain: true,
		    headers: {  'Access-Control-Allow-Origin': '*' },
			xhrFields: {
				withCredentials: true
			},
			success: function(data){
				if(data){
					location.reload();
				}else{
					alert("Failed to delete book.");
				}
			},
			error: function(data){
				alert('ERROR!!!');
			}
		});	
	});
}




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
				location.reload();
			}else{
				alert("Failed to buy book.");
			}
		},
		error: function(data){
			alert('ERROR!!!');
		}
	});	
}



function details(id) {
	$("#panelBookDetails").empty();
	
	$.ajax({
		url: "/book/" + id,
		type: "GET",
		contentType: "application/json",
		datatype: 'json',
		success: function(data){
			if(data){
				//TODO: dodati image atribut u Book i odraditi upload slike na server
				//prikazati data.image umesto product1.jpg
				
				row = "<div style=\"padding-bottom:15px\" class=\"headline-wrapper\"><h4 class=\"title\"><a class=\"panel-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseOne123\" aria-expanded=\"true\"><i>book details</i><i class=\"icon fa fa-angle-up\" aria-hidden=\"true\"></i></a></h4></div><div id=\"collapseOne123\" class=\"collapse\" aria-expanded=\"true\"><div class=\"content\"><div class=\"panel-group\" id=\"citystore-content-0\"><div class=\"panel\"><div class=\"panel-inner\"><section class=\"product-sec\"><div class=\"container\"><div class=\"row\"><div class=\"col-md-6 slider-sec\"><div id=\"myCarousel\" class=\"carousel slide\"><div class=\"carousel-inner\"><div class=\"active item carousel-item\" data-slide-number=\"0\"><img width=\"330px\" height=\"700px\" src=\"images/product1.jpg\" class=\"img-fluid\"></div><div class=\"item carousel-item\" data-slide-number=\"1\"><img width=\"330px\" height=\"700px\" src=\"images/product2.jpg\" class=\"img-fluid\"></div><div class=\"item carousel-item\" data-slide-number=\"2\"><img width=\"330px\" height=\"700px\" src=\"images/product3.jpg\" class=\"img-fluid\"></div></div><ul class=\"carousel-indicators list-inline\"><li class=\"list-inline-item active\"><a id=\"carousel-selector-0\" class=\"selected\" data-slide-to=\"0\" data-target=\"#myCarousel\"><img width=\"90px\" height=\"90px\" src=\"images/product1.jpg\" class=\"img-fluid\"></a></li><li class=\"list-inline-item\"><a id=\"carousel-selector-1\" data-slide-to=\"1\" data-target=\"#myCarousel\"><img width=\"90px\" height=\"90px\" src=\"images/product2.jpg\" class=\"img-fluid\"></a></li><li class=\"list-inline-item\"><a id=\"carousel-selector-2\" data-slide-to=\"2\" data-target=\"#myCarousel\"><img width=\"90px\" height=\"90px\" src=\"images/product3.jpg\" class=\"img-fluid\"></a></li></ul></div></div><div class=\"col-md-6 slider-content\"><h1 style=\"color:orange\">" + data.title +"</h1><h6>" + data.author +"</h6><h6>" + data.publisher + ", " + data.publishingYear + "</h6><h5 style=\"color:gray\"><i>" + data.description + "</i></h5><div><p><ul><li><span class=\"name\"><b>Price</b></span><span class=\"clm\">:</span><span class=\"price final\">" + data.price + " RSD*</span></li></ul></p></div></div></div></div></section></div></div></div></div></div>";
				$("#panelBookDetails").append(row);
			}else{
				alert("Failed to show details about book.");
			}
		},
		error: function(data){
			alert('ERROR!!!');
		}
	});
}



function searchBooks() {
	var forma = $('form[id="searchForm"]');
	var title = forma.find('[name=searchTitle]').val();
	var author = forma.find('[name=searchAuthor]').val();
			
	if(title == ""){
		title = "noInput";
	}
	if(author == ""){
		author = "noInput";
	}
	
	$.ajax({
		url: "/book/search/" + title + "/" + author,
		type: "GET",
		contentType: "application/json",
		crossDomain: true,
	    headers: {  'Access-Control-Allow-Origin': '*' },
		xhrFields: {
			withCredentials: true
		},
		success: function(data){			
			$("#noBooksForBuyingLabel").empty();
			$("#bookItems").empty();
			
			if (data) {
				if (data.length == 0) {
					red = "No search result.";
					$("#noBooksForBuyingLabel").append(red);
					$("#noBooksForBuyingLabel").show();
				} else {
					red = "Search result:";
					$("#noBooksForBuyingLabel").append(red);
					$("#noBooksForBuyingLabel").show();
					
					for (i = 0; i < data.length; i++) {
						//TODO: privremeno zakucano dok ne odradim upload slike na server
						data[i].image = "images/img2.jpg";
						
						htmlRow = "<div class=\"col-lg-3 col-md-6\"><div class=\"item\"><img src=" + data[i].image + " width=\"90px\" height=\"150px\" alt=\"img\"><h3><a href=\"javascript:details(" + data[i].id + ")\"><strong>" + data[i].title + "</strong></a></h3><h6><span class=\"price\">" + data[i].price + " RSD</span> / <a href=\"javascript:buyBook(" + data[i].id + ")\">Buy Now</a></h6></div><div style=\"padding-bottom: 30px\"></div></div>";
						$("#bookItems").append(htmlRow);
					}
				}
			} else{
				alert("Error when trying to display books with a given title and/or author.");
			}
		},
		error: function(data){
			alert('ERROR!!!');
		}
	});
}



function reload() {
	location.reload();
}



//TODO: upload image to server (admin)
//TODO: check password - login (MyUserController)


