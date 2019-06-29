app.controller('BlogPosts', function($scope, $http,$interval) {
	
			// $http.get("customers.php")
    		//.then(function (response) {$scope.names = response.data.records;});

			
		    $scope.postari_blog = 
		    [
		    	{
		    		"titlu":"Meme from Blog 1",
		    		"Imagine":'http://via.placeholder.com/640x480'
		    	},
		    	{
		    		"titlu":"Meme from Blog 2",
		    		"Imagine":"http://via.placeholder.com/640x480"
		    	}
		    ];
		});


		

		app.controller('PostCTRL', function($scope, $http,$interval) {
			$scope.id1 = myParam;
			$scope.currentUserLikeValue=0;
			
			$scope.user_connected=connected;
			
			
			
			$scope.nextPost=function(){
				 $http({
				    url: " https://junimea.serveo.net/api/PostGetters/GetNext",
				    headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
				    method: "POST",
				   	data:  {
								 "CurrentId":myParam

							}
					}).then(function (response){
						
						console.log(response.data);
						window.location.href="../singlepost/singlepost.html?ID="+response.data.result.id;
    				});	
			}
			
			
			$scope.previousPost=function(){
				 $http({
				    url: " https://junimea.serveo.net/api/PostGetters/GetPrevious",
				    headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
				    method: "POST",
				   	data:  {
								 "CurrentId":myParam

							}
					}).then(function (response){
						
						console.log(response.data);
						window.location.href="../singlepost/singlepost.html?ID="+response.data.result.id;
    				});	
			}
			
			
			
			
			
			$scope.likepost= function(postid, value, $event){
				//console.log('likeCount');
				if(connected ==true){	
					
					$http({
						url: "https://junimea.serveo.net/api/Post/LikePost",
						method: "POST",
						data: {
							"PostId":postid,
							"Value": value
						},
						headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
						}).then(function (response){
							var class_to_give;
							if(value>0){
								class_to_give = "button_is_liked";
								document.getElementById("downVote").classList.remove("button_is_disliked");
								
								if($scope.currentUserLikeValue<=0){
									document.getElementById('likeCount').innerHTML=((document.getElementById('likeCount').innerHTML)*1) + (value*1);
									$scope.currentUserLikeValue=value;
								}else{
									document.getElementById('likeCount').innerHTML=((document.getElementById('likeCount').innerHTML)*1) - (value*1);
									$scope.currentUserLikeValue=0;
								}
								
								
							}else if(value<0){
								class_to_give = "button_is_disliked";
								document.getElementById("upVote").classList.remove("button_is_liked");
								//document.getElementById('likeCount').innerHTML=((document.getElementById('likeCount').innerHTML)*1) + (value*1);
								
								if($scope.currentUserLikeValue>=0){
									document.getElementById('likeCount').innerHTML=((document.getElementById('likeCount').innerHTML)*1) + (value*1);
									$scope.currentUserLikeValue=value;
								}else{
									document.getElementById('likeCount').innerHTML=((document.getElementById('likeCount').innerHTML)*1) - (value*1);
									$scope.currentUserLikeValue=0;
								}
							} 
							
							/*
							$event.target.style.color = "white";
							$event.target.style.background = "blue";
							*/
							if($event.target.classList.contains('glyphicon'))
							{
								$event.target.parentElement.classList.toggle(class_to_give);
							}else $event.target.classList.toggle(class_to_give);
							
							console.log(response);

						});
				}else{
					
					$('#LogInModal').modal('show');

				}
			}
			
			$scope.likecomment= function(postid, value, $event){
				$http({
				    url: " https://junimea.serveo.net/api/Comments/LikeComment",
				    method: "POST",
				   	data: {
						"PostId":postid,
						"Value": value
					},
					headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
					}).then(function (response){
						var class_to_give;
						if(value>=0)
							class_to_give = "button_is_liked";
						else class_to_give = "button_is_disliked";
						
						/*
						$event.target.style.color = "white";
						$event.target.style.background = "blue";
						*/
						if($event.target.classList.contains('glyphicon'))
						{
							$event.target.parentElement.classList.toggle(class_to_give);
						}
						$event.target.classList.toggle(class_to_give);
						
						console.log(response);

    				});
			}
			
			
			
			$scope.edit_comm=function(id,message){
					document.getElementById("edit_comm_id").value=id;
					document.getElementById("edit_message").value=message;
					
				
			}
			
			$scope.editComment=function(){
				var formData = new FormData($('#commentForm')[0]);
				console.log(formData);
				$http({
				    url: " https://junimea.serveo.net/api/Comments/UpdateComment",
				    headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
				    method: "POST",
				   	data:  {
								 formData
							}
					}).then(function (response){

						
						console.log(response.data);
						$scope.post = $scope.postare["result"];
						console.log(JSON.stringify($scope.post));


    				});
			}
			
			$scope.delete_comm = function(comm_id){
				var r = confirm("Sigur stergi comentariul");
				if (r == true) {
				   $http({
				    url: " https://junimea.serveo.net/api/Comments/DeleteComment",
				    headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
				    method: "POST",
				   	data:  {
								 "CommentId":comm_id
	
							}
					}).then(function (response){
						console.log(response.data);
						window.alert("Comentariul a fost sters");
						location.reload();
    				});	
				} else {
				  window.alert("Ai apasat Cancel");
				}
			}
			
			
			$scope.postComment=function(){
				var formData = new FormData($('#commentForm')[0]);
				console.log(formData);
				$http({
				    url: " https://junimea.serveo.net/api/Comments",
				    headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
				    method: "POST",
				   	data:  {
								 formData
							}
					}).then(function (response){

						
						console.log(response.data);
						$scope.post = $scope.postare["result"];
						console.log(JSON.stringify($scope.post));


    				});
			}
			
			 $http({
				    url: " https://junimea.serveo.net/api/PostGetters/GetPostById",
				    headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
				    method: "POST",
				   	data:  {
								 "PostId":myParam

							}
					}).then(function (response){

						$scope.postare = response.data;
						console.log($scope.postare);
						$scope.post = $scope.postare["result"];
						$scope.comments = $scope.post["comments"];
						console.log(JSON.stringify($scope.post));


    				});	


					$http({
				    url: " https://junimea.serveo.net/api/profile/me",
				    method: "GET",
				   	data: {},
					headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
					}).then(function (response){

						console.log(response);
						
						
						$scope.UserName = Username;
						$scope.UserPic = pictureURL;
						console.log($scope.UserName);
						$scope.UserID = localStorage.getItem("userID");

    				});	
					    				
					$scope.connected = connected;

					// this data will be taken from the server using sessions
					


		});