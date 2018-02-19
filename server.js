var express = require( "express");
// Create the express app.
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/quo');
mongoose.Promise = global.Promise;
var UserSchema = new mongoose.Schema({
    name: String,
    age: String,
    created_at: { type: Date, default: Date.now },
})
mongoose.model('User', UserSchema);

var User = mongoose.model('User')
// require path
var path = require('path');
//setting our static folder directory
app.use(express.static(path.join(__dirname, './static')));
//setting our views folder directory
app.set('views', path.join(__dirname, './views'));
//setting our view engine set to EJS
app.set('view engine', 'ejs');
//routes
//root request 
app.get('/', function(req, res) {
   User.find({},function(err,users){
       if(err){
           console.log('errors')
       }else{
           res.render('index',{users:users})
       }

   })
})
app.get('/a', function(req, res) {
    User.find({},function(err,users){
        if(err){
            console.log('errors')
        }else{
            res.json({message: "Success", data: users})
        }
 
    })
 })


app.post('/create', function(req, res){
    //User.remove({}, function(err){
    // })
    var user = new User(req.body);
    user.save(function(err){
        if(err){
            console.log('something went wrong');
        }else {
            console.log('successfully added a user!');
        res.redirect('/');
        }
    })
})
app.get('/show', function(req, res){
    User.find({}).sort({created_at:-1}).exec(function(err,users){
        res.render('quotes',{users:users});
    })
})
//add User request
//app.post('/users', function(req, res){
//      console.log("POST DATA", req.body);
//       // this is where we would add the user from req.body to the database.
//        res.redirect('/');
// })
//setting our server to listen on port: 8000
app.listen(8000, function(){
    console.log("listening on port 8000");
})



   
