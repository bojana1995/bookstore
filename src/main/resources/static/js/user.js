$(document).ready(function() {
	$.ajax({
		url: "/myUser/getCurrentlyActive",
		type: "GET"
	}).then(function(data){
		$('#nameUpdateAccount').val(data.name);
		$('#surnameUpdateAccount').val(data.surname);
		$('#addressUpdateAccount').val(data.address);
		$('#phoneUpdateAccount').val(data.phone);
		
		$('#currentlyActive').append(data.name + " " + data.surname);
	});
	
	$.ajax({
		url : "/myUser/getAllVisitors",
		type : "GET",
		contentType : "application/json",
		datatype : 'json',
		success : function(data) {
			if (data) {
				if (data.length == 0) {
					$("#visitorsLabel").empty();
					$("#visitorsTable").empty();
					
					red = "No registered visitors available.";
					$("#visitorsLabel").append(red);
					
				} else {
					$("#visitorsLabel").empty();
					$("#visitorsTable").empty();
					
					$("#visitorsTable").append("<thead><tr><th scope=\"col\" class=\"text-center\">Name</th><th scope=\"col\" class=\"text-center\">Surname</th><th scope=\"col\" class=\"text-center\"></th></tr></thead><tbody>");

					for (i = 0; i < data.length; i++) {
						noviRed = "<tr><td>" + data[i].name
								+ "</td><td>" + data[i].surname
								+ "</td><td>" + "<input id=\"btnDeleteVisitor\" type=\"button\" class=\"btn yellow\" value=\"Delete\" onclick =\"deleteVisitor(" + data[i].id + ")\">"
						$("#visitorsTable").append(noviRed);
					}
					
					$("#visitorsTable").append("</tbody>");
				}
			} else{
				swal({
					  title: "",
					  text: "Error trying to display the list of visitors!",
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




function updateAccount() {		
	var forma = $('form[id="updateAccountForm"]');
	var name = forma.find('[name=nameUpdate]').val();
	var surname = forma.find('[name=surnameUpdate]').val();
	var address = forma.find('[name=addressUpdate]').val();
	var phone = forma.find('[name=phoneUpdate]').val();
	
	formData = JSON.stringify({
		name:$("#updateAccountForm [name='nameUpdate']").val(),
		surname:$("#updateAccountForm [name='surnameUpdate']").val(),
		address:$("#updateAccountForm [name='addressUpdate']").val(),
		phone:$("#updateAccountForm [name='phoneUpdate']").val()
	});
	
	$.ajax({
		url: "/myUser/update",
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
				     text: "Your account was successfully updated!",
				     icon: "success",
				     timer: 2000,
				     buttons: false
				});
			}else{
				swal({
					  title: "",
					  text: "Failed to update your account!",
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



function deleteVisitor(id){
	$.ajax({
		url: "/myUser/delete/" + id,
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
				     text: "User successfully deleted.",
				     icon: "success",
				     timer: 2000,
				     buttons: false
				}).then(() => {
					location.reload();
				});
			}else{
				swal({
					  title: "",
					  text: "Failed to delete user!",
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



