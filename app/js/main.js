//@ngInject
var db = require('../../resources/db/mongodb/mongoDBUI.js');
var _ = require('underscore');
module.exports = ['NgMap','$scope', '$http', '$window',function(NgMap, $scope, $http, $window) {
	// NgMap.getMap().then(function(map) {
	//     $scope.map = map;
	// });
	$scope.markerDrop = function(e) {
		console.log(e);
	    console.log(e.latLng.lat(),e.latLng.lng() );
	    var cords = e.latLng.lat() +','+e.latLng.lng();
	    $scope.homeCenter = cords;
	    // var position = e.latLng;
	    // var marker = new google.maps.Marker({position: e.latLng, map: $scope.map});
	    // $scope.map.panTo(e.latLng);
	};

	// $scope.markerDrop = '32.8070014,-79.9731229';

	$scope.dbActive = true;
	//-- call db
    db($scope, $http);
    //-- populate map
    $scope.getMapData();

    $scope.dbLocations = [];
    $scope.mapParams = { 
		home: {
			loc: null,
			radius: 1000
		},
		work: {
			loc: null,
			radius: 500
		},
		fillOpacity: 0.2,
		strokeOpacity: 0.35
	};
	$scope.plays = {
	  	link: 'http://peteplays.com/',
	  	logoSrc: 'images/playslogo.png',
	  	logoAlt: 'PetePlays'
	};

	$scope.homeCenter = (_.has($scope.homeLocInput, 'geometry') ) ? $scope.homeLocInput.geometry.viewport.f.b +','+ $scope.homeLocInput.geometry.viewport.b.f : '';

	// $scope.homeCenter = $scope.homeLocInput.geometry.viewport.f.b +','+ $scope.homeLocInput.geometry.viewport.b.f;

   
    $scope.updateRadius = function(loc, newRadius) {
    	if( loc == 'home' ) {
    		$scope.mapParams.home.radius = newRadius;
    	} else {
    		$scope.mapParams.work.radius = newRadius;
    	}
    };

    $scope.submitData = function() {
    	//-- add locally
    	$scope.dbLocations.push(
    		{
    			"name" : $scope.currentUser,
    			"email" : "TESTER@qwe.com",
    			"home" : $scope.homeCenter,
    			"home_radius" : $scope.mapParams.home.radius,
    			"work" : $scope.workLocInput.geometry.viewport.f.b +','+ $scope.workLocInput.geometry.viewport.b.f,
    			"work_radius" : $scope.mapParams.work.radius,
    			"dts" : (new Date()).toJSON()
    		}
    	);
    	//-- add to db
    	$scope.dbInsert(_.last($scope.dbLocations));

    	$scope.showSideBar = false;
    	$scope.clearInputs();
    };

    $scope.clearInputs = function() {
    	$scope.currentUser = null;
    	$scope.homeLocInput = null;
    	$scope.workLocInput = null;
    	$scope.inputMapData.$setPristine();
    };

    $window.mobilecheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
  }
  $scope.checkForMobile = $window.mobilecheck();
  $scope.$on('markerCords', function(e, args) {
  	console.log(args);
  	$scope.homeCenter = args;
  });

}];