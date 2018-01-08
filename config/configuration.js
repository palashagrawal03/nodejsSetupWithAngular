!(function() {
    'use strict';
    
    var configuration = {
    	site_url: 'http://localhost:2149',
        // server: {
        //           socketOptions: {
        //           socketTimeoutMS: 0,
        //           connectTimeoutMS: 0
        //         }
        //       },
		database: {
            mongodb: {
                // url: 'mongodb://localhost:27017/bryan_mongo'
                // url: 'mongodb://localhost:27017/bryan_mongo?connectTimeoutMS=1000000'
                url: 'mongodb://node_search:node#21@54.197.27.221:27017/node_search'
            }
        }
     };
    module.exports = configuration;
})();
