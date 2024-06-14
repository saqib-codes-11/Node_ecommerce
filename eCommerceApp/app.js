var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
// var users = require('./routes/users');
// var shop = require('./routes/shop');
var products = require('./routes/products');
var category = require('./routes/category');
var search = require('./routes/search');

var http = require('http');

var app = express();

// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// app.use('/users', users);
//app.use('/products', products);
//app.get('/shop/:id',shop.show);
//app.use('/products/:id', products);

app.use('/products/:id', products.show);
app.use('/category/:subcat', category.show);
app.use('/search/:text', search.show);


//  function(req,res){

// var prodGlobal;
// var MongoClient = require('mongodb').MongoClient, format = require('util').format;
// var prod = req.params.id;
   
// console.log( "product querystring: " + prod);
// // console.log(prod.productName);

// if(prod!=null) {

//         MongoClient.connect('mongodb://root:root@oceanic.mongohq.com:10064/cmpe226', function (err, db) {
//         if (err) {
//             console.log(err);
//             throw err;
//         } else {        
//             console.log("successfully connected to the database");

//             var collection = db.collection('catalogue');

//                     collection.findOne({'productName': prod} , function(err, productFound) {
//                            console.log("product found :" + productFound);
//                           // console.log("product found :" +productFound.productName);
//                            prodGlobal = productFound;    
//                           //db.close();

//                        });
//                 }}); 


//     }

//                                      console.log("execute render proglobalLog not null check: "+ prodGlobal);
                    
//                                     if(prodGlobal !=null){
//                                         console.log("execute render proglobalLog  null check: "+ prodGlobal);

//                                         res.render('product', { title: 'Arun Malik' , product : prodGlobal});
//                                       }

// });

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


// Pass middleware to use in the server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
