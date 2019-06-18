app.controller('NAVCTRL', function($scope, $http,$interval) {

			 $http({
				    url: "  https://junimea.serveo.net/api/profile/me",
				    method: "GET",
				   	data: {},
					headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
					}).then(function (response){

						console.log(response);
						
						$scope.UserData=response.data;
						
						$scope.UserName = Username;
						$scope.Image = pictureURL;
						console.log($scope.UserName);
						
						$scope.UserID = localStorage.getItem("userID");
						

    				});	
    				$scope.user_connected = connected;
		});