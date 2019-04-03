		app.controller('NewsFeed', function($scope, $http, $interval) {

		
		
		
		
		
			$scope.feed=[];
			$scope.canScroll=false;
			
			
			
    		$scope.see_post = function(id){
    			// location.href = "singlepost.html?"+id;
    			window.open("../singlepost/singlepost.html?ID="+id);
    		};
    		$scope.see_user = function(id){
    			// location.href = "singlepost.html?"+id;
    			window.open("../Profile/Profile.html?id="+id);
    		};
			
			
			
			$interval(function () {
				$scope.canScroll=true;
			  }, 500);
			  
			  
			  
			  $scope.refreshFeed=function(){
					
					 for(let i=0;i<5;i++){
						$scope.lastpost=$scope.feed["result"][$scope.feed["result"].length-1].id;
							 //console.log($scope.feed["result"][3]);
						  
						  if($scope.canScroll==true){
							  $scope.canScroll=false;
							  /*
							  $http({
								url: "  https://junimea.serveo.net/api/PostGetters/GetPosts",
								method: "POST",
								data:  {
											"StartDate":curentdate()
										}
								}).then(function (response){
									
									$scope.aux=response.data;
									//$scope.feed.push($scope.aux);
									angular.extend($scope.feed , $scope.aux);
									console.log(response.data);
								});	
								*/
								
									$http({
										url: " https://junimea.serveo.net/api/PostGetters/GetPrevious",
										headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
										method: "POST",
										data:  {
													 "CurrentId":$scope.lastpost

												}
										}).then(function (response){
											if(response.data["result"]!=null){
												console.log(response.data["result"]);
												$scope.feed["result"].push(response.data["result"]);
												console.log($scope.feed["result"]);
											
											}
											
										});
								}
						
					  
					  
				  }
			}
			  
			  
			  
			

    		$scope.init = function(){
    			 $http({
				    url: "  https://junimea.serveo.net/api/PostGetters/GetPostBatchInitial",
				    method: "POST",
				   	data:  {
								"StartDate":curentdate()
							}
					}).then(function (response){

						$scope.feed = response.data;
						console.log($scope.feed);
    				});	

			curent_post = 10;
    				
					
					
					
					$http({
				    url: "  https://junimea.serveo.net/api/profile/me",
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
    		};
			
			
			
			 $interval(function () {
				$scope.canScroll=true;
				$scope.refreshFeed();
			  }, 2000);
		
			 angular.element(document.querySelector('#feed')).bind('scroll', function(){
				 
				$scope.refreshFeed();
			  
			});
		
		
			
			$scope.likepost= function(postid, value, $event){
				$http({
				    url: "  https://junimea.serveo.net/api/Post/LikePost",
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
			
			$scope.report_post = function(id){
				$scope.ReportId=id;
				document.getElementById("reportID").value=id;
			}
			
			$scope.reportSubmit= function(){
				//window.alert("Inca nu merge, are erori la back-end");
				
				$http({
				    url: "https://junimea.serveo.net/api/Ticket/ReportPost",
				    method: "POST",
				   	data: {
						"PostId":document.getElementById("reportID").value,
						"Reason": document.getElementById("reportReason").value
					},
					headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
					}).then(function (response){
						console.log(response);
						//location.reload();
						console.log(response["data"]["message"]);
						window.alert(response["data"]["message"]);
						$('#report_modal').modal('toggle');

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
		    		"Autor_ID": 1,
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
		    		"Autor_ID": 1,
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
		    		"Autor_ID": 1,
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
		    		"Autor_ID": 1,
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
		    		"Autor_ID": 1,
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
		    		"Autor_ID": 1,
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
		    		"Autor_ID": 1,
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
		    		"Autor_ID": 1,
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
		    		"Autor_ID": 1,
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
		    		"Autor_ID": 1,
		    		"Autor":"Alex Hang",
		    		"Autor_IMG":"https://pbs.twimg.com/profile_images/854356462604353538/a4OGfq--_400x400.jpg",
		    		"ID": 10,
		    	},
		    ] ;
*/

/*
		$http.get("posts.php")
		    		.then(function (response) {$scope.aditional = response.data.records;
		        		$scope.feed = $scope.feed.concat($scope.aditional)});


		    $interval(function () {
		    	$scope.feed = $scope.feed.concat($scope.aditional); //this will be removed 
				curent_post +=3; //this will be removed 
*/
				/* $http({
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