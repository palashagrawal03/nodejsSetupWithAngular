!(function() {
    'use strict';
    
    angular.module('searchApp').controller('LoginController', ['$scope', '$stateParams', '$state', '$uibModal', 'UtilityService','$http','$timeout','$location','myService', function($scope, $stateParams, $state, $uibModal, UtilityService, $http,$timeout, $location,myService) {    

        this.myDate = new Date();
        this.isOpen = false;
        
        $scope.items = [];
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.state_params = $stateParams;

        $scope.Loginclick = function(){
                        
            UtilityService.apiPost('api/search/login', $scope.loginDetail).then(function(response) {
                
                    response = response.data;
                    if (response.success) {                        
                        $scope.usersdata = response.data;
                        if(response.data[0]['type']=="admin"){
                            myService.setJson($scope.usersdata); 
                            $state.go('root.searchAdmin');

                        }
                        else if(response.data[0]['type']=="user"){
                            myService.setJson($scope.usersdata);
                            $state.go('root.search');
                        }

                        
                    }
                    else
                    {
                        $scope.error_message = "Please Enter correct UserName & Password";
                        $scope.incorrect_detail=false; 
                        $timeout(function () { $scope.incorrect_detail = true; }, 5000);   
                        return false;
                    }
                });
        }
}]);

})();
