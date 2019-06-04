app.controller('postReportController', function($scope, $http,$interval) {
	
	
	$http({
				url: "https://junimea.serveo.net/api/AddressingReports/GetPostReportsBatch",
				method: "POST",
				data: {
					"Id" : "1"
				},
				headers: {"Authorization" : "Bearer "+ localStorage.getItem("token")},
				}).then(function (response){
					console.log(response);
					//location.reload();
					console.log(response["data"]);
					$scope.postReports=response["data"]["result"]
					console.log($scope.postReports);

    			});
	
	
});