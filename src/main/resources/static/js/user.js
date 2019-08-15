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
		phone:$("#updateAccountForm [name='phoneUpdate']").val(),
		password:$("#updateAccountForm [name='passwordUpdate']").val()
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
								
				$('#modalUpdateUser').modal('toggle');
				window.setTimeout(function(){location.reload();},1500);
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



function changePassword() {
	var check = true;
	var forma = $('form[id="changePasswordForm"]');
	var password = forma.find('[name=passwordUpdate]').val();
	var password2 = forma.find('[name=passwordUpdate2]').val();
	
	var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{10,30}/;
	if(password.length > 30 || password.length < 10 || !isNaN(password) || (!passwordRegex.test(password))
	|| password == "123456" || password == "password" || password == "12345678" || password == "qwerty" || password == "12345" || 
	password == "123456789" || password == "letmein" || password == "1234567" || password == "football" || password == "iloveyou" || 
	password == "admin" || password == "welcome" || password == "monkey" || password == "login" || password == "abc123" || 
	password == "starwars" || password == "123123" || password == "dragon" || password == "passw0rd" || password == "master" || 
	password == "hello" || password == "freedom" || password == "whatever" || password == "qazwsx" || password == "trustno1" || 
	password == "123456789@Bs"){
	 	$('#divValidationChangePassword').empty();
		$('#divValidationChangePassword').append('<p style="color:red"><b>The password you entered should not be on the list of commonly used passwords.</b></p>');
		check = false;
	}
	if(password2.length > 30 || password2.length < 10 || !isNaN(password2) || (!passwordRegex.test(password2))
	|| password2 == "123456" || password2 == "password" || password2 == "12345678" || password2 == "qwerty" || password2 == "12345" || 
	password2 == "123456789" || password2 == "letmein" || password2 == "1234567" || password2 == "football" || password2 == "iloveyou" || 
	password2 == "admin" || password2 == "welcome" || password2 == "monkey" || password2 == "login" || password2 == "abc123" || 
	password2 == "starwars" || password2 == "123123" || password2 == "dragon" || password2 == "passw0rd" || password2 == "master" || 
	password2 == "hello" || password2 == "freedom" || password2 == "whatever" || password2 == "qazwsx" || password2 == "trustno1" || 
	password2 == "123456789@Bs"){
		$('#divValidationChangePassword').empty();
		$('#divValidationChangePassword').append('<p style="color:red"><b>The password you entered should not be on the list of commonly used passwords.</b></p>');
		check = false;
	}
	if(password != password2) {
		$('#divValidationChangePassword').empty();
		$('#divValidationChangePassword').append('<p style="color:red"><b>The password must be the same in both fields.</b></p>');
		check = false;
	}
	
	formData = JSON.stringify({
		password:$("#changePasswordForm [name='passwordUpdate']").val()
	});
	
	if(check) {
		$('#divValidationChangePassword').empty();
		
		$.ajax({
			url: "/myUser/changePassword",
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
					     text: "Your password was successfully changed!",
					     icon: "success",
					     timer: 2000,
					     buttons: false
					});
					
					$('#modalUpdateUser').modal('toggle');
				}else{
					swal({
						  title: "",
						  text: "Failed to change password!",
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



