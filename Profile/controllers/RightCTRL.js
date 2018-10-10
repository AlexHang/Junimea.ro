app.controller('RightCTRL', function($scope, $http,$interval) {

			/* $http({
				    url: "http://localhost:1337/lastposts",
				    method: "GET",
				   	data: {}
					}).then(function (response){

						$scope.postari_blog = JSON.parse(response.data);

    				});	*/

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
		    ];		// this will be deleted

		});