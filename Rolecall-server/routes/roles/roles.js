var express = require('express');
var rolesRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');

connectionString="mongodb://rolecallpro:rolecallpro@rolecallpro-shard-00-00-5cpm4.mongodb.net:27017,rolecallpro-shard-00-01-5cpm4.mongodb.net:27017,rolecallpro-shard-00-02-5cpm4.mongodb.net:27017/rolecallpro?ssl=true&replicaSet=RolecallPro-shard-0&authSource=admin&retryWrites=true&w=majority";

//connectionString = "mongodb+srv://rolecallpro:rolecallpro@rolecallpro-5cpm4.mongodb.net/test?retryWrites=true&w=majority";

const dbName = "rolecallpro";

rolesRouter.get('/all', function (req, res) {
    //connect to Mongo Client
    MongoClient.connect(connectionString, { useNewUrlParser: true }, function (err, client) {
        if (err) {
            console.log(err);
        }
        else {
            const db = client.db(dbName);
            db.collection("roles").find({}).toArray().
            then(function (data, err) {
                console.dir(data);
                res.send(data);
            });
        }
    });
});

rolesRouter.post('/addrole', function (req, res) {
    MongoClient.connect(connectionString, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        //var myobj = { name: "Student", permission: "Read"}; //req.body.role
        db.collection("roles").insertOne(req.body.role, (err, res) => {
            if (err) throw err;
            console.log("Role added successfully");
        });
    });
});

rolesRouter.post('/updaterole', function (req, res) {
    MongoClient.connect(connectionString, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        db.collection("roles").updateOne(req.body.role._id, req.body.role, (err, res) => {
            if (err) throw err;
            console.log("Role updated successfully");
        });
    });
});

module.exports = rolesRouter;
