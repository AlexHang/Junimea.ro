app.controller('NewsFeed', function($scope, $http, $interval) {


			
    		$scope.see_post = function(id){
    			// location.href = "singlepost.html?"+id;
    			window.open("../singlepost/singlepost.html?ID="+id);
    		};

			$scope.edit_post = function(id){
				$http({
				    url: "https://junimea.serveo.net/api/PostGetters/GetPostById",
				    headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
				    method: "POST",
				   	data:  {
								 "PostId":id

							}
					}).then(function (response){

						$scope.postare = response.data;
						console.log($scope.postare);
						$scope.aux = $scope.postare["result"];
						//$scope.comments = $scope.post["comments"];
						//console.log(JSON.stringify($scope.post));
						document.getElementById("edit_id").value=$scope.aux['id'];
						document.getElementById("edit_title").value=$scope.aux['postTtile'];
						document.getElementById("edit_description").value=$scope.aux['description'];
    				});
			}
			
			$scope.delete_Post = function(id){
				var r = confirm("Sigur stergi postarea ????");
			if (r == true) {
			  if(connected){
						
    			 $http({
				    url: "https://junimea.serveo.net/api/Post/DeletePost",
				    method: "POST",
					headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
				   	data: {"PostId": id}
					}).then(function (response){
						
						$scope.feed = response.data;
						location.reload();
    				}); //End of Ajax
				}
				else {
					window.alert("not connected");
				}
			} else {
			  window.alert("You pressed Cancel!");
			}
			}
			
    		$scope.init = function(){
				console.log(curentdate());
    			 $http({
				    url: "https://junimea.serveo.net/api/PostGetters/GetAllUserPosts",
				    method: "POST",
					headers:{'Content-Type':'application/json'},
				   	data: {"UserId":localStorage.getItem("userID") ,
							"StartDate":curentdate()}
					}).then(function (response){
						
						$scope.feed = response.data;
						
    				});	

    		};
			
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
						/*
						$event.target.style.color = "white";
						$event.target.style.background = "blue";
						*/
						if($event.target.classList.contains('glyphicon'))
						{
							$event.target.parentElement.classList.toggle("button_is_liked");
						}
						$event.target.classList.toggle("button_is_liked");
						console.log(response);

    				});
			}

    		
/*

		    $scope.feed = 
		    [
		    	{
		    		"titlu":"Meme 1",
		    		"Imagine":'http://memeshappen.com/download.php?memeid=36759',
		    		"up":100,
		    		"down":30,
		    		"comments":15,
		    		"Autor":"Alex Hang",
		    		"Autor_IMG":"https://pbs.twimg.com/profile_images/854356462604353538/a4OGfq--_400x400.jpg",
		    		"ID": 1,
		    	},
		    	{
		    		"titlu":"Meme 2",
		    		"Imagine":'http://via.placeholder.com/640x480',
		    		"up":100,
		    		"down":30,
		    		"comments":15,
		    		"Autor":"Alex Hang",
		    		"Autor_IMG":"https://pbs.twimg.com/profile_images/854356462604353538/a4OGfq--_400x400.jpg",
		    		"ID": 2,
		    	},
		    	{
		    		"titlu":"Meme 3",
		    		"Imagine":'http://via.placeholder.com/640x480',
		    		"up":100,
		    		"down":30,
		    		"comments":15,
		    		"Autor":"Alex Hang",
		    		"Autor_IMG":"https://pbs.twimg.com/profile_images/854356462604353538/a4OGfq--_400x400.jpg",
		    		"ID": 3,
		    	},
		    	{
		    		"titlu":"Meme 4",
		    		"Imagine":'http://via.placeholder.com/640x480',
		    		"up":100,
		    		"down":30,
		    		"comments":15,
		    		"Autor":"Alex Hang",
		    		"Autor_IMG":"https://pbs.twimg.com/profile_images/854356462604353538/a4OGfq--_400x400.jpg",
		    		"ID": 4,
		    	},
		    	{
		    		"titlu":"Meme 5",
		    		"Imagine":'https://i.pinimg.com/originals/be/4d/59/be4d596223e93ec699087d4541be9917.jpg',
		    		"up":100,
		    		"down":30,
		    		"comments":15,
		    		"Autor":"Alex Hang",
		    		"Autor_IMG":"https://pbs.twimg.com/profile_images/854356462604353538/a4OGfq--_400x400.jpg",
		    		"ID": 5,
		    	},
		    	{
		    		"titlu":"Meme 6",
		    		"Imagine":'http://via.placeholder.com/640x480',
		    		"up":100,
		    		"down":30,
		    		"comments":15,
		    		"Autor":"Alex Hang",
		    		"Autor_IMG":"https://pbs.twimg.com/profile_images/854356462604353538/a4OGfq--_400x400.jpg",
		    		"ID": 6,
		    	},
		    	{
		    		"titlu":"Meme 7",
		    		"Imagine":'http://via.placeholder.com/640x480',
		    		"up":100,
		    		"down":30,
		    		"comments":15,
		    		"Autor":"Alex Hang",
		    		"Autor_IMG":"https://pbs.twimg.com/profile_images/854356462604353538/a4OGfq--_400x400.jpg",
		    		"ID": 7,
		    	},
		    ];

		    $scope.aditional = [
		    		{
		    		"titlu":"Meme 7",
		    		"Imagine":'http://via.placeholder.com/640x480',
		    		"up":100,
		    		"down":30,
		    		"comments":15,
		    		"Autor":"Alex Hang",
		    		"Autor_IMG":"https://pbs.twimg.com/profile_images/854356462604353538/a4OGfq--_400x400.jpg",
		    		"ID": 8,
		    	},
		    	{
		    		"titlu":"Meme 7",
		    		"Imagine":'http://via.placeholder.com/640x480',
		    		"up":100,
		    		"down":30,
		    		"comments":15,
		    		"Autor":"Alex Hang",
		    		"Autor_IMG":"https://pbs.twimg.com/profile_images/854356462604353538/a4OGfq--_400x400.jpg",
		    		"ID": 9,
		    	},
		    	{
		    		"titlu":"Meme 7",
		    		"Imagine":'http://via.placeholder.com/640x480',
		    		"up":100,
		    		"down":30,
		    		"comments":15,
		    		"Autor":"Alex Hang",
		    		"Autor_IMG":"https://pbs.twimg.com/profile_images/854356462604353538/a4OGfq--_400x400.jpg",
		    		"ID": 10,
		    	},
		    ] ;
			*/
/*
		$http.get("posts.php")
		    		.then(function (response) {$scope.aditional = response.data.records;
		        		$scope.feed = $scope.feed.concat($scope.aditional)});*/


		  /*  $interval(function () {
		    	$scope.feed = $scope.feed.concat($scope.aditional); //this will be removed 
				curent_post +=3; //this will be removed 

				 $http({
				    url: "http://localhost:1337/getposts",
				    method: "GET",
				   	data: {"curent":curent_post , "next":curent_post+4}
					}).then(function (response){
						if(response.data!='null')
							$scope.aditional = JSON.parse(response.data);
							$scope.feed = $scope.feed.concat($scope.aditional);
							curent_post +=3;
    				});	
    				
    }, 4000);*/


		});