!(function() {
    'use strict';

    var express = require('express'),
        m_client = require('mongodb').MongoClient,
        config = require('../config/configuration'),
        router = express.Router();
        var sess;
        const isset = require('isset');
        // const csvFilePath='poc_07-001.csv'
        // const csv=require('csvtojson')
    var ObjectId = require('mongodb').ObjectID;

    var route = function(app) {
        
        router.post('/employer', function(req, res, next) {
            m_client.connect(config.database.mongodb.url, function(err, db) {
                if (err) {
                    res.json({ success: false, data: [], message: err });
                } else {
                    // var str = "abc's test#s";
                    // console.log(str.replace(/[^a-zA-Z ]/g, ""));
                    

                    if(!req.body.toDate && !req.body.fromDate && req.body.emZip)
                    {
                        
                        // console.log(sess.data);

                        //csv Code start 


                        // csv()
                        // .fromFile(csvFilePath)
                        // .on('json',(jsonObj)=>{
                            
                        //     // console.log(array);
                        //     // combine csv header row and csv line to a json object 
                        //     // jsonObj.a ==> 1 or 4 
                        //      db.collection("customers313new12").insert(jsonObj, function(err, res) {
                        //     if (err) throw err;

                        //     // console.log("1 record inserted");
                        //     // db.close();
                        //   });
                        // })
                        // console.log(jsonObj);
                        // .on('done',(error)=>{
                        //     console.log('end')
                        // })

                        
                        //csv Code Ends 

                        var options = {
                            $limit: 20,
                        }
                        
                        var reg = '^'+req.body.emZip;
                                                
                        db.collection('Employer', function(err, collection) {
                            
                        collection.find({emZip:{ $regex: reg}}).toArray(function(err, data) {
                            if (err) {
                                res.json({ success: false, data: [], message: err });
                            } else {

                                var employerIds = [];
                                var empdata = data;
                                var cancel_date =[];
                                var pocId = [];
                                var data1=[];
                                var data2=[];
                                var data3=[];
                                var emppocids = [];
                                var output = [];
                                var poc_gov_class = [];
                                var pocInsurer = [];
                                var pocAgency = [];
                                var pocCity = [];
                                var pocState = [];
                                var mythink = [];
                                data.forEach(function(item){
                                    employerIds.push(item.emEmployerId);
                                    
                                });


                                db.collection('EmployerCoverage', function(err, collection) {
                                    collection.find({ ecEmployerId: { $in: employerIds } }).toArray(function(err, data) {
                                        if(err){
                                            res.json({success: false, data: [], message: err});
                                        }
                                        else
                                        {
                                            var coveragedata = data;
                                            data.forEach(function(val){
                                            emppocids.push(val.ecPocId);
                                            mythink[val.ecPocId] = val.ecEmployerId;

                                            data1[val.ecEmployerId]=val.ecEffectiveDate;
                                            cancel_date[val.ecEmployerId]=val.ecCancelDate;                                        
                                        });


                                        db.collection('Poc', function(err, collection) {
                                            collection.find({ PoPocId: {$in: emppocids } }).toArray(function(err, data) {
                                                if(err){
                                                    res.json({ success: false, data: [], message: err });

                                                }else
                                                {
                                                    data.forEach(function(source){
                                                        var temp = mythink[source.PoPocId];

                                                        data3[temp]=source.PoAgencyState;
                                                        
                                                        pocCity[temp] = source.PoAgencyCity;
                                                        pocAgency[temp] = source.PoAgencyName;
                                                        poc_gov_class[temp] = source.PoGoverningClass;
                                                        pocInsurer[temp] = source.PoIssOffName;
                                                    });
                                                    


                                        empdata.forEach(function(item){

                                            if(data1[item.emEmployerId]){

                                                item.effective_date = data1[item.emEmployerId].toLocaleDateString();
                                                item.cancel_date = cancel_date[item.emEmployerId];
                                                if(data3[item.emEmployerId]){
                                                item.PoAgencyState = data3[item.emEmployerId];
                                                } else{
                                                    item.PoAgencyState = '';
                                                }
                                                if(pocCity[item.emEmployerId]){
                                                item.pocCity = pocCity[item.emEmployerId];
                                                } else{
                                                    item.pocCity = '';
                                                }
                                                if(pocAgency[item.emEmployerId]){
                                                item.pocAgency = pocAgency[item.emEmployerId];
                                                } else{
                                                    item.pocAgency = '';
                                                }
                                                if(poc_gov_class[item.emEmployerId]){
                                                item.poc_gov_class = poc_gov_class[item.emEmployerId];
                                                } else{
                                                    item.poc_gov_class = '';
                                                }
                                                if(pocInsurer[item.emEmployerId]){
                                                item.pocInsurer = pocInsurer[item.emEmployerId];
                                                } else{
                                                    item.pocInsurer = '';
                                                }
                                                data2.push(item);
                                            }else{
                                                item.effective_date = '';
                                                if(data3[item.emEmployerId]){
                                                item.PoAgencyState = data3[item.emEmployerId];
                                                } else{
                                                    item.PoAgencyState = '';
                                                }
                                                if(pocCity[item.emEmployerId]){
                                                item.pocCity = pocCity[item.emEmployerId];
                                                } else{
                                                    item.pocCity = '';
                                                }
                                                if(pocAgency[item.emEmployerId]){
                                                item.pocAgency = pocAgency[item.emEmployerId];
                                                } else{
                                                    item.pocAgency = '';
                                                }
                                                if(poc_gov_class[item.emEmployerId]){
                                                item.poc_gov_class = poc_gov_class[item.emEmployerId];
                                                } else{
                                                    item.poc_gov_class = '';
                                                }
                                                if(pocInsurer[item.emEmployerId]){
                                                item.pocInsurer = pocInsurer[item.emEmployerId];
                                                } else{
                                                    item.pocInsurer = '';
                                                }
                                                
                                                data2.push(item);
                                            }
                                                                                   
                                        });
    

                                            data2.forEach(function(delete1){
                                            delete delete1.emEmployerId;
                                            delete delete1.emDummy;
                                            delete delete1.emDateTime;
                                            delete delete1.emSystemId;
                                            delete delete1.emUserId;
                                            delete delete1.emSic;
                                            delete delete1.emCoverageStatus;
                                            delete delete1.emSuspenseInd;
                                            delete delete1.emPocCount;
                                            delete delete1.emExemptExist;
                                            delete delete1.emAkaExist;
                                            delete delete1.emPriorId;
                                            delete delete1.emUiNumber;
                                            delete delete1.emFeinSsn;
                                            delete delete1.mysqlIdEmployer;
                                            delete delete1.emStreet2;
                                            delete delete1.emCounty;
                                            delete delete1.emCountry;
                                            delete delete1.emMicrofilmId;
                                            delete delete1._id;
                                            delete delete1.emEmployerType;
                                            delete delete1.emLeasingInd;
                                             output.push(delete1);
                                  });

                                            res.json({ success: true, data:output, message: 'List.'});

                                                }
                                                
                                            });
                                        });
                                           
                                        }
                                    });
                                });
                                
                            }

                        });
                    });
                }
                else if(req.body.toDate && req.body.fromDate && !req.body.emZip)
                {
                    db.collection('EmployerCoverage', function(err, collection) {
                        collection.find({ ecEffectiveDate: { "$gte": new Date(req.body.fromDate), "$lte": new Date(req.body.toDate) } }).toArray(function(err, data) {
                            if (err) {
                                res.json({ success: false, data: [], message: err });
                            } else {
                                

                                var employerIds = [];
                                var emppocids = [];
                                var effective_date=[];
                                var cancel_date =[];
                                var data1=[];
                                var mythink = [];
                                var data3 = [];
                                var poc_gov_class = [];
                                var pocInsurer = [];
                                var pocAgency = [];
                                var pocCity = [];
                                var output = [];
                                data.forEach(function(item) {

                                    employerIds.push(item.ecEmployerId);
                                    emppocids.push(item.ecPocId);
                                    mythink[item.ecPocId] = item.ecEmployerId;
                                    effective_date[item.ecEmployerId] = item.ecEffectiveDate;
                                    cancel_date[item.ecEmployerId] = item.ecCancelDate;
                                });
                                

                                db.collection('Poc', function(err, collection) {
                                    collection.find({ PoPocId: {$in: emppocids } }).toArray(function(err, data) {
                                        if(err){
                                            res.json({ success: false, data: [], message: err });

                                        }else
                                        {
                                            data.forEach(function(source){
                                                        var temp = mythink[source.PoPocId];

                                                        data3[temp]=source.PoAgencyState;
                                                        
                                                        pocCity[temp] = source.PoAgencyCity;
                                                        pocAgency[temp] = source.PoAgencyName;
                                                        poc_gov_class[temp] = source.PoGoverningClass;
                                                        pocInsurer[temp] = source.PoIssOffName;
                                                    });

                                            db.collection('Employer', function(err, collection) {
                                    collection.find({ emEmployerId: { $in: employerIds } }).toArray(function(err, data) {
                                        if (err) {

                                            res.json({ success: false, data: [], message: err });

            
                                        } else {
                            
                                           data.forEach(function(item){
                                 
                                            item.effective_date = effective_date[item.emEmployerId].toLocaleDateString();
                                            item.cancel_date = cancel_date[item.emEmployerId];
                                            if(data3[item.emEmployerId]){
                                                item.PoAgencyState = data3[item.emEmployerId];
                                                } else{
                                                    item.PoAgencyState = '';
                                                }
                                            if(pocCity[item.emEmployerId]){
                                            item.pocCity = pocCity[item.emEmployerId];
                                            } else{
                                                item.pocCity = '';
                                            }
                                            if(pocAgency[item.emEmployerId]){
                                            item.pocAgency = pocAgency[item.emEmployerId];
                                            } else{
                                                item.pocAgency = '';
                                            }
                                            if(poc_gov_class[item.emEmployerId]){
                                            item.poc_gov_class = poc_gov_class[item.emEmployerId];
                                            } else{
                                                item.poc_gov_class = '';
                                            }
                                            if(pocInsurer[item.emEmployerId]){
                                            item.pocInsurer = pocInsurer[item.emEmployerId];
                                            } else{
                                                item.pocInsurer = '';
                                            }
                                               data1.push(item);
                                               
                                           });

                                           data1.forEach(function(delete1){
                                            delete delete1.emEmployerId;
                                            delete delete1.emDummy;
                                            delete delete1.emDateTime;
                                            delete delete1.emSystemId;
                                            delete delete1.emUserId;
                                            delete delete1.emSic;
                                            delete delete1.emCoverageStatus;
                                            delete delete1.emSuspenseInd;
                                            delete delete1.emPocCount;
                                            delete delete1.emExemptExist;
                                            delete delete1.emAkaExist;
                                            delete delete1.emPriorId;
                                            delete delete1.emUiNumber;
                                            delete delete1.emFeinSsn;
                                            delete delete1.mysqlIdEmployer;
                                            delete delete1.emStreet2;
                                            delete delete1.emCounty;
                                            delete delete1.emCountry;
                                            delete delete1.emMicrofilmId;
                                            delete delete1._id;
                                            delete delete1.emEmployerType;
                                            delete delete1.emLeasingInd;
                                             output.push(delete1);
                                  });
                                           
                                            
                                            res.json({ success: true, data: output, message: 'List.' });
                                        }
                                    });
                                });

                            }
                            
                        });
                    });

                }

            });
        });
                }
                else if(req.body.toDate && req.body.fromDate && req.body.emZip){
                    console.log('all');

                    db.collection('EmployerCoverage', function(err, collection) {
                        collection.find({ ecEffectiveDate: { "$gte": new Date(req.body.fromDate), "$lte": new Date(req.body.toDate) } }).toArray(function(err, data) {
                            if (err) {
                                res.json({ success: false, data: [], message: err });
                            } else {
                                var data3=[];
                                var poc_gov_class = [];
                                var pocInsurer = [];
                                var pocAgency = [];
                                var pocCity = [];
                                var pocState = [];
                                var mythink = [];
                                var employerIds = [];
                                var effective_date=[];
                                var emppocids = [];
                                var cancel_date =[];
                                var data1=[];
                                var output =[];
                                data.forEach(function(item) {
                                    employerIds.push(item.ecEmployerId);
                                    emppocids.push(item.ecPocId);
                                    mythink[item.ecPocId] = item.ecEmployerId;
                                    emppocids.push(item.ecPocId);
                                    effective_date[item.ecEmployerId] = item.ecEffectiveDate;
                                    cancel_date[item.ecEmployerId] = item.ecCancelDate;
                                });

                                
                                db.collection('Poc', function(err, collection) {
                                    collection.find({ PoPocId: {$in: emppocids } }).toArray(function(err, data) {
                                        if(err){
                                            res.json({ success: false, data: [], message: err });

                                        }else
                                        {
                                            data.forEach(function(source){
                                                
                                                        var temp = mythink[source.PoPocId];

                                                        data3[temp]=source.PoAgencyState;
                                                        
                                                        pocCity[temp] = source.PoAgencyCity;
                                                        pocAgency[temp] = source.PoAgencyName;
                                                        poc_gov_class[temp] = source.PoGoverningClass;
                                                        pocInsurer[temp] = source.PoIssOffName;
                                                    });


                                var reg = '^'+req.body.emZip;
                                db.collection('Employer', function(err, collection) {
                                    collection.find({ emEmployerId: { $in: employerIds }, emZip:{ $regex: reg} }).toArray(function(err, data) {
                                        if (err) {

                                            res.json({ success: false, data: [], message: err });

            
                                        } else {
                                           data.forEach(function(item){

                                 
                                            item.effective_date = effective_date[item.emEmployerId].toLocaleDateString();
                                            item.cancel_date = cancel_date[item.emEmployerId];

                                            if(data3[item.emEmployerId]){
                                                item.PoAgencyState = data3[item.emEmployerId];
                                                } else{
                                                    item.PoAgencyState = '';
                                                }
                                            if(pocCity[item.emEmployerId]){
                                            item.pocCity = pocCity[item.emEmployerId];
                                            } else{
                                                item.pocCity = '';
                                            }
                                            if(pocAgency[item.emEmployerId]){
                                            item.pocAgency = pocAgency[item.emEmployerId];
                                            } else{
                                                item.pocAgency = '';
                                            }
                                            if(poc_gov_class[item.emEmployerId]){
                                            item.poc_gov_class = poc_gov_class[item.emEmployerId];
                                            } else{
                                                item.poc_gov_class = '';
                                            }
                                            if(pocInsurer[item.emEmployerId]){
                                            item.pocInsurer = pocInsurer[item.emEmployerId];
                                            } else{
                                                item.pocInsurer = '';
                                            }
                                               data1.push(item);
                                               
                                           });

                                           data1.forEach(function(delete1){
                                            delete delete1.emEmployerId;
                                            delete delete1.emDummy;
                                            delete delete1.emDateTime;
                                            delete delete1.emSystemId;
                                            delete delete1.emUserId;
                                            delete delete1.emSic;
                                            delete delete1.emCoverageStatus;
                                            delete delete1.emSuspenseInd;
                                            delete delete1.emPocCount;
                                            delete delete1.emExemptExist;
                                            delete delete1.emAkaExist;
                                            delete delete1.emPriorId;
                                            delete delete1.emUiNumber;
                                            delete delete1.emFeinSsn;
                                            delete delete1.mysqlIdEmployer;
                                            delete delete1.emStreet2;
                                            delete delete1.emCounty;
                                            delete delete1.emCountry;
                                            delete delete1.emMicrofilmId;
                                            delete delete1._id;
                                            delete delete1.emEmployerType;
                                            delete delete1.emLeasingInd;
                                             output.push(delete1);
                                  });
                                            
                                            res.json({ success: true, data: output, message: 'List.' });
                                        }
                                    });
                                });

                                        }
                                        
                                    });
                                });

                            }

                        });
                    });



                }
                else if(req.body.fromDate && req.body.emZip && !req.body.fromDate)
                {
                    console.log('zipdate1');
                    db.collection('EmployerCoverage', function(err, collection) {
                        collection.find({ ecEffectiveDate: new Date(req.body.fromDate)}).toArray(function(err, data) {
                            if (err) {
                                res.json({ success: false, data: [], message: err });
                            } else {
                                var employerIds = [];
                                var effective_date=[];
                                var cancel_date =[];
                                var data1=[];
                                var data3=[];
                                var poc_gov_class = [];
                                var pocInsurer = [];
                                var pocAgency = [];
                                var pocCity = [];
                                var pocState = [];
                                var mythink = [];
                                var emppocids = [];
                                var output = [];
                                data.forEach(function(item) {
                                    employerIds.push(item.ecEmployerId);
                                    emppocids.push(item.ecPocId);
                                    mythink[item.ecPocId] = item.ecEmployerId;
                                    effective_date[item.ecEmployerId] = item.ecEffectiveDate;
                                    cancel_date[item.ecEmployerId] = item.ecCancelDate;
                                });

                                db.collection('Poc', function(err, collection) {
                                    collection.find({ PoPocId: {$in: emppocids } }).toArray(function(err, data) {
                                        if(err){
                                            res.json({ success: false, data: [], message: err });

                                        }else
                                        {
                                            data.forEach(function(source){
                                                        var temp = mythink[source.PoPocId];

                                                        data3[temp]=source.PoAgencyState;
                                                        
                                                        pocCity[temp] = source.PoAgencyCity;
                                                        pocAgency[temp] = source.PoAgencyName;
                                                        poc_gov_class[temp] = source.PoGoverningClass;
                                                        pocInsurer[temp] = source.PoIssOffName;
                                                    });
                                            var reg = '^'+req.body.emZip;
                                            db.collection('Employer', function(err, collection) {
                                    collection.find({ emEmployerId: { $in: employerIds }, emZip:{ $regex: reg} }).toArray(function(err, data) {
                                        if (err) {

                                            res.json({ success: false, data: [], message: err });

            
                                        } else {
                                           data.forEach(function(item){

                                 
                                            item.effective_date = effective_date[item.emEmployerId].toLocaleDateString();
                                            item.cancel_date = cancel_date[item.emEmployerId];
                                            if(data3[item.emEmployerId]){
                                                item.PoAgencyState = data3[item.emEmployerId];
                                                } else{
                                                    item.PoAgencyState = '';
                                                }
                                            if(pocCity[item.emEmployerId]){
                                            item.pocCity = pocCity[item.emEmployerId];
                                            } else{
                                                item.pocCity = '';
                                            }
                                            if(pocAgency[item.emEmployerId]){
                                            item.pocAgency = pocAgency[item.emEmployerId];
                                            } else{
                                                item.pocAgency = '';
                                            }
                                            if(poc_gov_class[item.emEmployerId]){
                                            item.poc_gov_class = poc_gov_class[item.emEmployerId];
                                            } else{
                                                item.poc_gov_class = '';
                                            }
                                            if(pocInsurer[item.emEmployerId]){
                                            item.pocInsurer = pocInsurer[item.emEmployerId];
                                            } else{
                                                item.pocInsurer = '';
                                            }

                                               data1.push(item);
                                               
                                           });
                                           data1.forEach(function(delete1){
                                            delete delete1.emEmployerId;
                                            delete delete1.emDummy;
                                            delete delete1.emDateTime;
                                            delete delete1.emSystemId;
                                            delete delete1.emUserId;
                                            delete delete1.emSic;
                                            delete delete1.emCoverageStatus;
                                            delete delete1.emSuspenseInd;
                                            delete delete1.emPocCount;
                                            delete delete1.emExemptExist;
                                            delete delete1.emAkaExist;
                                            delete delete1.emPriorId;
                                            delete delete1.emUiNumber;
                                            delete delete1.emFeinSsn;
                                            delete delete1.mysqlIdEmployer;
                                            delete delete1.emStreet2;
                                            delete delete1.emCounty;
                                            delete delete1.emCountry;
                                            delete delete1.emMicrofilmId;
                                            delete delete1._id;
                                            delete delete1.emEmployerType;
                                            delete delete1.emLeasingInd;
                                             output.push(delete1);
                                  });
                                            
                                            res.json({ success: true, data: output, message: 'List.' });
                                        }
                                    });
                                });
                                        }
                                    });
                                });
                            }

                        });
                    });
                }

            }
            });
        });
router.post('/login', function(req, res, next) {
            m_client.connect(config.database.mongodb.url, function(err, db) {
                if (err) {
                    res.json({ success: false, data: [], message: err });
                } else {

                    
                    db.collection('AdminCollection', function(err, collection) {
                        collection.find({emailId:req.body.email,pass:req.body.pass}).toArray(function(err, data) {
                            if (err) {
                                
                                res.json({ success: false, data: [], message: err });
                            } else {
                                                    
                                if(data.length == 1)
                                {                     
                                    data.forEach(function(item){
                                    if(item.type == 'user')
                                    {
                                        var sess = req.session;
                                        sess.data= item;
                                        sess.is_user_logged_in = true;
                                        res.json({ success: true, data: data, message: 'List.' });
                                    }
                                    else if(item.type == 'admin'){
                                        var sess = req.session;

                                        sess.data= item;
                                        sess.is_admin_logged_in = true;
                                        res.json({ success: true, data: data, message: 'List.' });
                                    }
                                    else
                                    {                                        
                                        res.json({ success: false, data: 'Password Incorrect', message: 'List.' });
                                    }
                                    });
                                    
                                }
                                else
                                {
                                    res.json({ success: false, data: 'Email Id not Exist', message:'List.'});
                                }
                    

                }
            });
                    });
                }

                });
        });

    
        router.get('/backdoor', function(req, res){
            sess = req.session;
            
            if(isset(sess.is_admin_logged_in)){
            
                 res.json({ success: true, data: 'Session_created_for_admin', message: 'List.' });
             }
            else if(isset(sess.is_user_logged_in))
            {
                 res.json({ success: true, data: 'Session_created_for_user', message: 'List.' });
            }
            else{
                res.json({ success: false, data: 'Session not created', message: 'List.' });
            }
            
        });

        router.get('/logout',function(req,res){
            req.session.destroy(function(err) {
              if(err) {
                res.json({ success: false, data: 'error', message: 'List.' });
              } else {
                res.json({ success: true, data: 'Session destroy', message: 'List.' });
              }
            });

            });

        router.post('/saveData', function(req, res, next) {
                    m_client.connect(config.database.mongodb.url, function(err, db) {
                        if (err) {
                            res.json({ success: false, data: [], message: err });
                        } else {

                            db.collection('AdminCollection', function(err, collection) {
                        collection.find({emailId:req.body.emailId}).toArray(function(err, data) {
                            if (err) {
                                
                                res.json({ success: false, data: [], message: err });
                            } else {
                                
                                                    
                                if(data.length >= 1)
                                {
                    
                                    res.json({ success: false, data: 'Email Id Exist', message: 'List.' });
                                }
                                else
                                {
                                    db.collection("AdminCollection").insert({emailId:req.body.emailId,pass:req.body.pass,fullName:req.body.fullName,type:'user'}, function(err, resdb) {
                                    if(err) {
                                        resdb.json({ success: false, data: [], message: 'List.' });
                                      } else {
                                        res.json({ success: true, data: 'DataInserted', message: 'List.' });
                                      }
                          });
                                }
                    

                }
            });
                    });                           
                        }

                        });
                });

        router.post('/updateData', function(req, res, next) {
                    m_client.connect(config.database.mongodb.url, function(err, db) {
                        if (err) {
                            res.json({ success: false, data: [], message: err });
                        } else {

                                    db.collection("AdminCollection").update({_id: ObjectId(req.body._id)},{emailId:req.body.emailId,pass:req.body.pass,fullName:req.body.fullName,type:'user'}, function(err, resdb) {
                                    if(err) {
                                        resdb.json({ success: false, data: [], message: 'List.' });
                                      } else {
                                        res.json({ success: true, data: 'Dataupdated', message: 'List.' });
                                      }
                          });
                                
                        }

                        });
                });

        router.post('/deleteUser', function(req, res, next) {
                    m_client.connect(config.database.mongodb.url, function(err, db) {
                        if (err) {
                            res.json({ success: false, data: [], message: err });
                        } else {
                            

                            db.collection("AdminCollection").remove({_id: ObjectId(req.body._id)}, function(err, resdb) {
                                    if(err) {
                                        resdb.json({ success: false, data: [], message: 'List.' });
                                      } else {
                                        res.json({ success: true, data: 'datadeleted', message: 'List.' });
                                      }
                          });
                                
                        }

                        });
                });

        router.get('/get_users', function(req, res, next) {
                    m_client.connect(config.database.mongodb.url, function(err, db) {
                        if (err) {
                            res.json({ success: false, data: [], message: err });
                        } else {

                            db.collection('AdminCollection', function(err, collection) {
                        collection.find().toArray(function(err, data) {
                            if (err) {
                                
                                res.json({ success: false, data: [], message: err });
                            } else {
                                res.json({ success: true, data: data, message: 'List.' });
                            }
            });
                    });                           
                        }

                        });
                });

        app.use('/api/search', router);
    }
    module.exports = route;
})();