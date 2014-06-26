var ROOT_PATH = 'http://localhost:8080/_ah/api';

// Initialize Angular
app = angular.module('app', []);

// Angular Controller
app.controller('AppCtrl', ['$scope', '$window', function($scope, $window){
	ctx = {
		user_id: "",
		google_locations: []
	};

	// init map
	ctx.init = function(){
		var mapOptions = {
			center: new google.maps.LatLng(33.9645824, -21.7865447),
			zoom: 2,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	    };

	    ctx.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	}

	// clear all markers in our map
	var clear_map = function(){
		angular.forEach(ctx.google_locations, function(item, index){
			item.setMap(null);
		});
	}

	// get data from the server
	ctx.get_data = function(){
		clear_map();
		gapi.client.coordinates.leer_coordenadas({id_usuario: ctx.user_id, desplazamiento: 3.0, cantidad: 100}).execute(function(resp){
			console.log(resp);
			angular.forEach(resp.items, function(item, index){
				var myLatlng = new google.maps.LatLng(item.latitud, item.longitud);
				ctx.google_locations.push(new google.maps.Marker({
					position: myLatlng,
					map: ctx.map,
					title: item.id_usuario
				}));
			})
		});
	};
	
	// load endpoint to request info from the server
	ctx.request_to_server = function(){
		
		gapi.client.load('coordinates', 'v1', function() {
			ctx.get_data();
		}, ROOT_PATH);

	};

	$scope.Ctrl = ctx;
	ctx.init();
}]);
