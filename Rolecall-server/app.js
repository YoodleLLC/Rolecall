var express=require('express');
var app=express();
var MongoClient=require('mongodb').MongoClient;
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var router = express.Router();
var cors = require('cors');
var morgan  = require('morgan');
var session=require('express-session');


var categories=require("./routes/categories/categories");
var questions=require("./routes/questions/questions");
var users=require("./routes/users/users");



//setting port for server
app.set('port',process.env.PORT || 5000);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials",true);
    next();
});

app.use(cookieParser())
app.use(morgan('combined'))
// middleware for body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 3600000,secure: false},
    // store: new MongoStore({
    //     url:"mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle",
    //   })
}))


//middlerware to log time and requested method
app.use(log);

app.use("/categories/categories",categories);
app.use("/questions/questions",questions);
app.use("/users/users",users);

app.get('/', (req, res) => res.send('Hello World!'))

function log(req,res,next){
    console.log(new Date(),req.method,req.url);
    next();
}

function helloWorld(req,res,next){
    res.send("Hi there");
    next();
}

try {
    var server =app.listen(app.get('port'),function(err){
        console.log("server is running on port: "+app.get('port'));
    });
} catch (err) {
    console.log(err)
}
