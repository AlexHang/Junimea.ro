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
			$scope.likepost= function(postid, value, $event){
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
				    url: "https://junimea.serveo.net/api/Comments/UpdateComment",
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
				    url: "https://junimea.serveo.net/api/Comments/DeleteComment",
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
				    url: "https://junimea.serveo.net/api/Comments",
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
				    url: "https://junimea.serveo.net/api/PostGetters/GetPostById",
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
				    url: "https://junimea.serveo.net/api/profile/me",
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
					/*
					$scope.connected = connected;
					$scope.UserName = "Alex Hang";
					$scope.UserPic = "https://pbs.twimg.com/profile_images/854356462604353538/a4OGfq--_400x400.jpg";
					$scope.userID = 1;
					*/
    		//});

			// $http.get("customers.php")
    		//.then(function (response) {$scope.names = response.data.records;});
    		/*
		    $scope.post = {
		    		"id":15,
		    		"userId":"81ffb9db-c796-41ca-b008-011533c38eb4",
		    		"postTtile":"meme1",
		    		"description":"123456",
		    		"likes":0,
		    		"files":[{"id":11,"postId":15,"url":"C:\\Users\\dell\\Desktop\\VueASPNETCore2WebApiAuth\\backend\\AuthWebApi\\images\\27749978_405365276596338_2596750171110535689_n_8f23.jpg"}],
		    		"createdDate":"2018-09-18T15:21:55.7666667"
		    	}; 
*/
		  /*  $scope.user = {
		    		"Nume":"Alex Hang",
		    		"User-img":"https://www.bspmediagroup.com/event/img/logos/user_placeholder.png",
		    };

		    $scope.comments = [

		    		{
		    			"User":"Alex Hang",
		    			"UserPic":"https://pbs.twimg.com/profile_images/854356462604353538/a4OGfq--_400x400.jpg",
		    			"Comentariu":"hello I really like this awesome post",
		    		},
		    		{
		    			"User":"Alex Hang",
		    			"UserPic":"https://pbs.twimg.com/profile_images/854356462604353538/a4OGfq--_400x400.jpg",
		    			"Comentariu":"hello I really like this awesome post",
		    		},
		    		{
		    			"User":"Alex Hang",
		    			"UserPic":"https://pbs.twimg.com/profile_images/854356462604353538/a4OGfq--_400x400.jpg",
		    			"Comentariu":"hello I really like this awesome post",
		    		},

		    ];
	*/		


		});