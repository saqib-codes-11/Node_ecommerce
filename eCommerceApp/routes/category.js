
var express = require('express');
var products = express.Router();
var MongoClient = require('mongodb').MongoClient




exports.show = function(req, res){

var subcat = req.params.subcat;
var prodCatResGlobal=[];
var subCatResGlobal;
var distinctCatSubCatGlobal;
var allProdGlobal = [];


 console.log( "Sub Cat Selected : " + subcat);

	 if(subcat!=null) {

        MongoClient.connect('mongodb://root@localhost:27017/cmpe226', function (err, db) {
        if (err) {
            console.log(err);
            throw err;
        } else {        
            console.log("successfully connected to the database");

            var collection = db.collection('catalouge');
            //console.log(prod);

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

               collection.find({'productSubCat': subcat} ,function (err, allProductSubCat) {
               console.log("product found :" + allProductSubCat);


                allProductSubCat.each(function(error,prod){
                      "use strict"
                      if(err) throw err;
                      if(prod==null){
                          return;
                      }
                        console.log(prod);
                        allProdGlobal.push(prod);
                   });

               //console.dir("category called : " + allProductSubCat);
            //   res.render('index', { title: 'Arun Malik' , allProducts:  allProductGlobal, distinctCatSubCat : distinctCatSubCatGlobal, category : prodCatResGlobal, subCategory : subCatResGlobal});

            
        });

              collection.aggregate( [{"$group":{"_id": {productCat : "$productCat", productSubCat : "$productSubCat" }}}] ,function(err, distinctCatSubCat) {
                console.dir(distinctCatSubCat);
                distinctCatSubCatGlobal = distinctCatSubCat;
               // db.close();

               res.render('category', { title: 'Arun Malik' , category : prodCatResGlobal, subCategory : subCatResGlobal , distinctCatSubCat : distinctCatSubCatGlobal, allProducts: allProdGlobal });
            });


             

           }         
    });
    }
	 


}