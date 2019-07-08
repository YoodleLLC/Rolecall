var express = require('express');
var organizationsRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');


connectionString="mongodb://rolecallpro:rolecallpro@rolecallpro-shard-00-00-5cpm4.mongodb.net:27017,rolecallpro-shard-00-01-5cpm4.mongodb.net:27017,rolecallpro-shard-00-02-5cpm4.mongodb.net:27017/rolecallpro?ssl=true&replicaSet=RolecallPro-shard-0&authSource=admin&retryWrites=true&w=majority";

//connectionString = "mongodb+srv://rolecallpro:rolecallpro@rolecallpro-5cpm4.mongodb.net/test?retryWrites=true&w=majority";

const dbName = "rolecallpro";

organizationsRouter.get('/all', function (req, res) {
    //connect to Mongo Client
    MongoClient.connect(connectionString, { useNewUrlParser: true }, function (err, client) {
        if (err) {
            console.log(err);
        }
        else {
            const db = client.db(dbName);
            db.collection("organizations").find({}).toArray().
            then(function (data, err) {
                console.dir(data);
                res.send(data);
            });
        }
    });
});

organizationsRouter.post('/addorganization', function (req, res) {
    MongoClient.connect(connectionString, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        //var myobj = { name: "UMKC", address: "Kansas City", ph: "9135498103", admin: "Neha"}; //req.body.organization
        db.collection("organizations").insertOne(req.body.organization, (err, res) => {
            if (err) throw err;
            console.log("Organization added successfully");
        });
    });
});

organizationsRouter.post('/updateorganization', function (req, res) {
    MongoClient.connect(connectionString, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        db.collection("organizations").updateOne(req.body.organization._id, req.body.organization, (err, res) => {
            if (err) throw err;
            console.log("Organization updated successfully");
        });
    });

});



module.exports = organizationsRouter;
