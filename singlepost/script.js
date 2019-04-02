function LogIn(){
    $.post('https://proiectexemplu.000webhostapp.com/Junimea/Back-End/LogIn.php', $('#login-nav').serialize(), function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}


function postComment(){
	document.getElementById("PostId").value=myParam;
	//var formData = new FormData($('#commentForm'));
	//var formData = $('#commentForm').serialize();
	var form = document.getElementById('commentForm');
	var formData = new FormData(form);
	//var formData = form.serialize();
	console.log(formData);
	if(connected){
			$.ajax({
				type : 'POST',
				
				url : "  https://junimea.serveo.net/api/Comments",
				//Add the request header
				headers : {
					Authorization : 'Bearer ' + localStorage.getItem("token")
				},
				//contentType : 'multipart/form-data ',
				contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
				processData: false, // NEEDED, DON'T OMIT THIS
				//Add form data
				data : formData,
				success : function(response) {
					console.log(response);
					window.alert("Uploaded Successfully");
					location.reload();
				},
				error : function(xhr, status, error) {
					//var err = eval("(" + xhr.responseText + ")");
					console.log(xhr.responseText);   
					
				}
			}); //End of Ajax
	}
	else {
		window.alert("not connected");
	}
	
} 