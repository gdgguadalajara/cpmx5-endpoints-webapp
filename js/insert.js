var ROOT_PATH = 'http://localhost:8080/_ah/api';

app = angular.module('app', []);

app.controller('InsertCtrl', ['$scope', '$window', function($scope, $window){
	ctx = {fecha_hora: (new Date()).toUTCString()};


	ctx.get_data = function(){
		gapi.client.coordinates.guardar_coordenada(ctx).execute(function(resp){
			console.log(resp);
		});
	};
	
	ctx.set_location = function(){
		gapi.client.load('coordinates', 'v1', function() {
			ctx.get_data();
		}, ROOT_PATH);

	};

	$scope.Ctrl = ctx;
}]);