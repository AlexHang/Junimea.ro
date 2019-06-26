

function LogIn(){
    $.post('https://proiectexemplu.000webhostapp.com/Junimea/Back-End/LogIn.php', $('#login-nav').serialize(), function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}


		
		
		var FileArray=[];
		var displayImg=document.getElementById("UploadPreview");
		
		function addFilesToArray(){
			//window.alert("addFilesToArray");
			var files  = document.getElementById('fileupload').files;
			//var preview = document.getElementById('image');
			//displayImg.innerHTML="";
		
		console.log(files.length);
			for(var i=0;i<files.length;i++)
				previewFile(files[i]);
		}
		
		
		//var imgSrc  = document.getElementById("imgSrc"); 
		// var canvas = document.getElementById("canvas");
		function previewFile(file) {
		
			//window.alert("previewFile");
			
			var reader  = new FileReader();
			
			//var percentage = 0.5;
            reader.addEventListener("load", function () {
			
			
				
				
				var preview=new Image();
                preview.src = reader.result;
				
				displayImg.innerHTML+='<div class="col-md-4">'+
											'<img src="'+reader.result+'" class="grid-preview-img">'+
										'</div>';
				
				
				//FileArray.push(reader.result);
				//$("#imgSrc").val(reader.result)
				//FileArray.push(canvas.toDataURL());
                preview.onload = function () {
                   
					var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");
                    canvas.height = canvas.width * (preview.height / preview.width);
                    var oc = document.createElement('canvas'),octx = oc.getContext('2d');
                   // oc.width = preview.width * percentage;
                   // oc.height = preview.height * percentage;
					oc.width = 640;
                    oc.height = oc.width*(preview.height / preview.width);
                   // canvas.width = oc.width;
                   // canvas.height = oc.height;
				   canvas.width = 640;
                    canvas.height = canvas.width*(preview.height / preview.width);
                    octx.drawImage(preview, 0, 0, oc.width, oc.height);
                    octx.drawImage(oc, 0, 0, oc.width, oc.height);
                    ctx.drawImage(oc, 0, 0, oc.width, oc.height,0, 0, canvas.width, canvas.height);
					
					FileArray.push(canvas.toDataURL());
					
					
					
                }
				
				
            }, false);
		
		
			if (file) {
				reader.readAsDataURL(file);
			}
		
		
        
    }
    document.getElementById('fileupload').addEventListener('change', addFilesToArray);
	
	
	
	function dataURItoBlob(dataURI) {
		// convert base64/URLEncoded data component to raw binary data held in a string
		var byteString;
		if (dataURI.split(',')[0].indexOf('base64') >= 0)
			byteString = atob(dataURI.split(',')[1]);
		else
			byteString = unescape(dataURI.split(',')[1]);

		// separate out the mime component
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

		// write the bytes of the string to a typed array
		var ia = new Uint8Array(byteString.length);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		return new Blob([ia], {type:mimeString});
	}
	
	















function PostMeme(){
	//var formData = new FormData($('#memepost')[0]);
	
	
	$("#uploadSpinner").show();
	$("#memepost").hide();
	
	
	var title = document.getElementById("PostTitle").value;
	var description = document.getElementById("Description").value;
	
	
	var formData = new FormData();
		formData.append('PostTitle',title);
		formData.append('Description',description);
		
		for(var i=0; i<FileArray.length;i++){
			var blob = dataURItoBlob(FileArray[i]);
			formData.append('Files',blob);
			console.log(formData);
		}
		
		for (var v of formData.values()) {
		   console.log(v); 
		}
	
	//console.log(formData);
	if(connected){
			$.ajax({
				type : 'POST',
				url : "https://junimea.serveo.net/api/Post",
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
					$("#uploadSpinner").hide();
					$("#memepost").show();
				}
			}); //End of Ajax
	}
	else {
		window.alert("not connected");
	}
	
} 



