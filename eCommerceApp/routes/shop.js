var express = require('express');
var router = express.Router();


var allProdGlobal;
var prodCatResGlobal;
var subCatResGlobal;
var distinctCatSubCatGlobal;
//mongo connect

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;


exports.show = function(req, res){

    MongoClient.connect('mongodb://root@localhost:27017/cmpe226', function (err, db) {
    if (err) {
        console.log(err);
        throw err;
    } else {        
        console.log("successfully connected to the database");

          var collection = db.collection('catalouge');

           collection.find( {"productSubCat" : req.params('id') } ,function(err, allProd) {
                console.dir(allProd);
                allProdGlobal = allProd;

               res.send(allProdGlobal);
            });
       }

    })

};

   
//     MongoClient.connect('mongodb://root:root@oceanic.mongohq.com:10064/cmpe226', function (err, db) {
//     if (err) {
//         console.log(err);
//         throw err;
//     } else {        
//         console.log("successfully connected to the database");

//         var collection = db.collection('catalogue');

//                 collection.distinct('productCat',function(err, prodCatRes) {
//                 console.dir(prodCatRes);
//                  //db.close();
//                 prodCatResGlobal = prodCatRes;
//             });

                
//                  collection.distinct('productSubCat',function(err, subCatRes) {
//                 console.dir(subCatRes);
//                 subCatResGlobal = subCatRes;
//                // db.close();
//             });

// //db.catalogue.aggregate([{"$group":{"_id": {productCat : "$productCat", productSubCat : "$productSubCat" }}}])

//                 collection.aggregate( [{"$group":{"_id": {productCat : "$productCat", productSubCat : "$productSubCat" }}}] ,function(err, distinctCatSubCat) {
//                 console.dir(distinctCatSubCat);
//                 distinctCatSubCatGlobal = distinctCatSubCat;
//                // db.close();
//             });

        //db.close();
           
    //     }
    //     //db.close();
    // }); 

/* GET home page. */
router.get('/shop/:id', function(req, res) {
  res.render('shop' , {id : req.params.id ,title: 'Arun Malik' , category : prodCatResGlobal, subCategory : subCatResGlobal , distinctCatSubCat : distinctCatSubCatGlobal  } );
 // res.render('index', { title: 'Arun Malik' , category : prodCatResGlobal, subCategory : subCatResGlobal , distinctCatSubCat : distinctCatSubCatGlobal });
});


