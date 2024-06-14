var express = require('express');
var router = express.Router();



//mongo connect



exports.show = function(req, res){


var searchtext = req.params.text;

var prodCatResGlobal =[];
var subCatResGlobal;
var distinctCatSubCatGlobal;
var allProdGlobal = [];

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

                

//                collection.runCommand("text" , {search : searchtext},function(err, allProdCursor) {

                  db.command({text:"catalouge" , search: searchtext },function(err, allProdCursor) {  



                   // allProdCursor.results.toArray().each(function(error,prod){
                   //    "use strict"
                   //    if(err) throw err;
                   //    if(prod==null){
                   //        return;
                   //    }
                   //      console.log(prod);
                   //      allProdGlobal.push(prod.obj);
                   // });

                  for (var result in allProdCursor.results)
                    {
                      //console.log(res);
                      
                          allProdGlobal.push(allProdCursor.results[result].obj);
                      
                    }

                     console.log(allProdGlobal);

                      res.render('search', { title: 'Arun Malik' , category : prodCatResGlobal, subCategory : subCatResGlobal , distinctCatSubCat : distinctCatSubCatGlobal, allProducts: allProdGlobal });


                   });

             
                   // console.log(allProd.toArray());

                  // Object.keys(allProd).forEach( function(prod) {
                  //     console.log(prod);
                  // });

              //  allProdGlobal = allProdCursor;
               // db.close();
            //});

        //db.close();
           
    }
    //db.close();
}); 

 };

