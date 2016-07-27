jbmi_app.controller('BreakController', function($scope, $location, BreakFactory){
	$scope.all_breaks = []
	$scope.nba_breaks = []
	$scope.nfl_breaks = []

	// Create a custom ID for each order
    function customID() {
        var id = ""
        var possible = "0123456789"

        for (var i=0; i < 12; i++) {
            id += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return id
    };

    $scope.getAllBreaks = function () {
    	BreakFactory.getAllBreaks(function(data){
			$scope.all_breaks = data;
		})
    };

    $scope.getNBABreaks = function () {
    	BreakFactory.getNBABreaks(function(data){
			// SET NEW CUSTOM ID FOR EACH ORDER
			for (each in data) {
				data[each].customID = customID();
			}
			$scope.nba_breaks = data;
		})
    };

	$scope.getNFLBreaks = function () {
    	BreakFactory.getNFLBreaks(function(data){
			// SET NEW CUSTOM ID FOR EACH ORDER
			for (each in data) {
				data[each].customID = customID();
			}
			$scope.nfl_breaks = data;
		})
    };

	$scope.addBreak = function(){
		BreakFactory.addBreak($scope.new_break, function(data){
			$scope.getAllBreaks();
			$scope.new_break = {};
		})
	};

	$scope.editBreakPage = function(break_id){
		$location.path('/break/edit/'+break_id);
	};

	$scope.removeBreak = function(break_id){
		BreakFactory.removeBreak(break_id, function(){
			$scope.getAllBreaks();
		})
	};

	// new method to create a range with two end points for the quantity
	$scope.range = function(min, max, step){
		step = step || 1;
		var input = [];
		for (var i = min; i <= max; i += step){
			input.push(i);
		}

		return input;
	};

	$scope.getAllBreaks();
    $scope.getNBABreaks();
    $scope.getNFLBreaks();

})
.directive('breakDesc', function() {
	return {
		link: function(scope, element, attrs) {
			console.log(attrs)
			element.append(attrs.breakDesc)
			// #########################################
			// USE BELOW to bind multiple jQuery actions
			// #########################################
			// element.bind('click', function() {
			// 	console.log("attrs", attrs)
			// 	element.html(attrs.breakDesc)
			// })
		}
	}
});
