jbmi_app.controller('ModalInstanceController', function($scope, $uibModalInstance, ProductFactory, item){
	
	$scope.item = item;
	

	$scope.close = function(){
		$uibModalInstance.close();
	}

});