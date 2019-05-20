
app.controller('BanController', function($scope, $http,$interval) {
				$http({
				    url: "https://junimea.serveo.net/api/UserManagement/GetBans",
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
								url: "https://junimea.serveo.net/api/UserManagement/UnbanUser",
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
					
					$scope.searchUser=function(){
						
						$http({
								url: "https://junimea.serveo.net/api/UserManagement/SearchUsers",
								method: "POST",
								data: {
										"FirstName":"Alex",
										"LastName":"Hang"
								},
								headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
								}).then(function (response){
									console.log(response);
									//location.reload();
									//console.log(response["data"]);
									console.log(response["data"]["result"]);
									document.getElementById("usr_ban").value=response["data"]["result"][0].userId;
									document.getElementById("email_ban").value=response["data"]["result"][0].userEmail;
								});
					
					}
					
					$scope.BanUser = function(){
						//window.alert("se trimite");
						$http({
								url: "https://junimea.serveo.net/api/UserManagement/BanUser",
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