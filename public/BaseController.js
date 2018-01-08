!(function() {
    'use strict';
    angular.module('searchApp').controller('BaseController', ['$scope', '$stateParams', '$state', '$uibModal', 'UtilityService','$http','$location', function($scope, $stateParams, $state, $uibModal, UtilityService, $http, $location) {
        

    	$scope.BackdoorCheck= function(){
            

        UtilityService.apiGet('api/search/backdoor').then(function(response) {

                    var res = response.data;
                    // $scope.session_value = res.data;
                    if(!res.success)
                    {
                        $state.go('root');
                    }
                    else
                    {
                        if(res.data == 'Session_created_for_user'){
                            $state.go('root.search');
                        }
                        else if(res.data == 'Session_created_for_admin'){
                            $state.go('root.searchAdmin');
                        }
                    }
                    
                });

     }

     $scope.logout= function(){
    		
		UtilityService.apiGet('api/search/logout').then(function(response) {

	            var res = response.data;
	            if(res.data == "Session destroy")
	            {
	            	$state.go('root');
	            }
	            
	            
	        });

       

     }
        
    }]);
})();
