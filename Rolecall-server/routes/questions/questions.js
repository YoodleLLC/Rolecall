var express = require('express');
var questionsRouter = express.Router();
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

// Get  call questions
    questionsRouter.get('/all', function (req, res) {
        MongoClient.connect(connectionString).then(function (db) {
            db.collection('questions').find().toArray(function (err, result) {
                if(err) console.log(err);
                console.log(result);
            });
        });
    });

//Add questions
questionsRouter.post('/', function (req, res, next) {
    MongoClient.connect(connectionString).then(function (db) {
        db.collection('questions').insertMany(req.body, function (err, post) {
            if (err) console.log(err);
            console.log('inserted');
        });
    });
});

//Delete question by id
questionsRouter.delete('/', function (req, res, next) {
    MongoClient.connect(connectionString).then(function (db) {
        db.collection('questions').remove(req.body, function (err, post) {
            if (err) console.log(err);
            console.log('inserted');
        });
    });
});


function MongoException(msg){
    this.msg=msg;
    this.name="Mongo Exception";
}

module.exports=questionsRouter;
