		app.controller('NewsFeed', function($scope, $http, $interval) {

		
		
		
		
		
			$scope.feed=[];
			$scope.canScroll=false;
			$scope.reachedEnd=false;
			
			
    		$scope.see_post = function(id){
    			// location.href = "singlepost.html?"+id;
				if(connected==true){
					window.open("../singlepost/singlepost.html?ID="+id);
				}else{
					$('#LogInModal').modal('show');
				}
    			
    		};
    		$scope.see_user = function(id){
    			// location.href = "singlepost.html?"+id;
				if(connected==true){
					window.open("../Profile/Profile.html?id="+id);
				}else{
					$('#LogInModal').modal('show');
				}
    			
    		};
			
			
			
			$interval(function () {
				$scope.canScroll=true;
			  }, 2000);
			  
			  angular.element(document.querySelector('#feed')).bind('scroll', function(){
				 
				$scope.refreshFeed();
				
			});
			  
			  $scope.refreshFeed=function(){
					
					
					
					if($scope.canScroll==true && $scope.reachedEnd==false){
						$scope.lastpost=$scope.feed["result"][$scope.feed["result"].length-1].createdDate;
							  $scope.canScroll=false;
								
								$http({
											url: "  https://junimea.serveo.net/api/PostGetters/GetPosts",
											method: "POST",
											data:  {
														"StartDate":$scope.lastpost
													}
											}).then(function (response){
												
												if(response.data["result"][response.data["result"].length-1]!=undefined){
													console.log(response.data["result"]);
													for(let i=0;i<response.data["result"].length;i++){
														$scope.feed["result"].push(response.data["result"][i]);
													}
													console.log($scope.feed["result"]);
												}else $scope.reachedEnd=true;
											});	
					
					}
						/*  
					 for(let i=0;i<5;i++){
						
							 //console.log($scope.feed["result"][3]);
						  
						  if($scope.canScroll==true){
							  $scope.canScroll=false;
								
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
						
					  
					  
				  } */
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
			
			
	
			 
		
		
			
			$scope.likepost= function(postid, value, $event, id){
				//console.log('likeCount'+id);
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
								document.getElementById("downVote"+id).classList.remove("button_is_disliked");
								
								if($scope.feed["result"][id]["currentUserLikeValue"]<=0){
									document.getElementById('likeCount'+id).innerHTML=((document.getElementById('likeCount'+id).innerHTML)*1) + (value*1);
									$scope.feed["result"][id]["currentUserLikeValue"]=value;
								}else{
									document.getElementById('likeCount'+id).innerHTML=((document.getElementById('likeCount'+id).innerHTML)*1) - (value*1);
									$scope.feed["result"][id]["currentUserLikeValue"]=0;
								}
								
								
							}else if(value<0){
								class_to_give = "button_is_disliked";
								document.getElementById("upVote"+id).classList.remove("button_is_liked");
								//document.getElementById('likeCount'+id).innerHTML=((document.getElementById('likeCount'+id).innerHTML)*1) + (value*1);
								
								if($scope.feed["result"][id]["currentUserLikeValue"]>=0){
									document.getElementById('likeCount'+id).innerHTML=((document.getElementById('likeCount'+id).innerHTML)*1) + (value*1);
									$scope.feed["result"][id]["currentUserLikeValue"]=value;
								}else{
									document.getElementById('likeCount'+id).innerHTML=((document.getElementById('likeCount'+id).innerHTML)*1) - (value*1);
									$scope.feed["result"][id]["currentUserLikeValue"]=0;
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
			
			$scope.report_post = function(id){
				if(connected==true){
					$scope.ReportId=id;
					document.getElementById("reportID").value=id;
					$('#report_modal').modal('show');
					
				}else{
					$('#LogInModal').modal('show');
				}
				
			}
			
			$scope.reportSubmit= function(){
				//window.alert("Inca nu merge, are erori la back-end");
				if(connected==true){
					$http({
				    url: "https://junimea.serveo.net/api/Reports/ReportPost",
				    method: "POST",
				   	data: {
						"EntityId":document.getElementById("reportID").value,
						"Message": document.getElementById("reportReason").value
					},
					headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
					}).then(function (response){
						
						
						if(response.status==400){
							window.alert("you already reported this post");
							$('#report_modal').modal('toggle');
						}
						
						
						console.log(response);
						//location.reload();
						console.log(response["data"]["message"]);
						window.alert(response["data"]["message"]);
						

    				});
				}else{
					$('#LogInModal').modal('show');
				}
				
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