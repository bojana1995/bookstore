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
					red = "No visitors available.";
					$("#noVisitorsLabel").append(red);
					$("#noVisitorsLabel").show();
				} else {
					red = "Please select visitor you want to delete:";
					$("#noVisitorsLabel").append(red);
					$("#noVisitorsLabel").show();
					$("#visitorsTable").append("<thead><tr><th scope=\"col\" class=\"text-center\">Name</th><th scope=\"col\" class=\"text-center\">Surname</th><th scope=\"col\" class=\"text-center\">Address</th><th scope=\"col\" class=\"text-center\">Phone</th><th scope=\"col\" class=\"text-center\"></th></tr></thead><tbody>");

					for (i = 0; i < data.length; i++) {
						noviRed = "<tr><td>" + data[i].name
								+ "</td><td>" + data[i].surname
								+ "</td><td>" + data[i].address
								+ "</td><td>" + data[i].phone
								+ "</td><td>" + "<input id=\"btnDeleteVisitor\" type=\"button\" class=\"btn yellow\" value=\"Delete\" onclick =\"deleteVisitorModal(" + data[i].id + ")\">"
						$("#visitorsTable").append(noviRed);
					}
					
					$("#visitorsTable").append("</tbody>");
				}
			} else{
				alert("Error trying to display the list of visitors.");
			}
		},
		error : function(data) {
			alert('ERROR!!!');
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
				location.reload();
			}else{
				alert("Failed to update user account.");
			}
		},
		error: function(data){
			alert('ERROR!!!');
		}
	});
}



function deleteVisitorModal(id){
	$("#deleteVisitorModal").modal();
	
	$("#btnYesVisitor").click(function(){
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
					location.reload();
				}else{
					alert("Failed to delete user.");
				}
			},
			error: function(data){
				alert('ERROR!!!');
			}
		});	
	});
}



