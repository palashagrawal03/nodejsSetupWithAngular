!(function(){
  'use strict';
  angular.module('searchApp',['ui.router', 'oc.lazyLoad','ui.bootstrap','ngMaterial', 'ngMessages', 'material.svgAssetsCache','ngSanitize', 'ngCsv'])
  .factory('myService', function(){
    var usersdata = null;//the object to hold our data
     return {
     getJson:function(){
       return usersdata;
     },
     setJson:function(value){
      usersdata = value;
     }
     }

});
})();