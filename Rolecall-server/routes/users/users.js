var express = require('express');
var usersRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var mongo=require('mongodb');
//connectionString="mongodb://rolecallpro:rolecallpro@rolecallpro-shard-00-00-5cpm4.mongodb.net:27017,rolecallpro-shard-00-01-5cpm4.mongodb.net:27017,rolecallpro-shard-00-02-5cpm4.mongodb.net:27017/rolecallpro?ssl=true&replicaSet=RolecallPro-shard-0&authSource=admin&retryWrites=true&w=majority";

connectionString = "mongodb+srv://rolecallpro:rolecallpro@rolecallpro-5cpm4.mongodb.net/test?retryWrites=true&w=majority";

// Get  user by id
usersRouter.get('/all', function (req, res) {
    //connect to Mongo Client
    MongoClient.connect(connectionString).
    then(function (db) {
        db.collection("users").find({}).toArray().
        then(function (data, err) {
            console.dir(data[0].fname)
            res.send(data[0].fname)
        });
    }).catch(err => {
        console.log(err)
        res.send(409, err)
    });
});

usersRouter.post('/adduser', function (req, res) {
    MongoClient.connect(connectionString).
    then(function (db) {
        db.collection("users").insert(req.body.user, (err, res) => {
            if (err) throw err;
            console.log("User added successfully");
            db.close();
        });
    }).catch(err => console.log(err));

});

usersRouter.post('/updateuser', function (req, res) {
    MongoClient.connect(connectionString).
    then(function (db) {
        db.collection("users").updateOne(req.body.user._id, req.body.user, (err, res) => {
            if (err) throw err;
            console.log("User details updated");
            db.close();
        });
    }).catch(err => console.log(err));
});

module.exports = usersRouter;
