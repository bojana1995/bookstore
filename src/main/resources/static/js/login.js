function login(){
	var forma = $('form[id="loginForm"]');
	var email = forma.find('[name=email]').val();
	var password = forma.find('[name=password]').val();
			
	formData = JSON.stringify({
		email:$("#loginForm [name='email']").val(),
		password:$("#loginForm [name='password']").val()
	});
			
	$.ajax({
		url: "/myUser/login",
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
				if(data.userType == "ADMIN")
					location.href = "/home-page-admin.html"
				else
					location.href = "/home-page-visitor.html"	
			}else{
				alert("Failed to login.");
				location.href = "/login.html"
			}
		},
		error: function(data){
			alert('ERROR!!!\n\n1. invalid request or\n2. there is no user with the email and password entered in the database');
			location.href = "/login.html"
		}
	});
}