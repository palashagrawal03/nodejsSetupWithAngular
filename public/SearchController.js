!(function() {
    'use strict';
    
    angular.module('searchApp').controller('SearchController', ['$scope', '$stateParams', '$state', '$uibModal', 'UtilityService','$http','$location','$timeout','myService', function($scope, $stateParams, $state, $uibModal, UtilityService, $http,$location,$timeout,myService) {
        
        $scope.userReturnData = myService.getJson();
        

        if($scope.userReturnData){
    
            angular.element(document.querySelector("#removeClass")).addClass("alert alert-success text-center");
            $scope.login_message = "Logged In Successfully";
            $scope.successful_login=false; 
            $timeout(function () { $scope.successful_login = true; }, 3000); 
        }


        this.myDate = new Date();
        this.isOpen = false;
        var outputJson = $location.search();

        if($location.search().emZip || $location.search().toDate || $location.search().fromDate)
        {
            $('.loader-div').show();
            UtilityService.apiPost('api/search/employer', outputJson).then(function(response) {
                    console.log(response.data);
                    response = response.data;
                    if (response.success) {
                        $scope.quantity = $location.search().quantity
                        $('.loader-div').hide();
                        $('.footer_text').show();
                        $('.footer_text1').show();
                        $('.search_field').show();
                        $('.return_btn').show()
                        $('#downloadable').show();
                        
                        $scope.items = response.data;
                        $scope.arrayLength = response.data.length;

                    } 
                    $scope.submitBtn = false;
                    

                }, function(error) {
                    $scope.submitBtn = false;
                    
                });
            
        }
        
        $scope.items = [];
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.state_params = $stateParams;
        // create a blank object to handle form data.
        $scope.SearchFormObj = {"max_record" : 50};
        $scope.search_employer = function search_employer() {
         

         if($scope.SearchFormObj.from && $scope.SearchFormObj.to && !$scope.SearchFormObj.emZip){
                    console.log('onlydate');
                    var from = $scope.SearchFormObj.from;
                    var to = $scope.SearchFormObj.to;
                    var fullDate = new Date(from.toLocaleDateString());
                    var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
                    var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1) twoDigitDate="0" +twoDigitDate;
                    if(fullDate.getFullYear() == 2017)
                    {
                        var fromAdjus = fullDate.getFullYear()-1;
                    }
                    else
                    {
                        var fromAdjus = fullDate.getFullYear();
                    }
                    if(twoDigitMonth.length == 3){
                        twoDigitMonth = twoDigitMonth.substr(1);
                    }
                    console.log(twoDigitMonth);
                    var fromDate = fromAdjus + '-' + twoDigitMonth + '-' + twoDigitDate+'T00:00:00.000Z';


                    var fullDate = new Date(to.toLocaleDateString());
                    var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
                    var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1) twoDigitDate="0" +twoDigitDate;
                    if(twoDigitMonth.length == 3){
                        twoDigitMonth = twoDigitMonth.substr(1);
                    }
                    
                    var toDate = fromAdjus + '-' + twoDigitMonth + '-' + twoDigitDate+'T00:00:00.000Z';

                    var zip = '';

            }
            else if(!$scope.SearchFormObj.from && !$scope.SearchFormObj.to && $scope.SearchFormObj.emZip)
            {
                console.log('ziponly')
                var fromDate = '';
                var toDate = '';
                var zip = $scope.SearchFormObj.emZip;
            }
            else if($scope.SearchFormObj.from && $scope.SearchFormObj.to && $scope.SearchFormObj.emZip)
            {
                console.log('all');
                var from = $scope.SearchFormObj.from;
                var to = $scope.SearchFormObj.to;
                var fullDate = new Date(from.toLocaleDateString());
                var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
                var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1) twoDigitDate="0" +twoDigitDate;
                

                if(fullDate.getFullYear() == 2017)
                    {
                        var fromAdjus = fullDate.getFullYear()-1;
                    }
                    else
                    {
                        var fromAdjus = fullDate.getFullYear();
                    }
                if(twoDigitMonth.length == 3){
                        twoDigitMonth = twoDigitMonth.substr(1);
                    }

                var fromDate = fromAdjus + '-' + twoDigitMonth + '-' + twoDigitDate+'T00:00:00.000Z';


                var fullDate = new Date(to.toLocaleDateString());
                var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
                var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1) twoDigitDate="0" +twoDigitDate;
                if(twoDigitMonth.length == 3){
                        twoDigitMonth = twoDigitMonth.substr(1);
                    }
                
                var toDate = fromAdjus + '-' + twoDigitMonth + '-' + twoDigitDate+'T00:00:00.000Z';
                
                var zip = $scope.SearchFormObj.emZip;
            }
            else if($scope.SearchFormObj.from && $scope.SearchFormObj.emZip)
            {
                console.log('zipdate1');
                var from = $scope.SearchFormObj.from;
                var to = $scope.SearchFormObj.to;
                var fullDate = new Date(from.toLocaleDateString());
                var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
                var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1) twoDigitDate="0" +twoDigitDate;
                

                if(fullDate.getFullYear() == 2017)
                    {
                        var fromAdjus = fullDate.getFullYear()-1;
                    }
                    else
                    {
                        var fromAdjus = fullDate.getFullYear();
                    }

                if(twoDigitMonth.length == 3){
                        twoDigitMonth = twoDigitMonth.substr(1);
                    }
                var fromDate = fromAdjus + '-' + twoDigitMonth + '-' + twoDigitDate+'T00:00:00.000Z';
                var zip = $scope.SearchFormObj.emZip;
                var toDate = '';

            }

                 $scope.quantity = $scope.SearchFormObj.max_record;

            if($scope.SearchFormObj.from || $scope.SearchFormObj.to || $scope.SearchFormObj.emZip){

            if(($scope.SearchFormObj.from && $scope.SearchFormObj.to) || ($scope.SearchFormObj.emZip && !$scope.SearchFormObj.to) || ($scope.SearchFormObj.emZip && $scope.SearchFormObj.from && $scope.SearchFormObj.to) || ($scope.SearchFormObj.from && $scope.SearchFormObj.emZip)) 
            {
                // if(($scope.SearchFormObj.from < $scope.SearchFormObj.to) || ){
                        $scope.submitBtn = true;
                    var jSon = {fromDate:fromDate, toDate: toDate, emZip: zip,quantity:$scope.quantity};
                    console.log(jSon);
                    $state.go('root.search_detail',jSon);
                // }
                // else
                // {
                //     alert('To date must be greater than from date');
                // }
                
                    
                                
            }
            else{
                
                alert('Selected field have wrong combination please select again');
            }
        }
        else
        {
            alert("Please Select Field First");
        }
        }; 

        $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;"
        });
        saveAs(blob, "wc_search.xls");
    };

    $scope.sort=function(fild_name){
        // console.log(fild_name);
        $scope.f_name=fild_name;
        if($scope.s_type==true)
        {

            $scope.s_type=false;
        }
        else
        {
            $scope.s_type=true;
        }
    }

    $scope.exportAction = function (option) {
          
          switch (option) {
              case 'pdf': $scope.$broadcast('export-pdf', {}); 
                  break; 
              case 'excel': $scope.$broadcast('export-excel', {});
                  break; 
              case 'doc': $scope.$broadcast('export-doc', {});
                  break;
              case 'csv': $scope.$broadcast('export-csv', {});
                  break;
              default: console.log('no event caught'); 
          }
      }

    }]);

})();

// var fieldNames = ['Employer Name', 'Employer Address', 'City', 'State', 'Zip Code', 'Phone', 'Eff Date', 'Cancel Date', 'GOV Class', 'No. Of Emp', 'Insurer', 'Agency', 'City', 'State'];
                                        // var fields = ['emName', 'emStreet1', 'emCity', 'emState', 'emZip', 'emPhone', 'effective_date', 'cancel_date', 'poc_gov_class', 'emNumEmployees', 'pocInsurer', 'pocAgency', 'pocCity', 'PoAgencyState'];
 
                                   // var csv = json2csv({ data: data2, fields: fields,fieldNames: fieldNames,quotes: '' });