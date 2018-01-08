!(function() {
    'use strict';
    angular.module('searchApp').config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode({enabled: true,requireBase:false});

        $stateProvider.state('root', {
            url: '/',
            views: {
                'content': {
                    templateUrl: 'login.html',
                    controller: 'LoginController',
                    resolve: {
                        loadPlugin: function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'LoginController',
                                files: ['LoginController.js']
                            }]);
                        }
                    }
                }
            },
            data: {
                isAuthenticate: false
            }

        })

        // $stateProvider.state('root', {
        //     url: 'createUser',
        //     views: {
        //         'content@': {
        //             templateUrl: '/createUser.html',
        //             controller: 'CreateUser',
        //             resolve: {
        //                 loadPlugin: function($ocLazyLoad) {
        //                     return $ocLazyLoad.load([{
        //                         name: 'CreateUser',
        //                         files: ['CreateUser.js']
        //                     }]);
        //                 }
        //             },

        //             params: { hiddenOne: null, }
        //         }
        //     },
        //     data: {
        //         isAuthenticate: false
        //     }

        // });

        $stateProvider.state('root.search', {
            url: 'search',
            views: {
                'content@': {
                    templateUrl: 'search.html',
                    controller: 'SearchController',
                    resolve: {
                        loadPlugin: function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'SearchController',
                                files: ['SearchController.js']
                            }]);
                        }
                    }
                }
            },
            data: {
                isAuthenticate: false
            }

        })

        $stateProvider.state('root.searchAdmin', {
            url: 'searchAdmin',
            views: {
                'content@': {
                    templateUrl: 'searchAdmin.html',
                    controller: 'SearchController',
                    resolve: {
                        loadPlugin: function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'SearchController',
                                files: ['SearchController.js']
                            }]);
                        }
                    }
                }
            },
            data: {
                isAuthenticate: false
            }

        })

        .state('root.search_detail', {
            url: 'search_detail?fromDate&toDate&emZip&quantity',
            views: {
                'content@': {
                    templateUrl: '/search_detail.html',
                    controller: 'SearchController',
                    resolve: {
                        loadPlugin: function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'SearchController',
                                files: ['SearchController.js']
                            }]);
                        }
                    },

                    params: { hiddenOne: null, }
                }
            },
            data: {
                isAuthenticate: false
            }

        })

        .state('root.createUser', {
            url: 'createUser',
            views: {
                'content@': {
                    templateUrl: '/createUser.html',
                    controller: 'CreateUser',
                    resolve: {
                        loadPlugin: function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'CreateUser',
                                files: ['CreateUser.js']
                            }]);
                        }
                    },

                    params: { hiddenOne: null, }
                }
            },
            data: {
                isAuthenticate: false
            }

        });



    });


    angular.module('searchApp').run(['$rootScope', '$state', '$location', 'UtilityService', function($rootScope, $state, $location, UtilityService) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            // var loggedInUser = UtilityService.getLocalStorage('user');

            //   if (loggedInUser && !toState.data.isAuthenticate) { 
            //      // event.preventDefault();
            //       $location.path('admin/dashboard');
            //   } 

            //   if (!loggedInUser && toState.data.isAuthenticate) { 
            //       //event.preventDefault();
            //       $location.path('/');
            //   } 


        });
    }]);

    angular.module('searchApp').constant('appConstant', {
        'apiUrl': window.location.protocol + "//" + window.location.host + "/",
        'baseUrl': window.location.protocol + "//" + window.location.host + "/"
    });
})();
