var express = require('express');
var categoriesRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var mongo=require('mongodb');
connectionString="mongodb://rolecallpro:rolecallpro@rolecallpro-shard-00-00-5cpm4.mongodb.net:27017,rolecallpro-shard-00-01-5cpm4.mongodb.net:27017,rolecallpro-shard-00-02-5cpm4.mongodb.net:27017/rolecallpro?ssl=true&replicaSet=RolecallPro-shard-0&authSource=admin&retryWrites=true&w=majority";
/*
var authenticate=require('../../common/authenticate');
*/
// middleware specific to this router
/*rolesRouter.use(function timeLog (req, res, next) {
    authenticate(req,res,next)
});*/
// Get  call categories

categoriesRouter.get('/all', function (req, res) {
        MongoClient.connect(connectionString).then(function (db) {
            db.collection('categories').find().toArray(function (err, result) {
                if(err) console.log(err);
                console.log(result);
            });
        });
    });
//Add Categories
categoriesRouter.post('/', function (req, res, next) {
    MongoClient.connect(connectionString).then(function (db) {
        db.collection('categories').insertMany(req.body, function (err, post) {
            if (err) console.log(err);
            console.log('inserted');
        });
    });
});

//Delete category by id
categoriesRouter.delete('/', function (req, res, next) {
    MongoClient.connect(connectionString).then(function (db) {
        var body = {_id:'5d1a24ef0873544a109abefb'};
        db.collection('categories').remove(body, function (err, post) {
            if (err) console.log(err);
            console.log('inserted');
        });
    });
});

//Update category by id
categoriesRouter.put('/', function (req, res, next) {
    MongoClient.connect(connectionString).then(function (db) {
        //var body = [{questionId:'5d1a24ef0873544a109abefb'}];
        db.collection('categories').findByIdAndUpdate(req.body._id,req.body, function (err, post) {
            if (err) console.log(err);
            console.log('updated');
        });
    });
});


function MongoException(msg){
    this.msg=msg;
    this.name="Mongo Exception";
}

module.exports=categoriesRouter;
