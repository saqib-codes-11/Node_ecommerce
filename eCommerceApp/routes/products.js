var express = require('express');
var products = express.Router();



// products.get('/products/:id' , function(req, res) {


//     var prod = req.params.id;
//     // console.log(prod);
//     // console.log(prod.prodName);
//   res.render('product', { title: 'Arun Malik' , product : prod});


//   //res.send('products tst');
//   // res.render('index', { title: 'Arun Malik' , category : prodCatResGlobal, subCategory : subCatResGlobal , distinctCatSubCat : distinctCatSubCatGlobal, allProducts: allProdGlobal });
// });

// module.exports = products;

var MongoClient = require('mongodb').MongoClient

exports.show = function(req, res){

	 var prod = req.params.id;
	 var prodCatResGlobal, subCatResGlobal ,distinctCatSubCatGlobal;

	if(prod!=null) {

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

              collection.aggregate( [{"$group":{"_id": {productCat : "$productCat", productSubCat : "$productSubCat" }}}] ,function(err, distinctCatSubCat) {
                console.dir(distinctCatSubCat);
                distinctCatSubCatGlobal = distinctCatSubCat;
               // db.close();
            });


            collection.findOne({'productName': prod} ,function (err, productFound) {
            	 console.log("product found :" + productFound);
            	 res.render('product', { title: 'Arun Malik' , product : productFound, distinctCatSubCat : distinctCatSubCatGlobal, category : prodCatResGlobal, subCategory : subCatResGlobal});
  			});  

           }         
    });
    }
	  
    
};








