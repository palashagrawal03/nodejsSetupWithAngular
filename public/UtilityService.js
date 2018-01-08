!(function() {
    'use strict';
    angular.module('searchApp').service('UtilityService', ['$http','appConstant', function($http, appConstant) {
        this.apiPost = function(url, data) {
            return $http.post(appConstant.apiUrl+url, data);
        };
		this.apiGet = function(url, data) {
            return $http.get(appConstant.apiUrl+url, data);
        };
		
		this.apiPut = function(url, data) {
            return $http.put(appConstant.apiUrl+url, data);
        };
		
		this.apiDelete = function(url, data) {
            return $http.delete(appConstant.apiUrl+url, data);
        };
        
       
    }]);
})();
