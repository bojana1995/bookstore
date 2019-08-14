$(document).ready(function() {
	//tabelarni prikaz - za update knjiga -> promeni
	$.ajax({
		url : "/book/getAll",
		type : "GET",
		contentType : "application/json",
		datatype : 'json',
		success : function(data) {
			if (data) {
				if (data.length == 0) {
					red = "<p style=\"color:orange\"><i><b>No books available.</b></i></p>";
					$("#noBooksLabel").append(red);
					$("#noBooksLabel").show();
				} else {
					red = "<p style=\"color:orange\"><i><b>Please select the book you want to update:</b></i></p>";
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
	
	//lep prikaz svih knjiga :) - ostaje
	$.ajax({
		url : "/book/getAll",
		type : "GET",
		contentType : "application/json",
		datatype : 'json',
		success : function(data) {
			if (data) {
				if (data.length == 0) {
					red = "<p style=\"color:orange\"><i><b>There are currently no products available.</b></i></p>";
					$("#noBooksForBuyingLabel").append(red);
					$("#noBooksForBuyingLabel").show();
				} else {
					red = "<p style=\"color:orange\"><i><b>Available products:</b></i></p>";
					$("#noBooksForBuyingLabel").append(red);
					$("#noBooksForBuyingLabel").show();
					
					for (i = 0; i < data.length; i++) {
						//TODO: privremeno zakucano dok ne odradim upload slike na server
						data[i].image = "images/img2.jpg";
						
						htmlRow = "<div class=\"col-lg-3 col-md-6\"><div class=\"item\"><img src=" + data[i].image + " width=\"90px\" height=\"150px\" alt=\"img\"><h3><a href=\"javascript:details(" + data[i].id + ")\"><strong>" + data[i].title + "</strong></a></h3><h6><span class=\"price\">" + data[i].price + " RSD</span></h6></div><div style=\"padding-bottom: 30px\"></div></div>";
						$("#bookItems").append(htmlRow);
					}
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
				swal({
				     title: "",
				     text: "Successfully adding a new book.",
				     icon: "success",
				     timer: 2000,
				     buttons: false
				});
			} else {
				swal({
					  title: "",
					  text: "Failed to add book!",
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
				swal({
				     title: "",
				     text: "Successfully updating a book.",
				     icon: "success",
				     timer: 2000,
				     buttons: false
				});
			}else{
				swal({
					  title: "",
					  text: "Failed to update book!",
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
					swal({
					     title: "",
					     text: "Successfully deleting a book.",
					     icon: "success",
					     timer: 2000,
					     buttons: false
					});
				}else{
					swal({
						  title: "",
						  text: "Failed to delete book!",
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
				
				modalBookDetailHTML = "<div class=\"modal-dialog modal-lg modal-dialog-centered\" role=\"document\"><div class=\"modal-content\"><div class=\"modal-header\"><h5 class=\"modal-title\">" + data.title + "</h5><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div><div class=\"modal-body\"><div class=\"container\"><div class=\"row\"><div><div id=\"myCarousel\" class=\"carousel slide\"><div class=\"carousel-inner\"><div class=\"active item carousel-item\" data-slide-number=\"0\"><img src=\"images/product1.jpg\" style=\"width:235px; height:390px\"></div><div class=\"item carousel-item\" data-slide-number=\"1\"><img src=\"images/product2.jpg\" style=\"width:235px; height:390px\"></div><div class=\"item carousel-item\" data-slide-number=\"2\"><img src=\"images/product3.jpg\" style=\"width:235px; height:390px\"></div><ul class=\"carousel-indicators list-inline\"><li class=\"list-inline-item active\"><a id=\"carousel-selector-0\" class=\"selected\" data-slide-to=\"0\" data-target=\"#myCarousel\"><img src=\"images/product1.jpg\" style=\"width:100px; height:130px\"></a></li><li class=\"list-inline-item\"><a id=\"carousel-selector-1\" data-slide-to=\"1\" data-target=\"#myCarousel\"><img src=\"images/product2.jpg\" style=\"width:100px; height:130px\"></a></li><li class=\"list-inline-item\"><a id=\"carousel-selector-2\" data-slide-to=\"2\" data-target=\"#myCarousel\"><img src=\"images/product3.jpg\" style=\"width:100px; height:130px\"></a></li></ul></div></div></div><div class=\"col-md-2 col-md-3 col-md-4 col-md-2\"><p><h6>" + data.author + "</h6></p><p><h6>" + data.publisher + ", " + data.publishingYear + "</h6></p><br><p><h6><i>" + data.description + "</i></h6></p><br><p><span class=\"name\">Price</span><span class=\"clm\">: </span><span style=\"color:red\"><b>" + data.price + " RSD</b></span></p></div></div></div></div></div></div></div>";
				$("#bookDetails").append(modalBookDetailHTML);
				$("#bookDetails").modal();
			}else{
				swal({
					  title: "",
					  text: "Failed to show details about book!",
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


//nema Buy now dugme
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
					red = "<p style=\"color:orange\"><i><b>No search results.</b></i></p>";
					$("#noBooksForBuyingLabel").append(red);
					$("#noBooksForBuyingLabel").show();
				} else {
					red = "<p style=\"color:orange\"><i><b>Search results:</b></i></p>";
					$("#noBooksForBuyingLabel").append(red);
					$("#noBooksForBuyingLabel").show();
					
					for (i = 0; i < data.length; i++) {
						//TODO: privremeno zakucano dok ne odradim upload slike na server
						data[i].image = "images/img2.jpg";
						
						htmlRow = "<div class=\"col-lg-3 col-md-6\"><div class=\"item\"><img src=" + data[i].image + " width=\"90px\" height=\"150px\" alt=\"img\"><h3><a href=\"javascript:details(" + data[i].id + ")\"><strong>" + data[i].title + "</strong></a></h3><h6><span class=\"price\">" + data[i].price + " RSD</span></h6></div><div style=\"padding-bottom: 30px\"></div></div>";
						$("#bookItems").append(htmlRow);
					}
				}
			} else{
				swal({
					  title: "",
					  text: "Error when trying to display books with a given title and/or author!",
					  icon: "error",
					  timer: 2000,
					  buttons: false
				});
			}
		},
		error: function(data){
			alert(data)
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



//TODO: upload image to server (admin)
//TODO: check password - login (MyUserController)


