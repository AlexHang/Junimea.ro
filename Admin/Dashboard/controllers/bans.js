
app.controller('BanController', function($scope, $http,$interval) {
				$http({
				    url: "http://localhost:5000/api/UserManagement/GetBans",
				    method: "POST",
				   	data: {
						
					},
					headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
					}).then(function (response){
						console.log(response);
						//location.reload();
						console.log(response["data"]);
						$scope.banList=response["data"]["result"]
						console.log($scope.banList);

    				});
					
					$scope.unBanUser = function(id){
						
						$http({
								url: "http://localhost:5000/api/UserManagement/UnbanUser",
								method: "POST",
								data: {
										"UserId" : id
								},
								headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
								}).then(function (response){
									console.log(response);
									//location.reload();
									console.log(response["data"]);
									window.alert(id+" has been unBanned")
									location.reload();
								});
					
					}
					
					$scope.BanUser = function(){
						//window.alert("se trimite");
						$http({
								url: "http://localhost:5000/api/UserManagement/BanUser",
								method: "POST",
								data: {
										"BannedUserId" : document.getElementById("usr_ban").value,
										"BanWeeksDuration": document.getElementById("duration_ban").value,
										"FacebookId" : "0",
										"BannedEmail" : document.getElementById("email_ban").value,
										"IsPermanentBan" : "false"
								},
								headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
								}).then(function (response){
									console.log(response);
									//location.reload();
									console.log(response["data"]);
									window.alert(response["data"]["message"]);
									location.reload();

								});
					
					}
					
}
);