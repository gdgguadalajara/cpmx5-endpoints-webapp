var ROOT_PATH = 'https://your_app_id.appspot.com/_ah/api';

app = angular.module('app', []);

app.controller('AppCtrl', ['$scope', '$window', function($scope, $window){
	ctx = {
		user_id: "",
		google_locations: []
	};

	$window.init = function() {
		$scope.$apply(ctx.set_location);
	};

	ctx.get_data = function(){
		gapi.client.coordinates.leer_coordenadas({id_usuario: ctx.user_id}).execute(function(resp){
			console.log(resp);
		});
	};
	
	ctx.set_location = function(){
		gapi.client.load('coordinates', 'v1', function() {
			ctx.get_data();
		}, ROOT_PATH);

		var mapOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
	}

	$scope.Ctrl = ctx;
}]);