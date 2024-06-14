var express = require('express');
var router = express.Router();


var prodCatResGlobal;
var subCatResGlobal;
var distinctCatSubCatGlobal;
var allProdGlobal = [];
//mongo connect

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;


   
    MongoClient.connect('mongodb://root@localhost:27017/cmpe226', function (err, db) {
    if (err) {
        console.log(err);
        throw err;
    } else {        
        console.log("successfully connected to the database");

        var collection = db.collection('catalouge');

                collection.distinct('productCat',function(err, prodCatRes) {
                console.dir(prodCatRes);
                 //db.close();
                prodCatResGlobal = prodCatRes;
            });

                
                 collection.distinct('productSubCat',function(err, subCatRes) {
                console.dir(subCatRes);
                subCatResGlobal = subCatRes;
               // db.close();
            });

//db.catalogue.aggregate([{"$group":{"_id": {productCat : "$productCat", productSubCat : "$productSubCat" }}}])

                collection.aggregate( [{"$group":{"_id": {productCat : "$productCat", productSubCat : "$productSubCat" }}}] ,function(err, distinctCatSubCat) {
                console.dir(distinctCatSubCat);
                distinctCatSubCatGlobal = distinctCatSubCat;
               // db.close();
            });


                 collection.find( function(err, allProdCursor) {

                  allProdCursor.each(function(error,prod){
                      "use strict"
                      if(err) throw err;
                      if(prod==null){
                          return;
                      }
                        console.log(prod);
                        allProdGlobal.push(prod);
                   });

                   // console.log(allProd.toArray());

                  // Object.keys(allProd).forEach( function(prod) {
                  //     console.log(prod);
                  // });

              //  allProdGlobal = allProdCursor;
               // db.close();
            });

        //db.close();
           
    }
    //db.close();
}); 

/* GET home page. */
router.get('/', function(req, res) {

  res.render('index', { title: 'Arun Malik' , category : prodCatResGlobal, subCategory : subCatResGlobal , distinctCatSubCat : distinctCatSubCatGlobal, allProducts: allProdGlobal });
});

module.exports = router;
