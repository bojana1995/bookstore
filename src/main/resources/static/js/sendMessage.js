function sendMessage() {
	var forma = $('form[id="sendMessageForm"]');
	var nameAndSurname = forma.find('[name=nameAndSurname]').val();
	var email = forma.find('[name=email]').val();
	var message = forma.find('[name=message]').val();
			
	formData = JSON.stringify({
		sendersNameAndSurname:$("#sendMessageForm [name='nameAndSurname']").val(),
		sendersEmail:$("#sendMessageForm [name='email']").val(),
		textMessage:$("#sendMessageForm [name='message']").val()
	});
			
	$.ajax({
		url: "/message/send",
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
				alert("Failed to send message.");
			}
		},
		error: function(data){
			alert('ERROR!!!');
		}
	});
}


