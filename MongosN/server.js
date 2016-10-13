var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var app=express();

mongoose.connect("mongodb://localhost/postmanager");
var PostsSchema = new mongoose.Schema({
  title : String,
  description: String
});

var Posts = mongoose.model("posts",PostsSchema);

app.get("/posts", function(req,res){
  Posts.find({},function(err,docs){
    if(err) throw err;
    res.send(docs);
  });
});
app.post("/posts", function(req, res){
  var post = new Posts({
    title :req.body.title,
    description :req.body.description
   }).save(function(err,docs){
    if(err) throw err;
    res.send(docs);
  });
});
app.put("/posts/:id", function(req,res){
  var id = req.params.id;
  Posts.findById(id, function(err, post) {
      if(err) throw err;
      post.title = req.body.title,
      post.description = req.body.description
      post.save(function(err) {
        if(err) throw err;
        res.send(contact);
      });
    });
});



app.delete("/posts/:id", function(req,res){
  var id = req.params.id;
  Posts.findById(id, function(err, post) {
      post.remove(function(err) {
        if(err) throw err;

      });
    });
});



app.listen(3000);