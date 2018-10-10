function LogIn(){
    $.post('https://proiectexemplu.000webhostapp.com/Junimea/Back-End/LogIn.php', $('#login-nav').serialize(), function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}


function PostMeme(){
	var formData = new FormData($('#memepost')[0]);
	console.log(formData);
	if(connected){
			$.ajax({
				type : 'POST',
				
				url : "http://localhost:5000/api/Post",
				//Add the request header
				headers : {
					Authorization : 'Bearer ' + localStorage.getItem("token")
				},
				//contentType : 'application/x-www-form-urlencoded',
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
					var err = eval("(" + xhr.responseText + ")");
					console.log(err);   
					
				}
			}); //End of Ajax
	}
	else {
		window.alert("not connected");
	}
	
} 