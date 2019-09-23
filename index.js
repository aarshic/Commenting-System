var express=require("express");
var bodyparser  =require("body-parser");
var mongoose=require("mongoose");
var app=express();

mongoose.connect("mongodb://localhost/commentingsystem", {
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
