var express = require('express');
var usersRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');

connectionString="mongodb://rolecallpro:rolecallpro@rolecallpro-shard-00-00-5cpm4.mongodb.net:27017,rolecallpro-shard-00-01-5cpm4.mongodb.net:27017,rolecallpro-shard-00-02-5cpm4.mongodb.net:27017/rolecallpro?ssl=true&replicaSet=RolecallPro-shard-0&authSource=admin&retryWrites=true&w=majority";

//connectionString = "mongodb+srv://rolecallpro:rolecallpro@rolecallpro-5cpm4.mongodb.net/test?retryWrites=true&w=majority";

const dbName = "rolecallpro";

usersRouter.get('/all', function (req, res) {
    //connect to Mongo Client
    MongoClient.connect(connectionString, { useNewUrlParser: true }, function (err, client) {
        if (err) {
            console.log(err);
        }
        else {
        const db = client.db(dbName);
        // const collection = db.collection("users");
            db.collection("users").find({}).toArray().
            then(function (data, err) {
                console.dir(data);
                res.send(data);
            });
        }
    });
});

usersRouter.post('/adduser', function (req, res) {
    MongoClient.connect(connectionString, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        //var myobj = { fname: "Neha", lname: "Navgale", address: "Kansas City", ph: "9135498103", email: "nn78d@mail.umkc.edu"};
        db.collection("users").insertOne(req.body.user, (err, res) => {
            if (err) throw err;
            console.log("User added successfully");
        });
    });
});

usersRouter.post('/updateuser', function (req, res) {
    MongoClient.connect(connectionString, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        db.collection("users").updateOne(req.body.user._id, req.body.user, (err, res) => {
            if (err) throw err;
            console.log("User details updated");
        });
    });
});

module.exports = usersRouter;
