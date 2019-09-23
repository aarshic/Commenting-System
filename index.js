var express=require("express");
var bodyparser  =require("body-parser");
var mongoose=require("mongoose");
var app=express();

mongoose.connect("mongodb://localhost/mydb", {
    useNewUrlParser: true
  }).then(() => {
    console.log("Successfully connected to the database");    
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

var CommentSchema=mongoose.Schema({
    name:String,
    body:String,
    upvote:Number,
    downvote:Number
});

var comments=mongoose.model("Comments",CommentSchema);

app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.get("/",function(req,res){
	comments.find({}, function(err,allComments){
        if(err)
            console.log(err);
        else
            res.render("index",{commented:allComments});
	});
});


app.post("/",function(req,res){
    var n= req.body.auth;
    var bdy= req.body.txtcom;
    console.log(res.body);
    var newComment= {name:n,body:bdy,upvote:0,downvote:0};
    
    console.log(newComment);
	comments.create(newComment,function(err,camp){
        if(err)
            console.log(err);
        else
            res.redirect("/");
    });
});
app.post("/upvote",function(req,res){
	var id=req.body.id;
	var old=Number(req.body.val);
    comments.findByIdAndUpdate(id,{upvote: old+1},function(err,res){
        if(err)
            console.log(err);
    });
	res.redirect("/");
});


app.post("/downvote",function(req,res) {
    var id=req.body.id;
    var old=Number(req.body.val);
    console.log(req.body);
    comments.findByIdAndUpdate(id,{downvote: old+1},function(err,res){
        if(err)
            console.log(err);
    });
	res.redirect("/");
});

app.listen(8080,function(req,res){
	console.log("Server started successfully");
});
