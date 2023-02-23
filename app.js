const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({
    extended: true
  }));
mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true});

const articleSchema ={
    title:String,
    content:String
}



const Article = mongoose.model("article",articleSchema);



app.route("/articles")
  .get(function (req, res) {
    Article.find({}, function (err, foundarticle) {
      if (err) {
        res.send(err);
      } else {
        res.send(foundarticle);
      }
    });
  })

  .post(function (req, res) {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    article.save(function (err) {
      if (err) {
        res.send("Sucessfully");
      } else {
        res.send(error);
      }
    });
  })

  .delete(function (req, res) {
    Article.deleteMany({}, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Sucessfully Deleted");
      }
    });
  });
    




app.route("/articles/:articletitle")
    .get(function(req,res){
        
        Article.findOne({title:req.params.articletitle},function(err,foundarticle){
            if(foundarticle){
                res.send(foundarticle);
            }
            else{
                res.send("Not found");
            }
        })

    })


    .put(function(req,res){
        Article.updateOne(
            {title:req.params.articletitle},
            {title:req.body.title,content:req.body.content},
            function(err){
            if(err){
                res.send(err);
            }
            else{
                res.send("Updation Sucessful");
            }    
        }
        );
    })
    
    .patch(function(req,res){
        Article.updateOne(
            {title:req.params.articletitle},
            {title:req.body.title,content:req.body.content},
            function(err){
            if(err){
                res.send(err);
            }
            else{
                res.send("Updation Sucessful");
            }    
        }
        );
    })



    .delete(function(req,res){
        Article.deleteOne({title:req.params.articletitle},function(err){
            if(err){
                res.send(err);
            }
            else{
                res.send("Deleted Sucessfully");
            }
        })
    });






app.use(express.static("public"));

//TODO

app.listen(3000, function() {
  console.log("Server started on port 3000");
});