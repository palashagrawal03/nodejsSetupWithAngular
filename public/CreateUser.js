!(function() {
    'use strict';
    
    angular.module('searchApp').controller('CreateUser', ['$scope', '$stateParams', '$state', '$uibModal', 'UtilityService','$http','$timeout','$location', function($scope, $stateParams, $state, $uibModal, UtilityService, $http,$timeout, $location) {    
    	$scope.usersDetail = {"hidden" : "33581"};

    	$scope.get_data = function(){
    		UtilityService.apiGet('api/search/get_users').then(function(response) {

                    var res = response.data;

                    
                    if(res.success)
                    {
                        $scope.details = res.data;
                        // console.log($scope.details)
                    }
                  
                });
    	}

        $scope.save_data = function(){ 

        	if($scope.usersDetail._id){

        		if($scope.usersDetail.emailId && $scope.usersDetail.fullName && $scope.usersDetail.pass){
        		 UtilityService.apiPost('api/search/updateData', $scope.usersDetail).then(function(response) {
            	if(response.data.success){

            		$("#addModal").modal("hide");
            		$scope.get_data();
            	}
            	});
        	}

        }else
        	{
        		if($scope.usersDetail.emailId && $scope.usersDetail.fullName && $scope.usersDetail.pass){
        		 UtilityService.apiPost('api/search/saveData', $scope.usersDetail).then(function(response) {
            	if(response.data.success){

            		$("#addModal").modal("hide");
            		$scope.usersDetail ={};
            		$scope.get_data();
            	}
            	else
            	{
            		$("#email_exist_error").show();
            	}


            });
        	}
        	}   	
        	
        	
        }

        $scope.id_edit = function(obj){

        	$scope.usersDetail = obj;

        }

        $scope.clear_data = function(){

        	$scope.usersDetail ={};
        }

        $scope.get_delete_id =function(obj){

        	$scope.delete_obj =  obj;
			$scope.delete_name = obj.fullName;
        }

        $scope.conf_delete = function(){
		var a = $scope.details.indexOf($scope.delete_obj);
		
			
			UtilityService.apiPost('api/search/deleteUser', $scope.delete_obj).then(function(response) {
            	if(response.data.success){
            		$("#deleteModal").modal("hide");
					$scope.details.splice(a, 1);
            		
            	}
            
            });

		
	}
}]);

})();
