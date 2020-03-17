var express = require("express");
var router = express.Router();
var moment = require('moment');

const Posts = require('../models/posts');

//LANDING ROUTE
router.get("/", function(req, res){
	res.render("mainpage");	
});

router.get("/aboutus", function(req, res){
	res.render("aboutus");
});

router.get("/latestnews/new",function(req,res){
	res.render("addnews", {moment: moment});
});
router.post("/latestnews",isLoggedIn,function(req, res){
    var source = req.body.source;
	var name = req.body.name;
	var image = req.body.image;
    var desc = req.body.description;
    var date = req.body.date;
	var newObj = {name: name , image: image, description: desc, date: date, source:source};
	Posts.create(newObj, function(err,newlyobj){
	if(err){
		console.log("Aghh error!");
		console.log(err);
	}
	else{
		console.log("Blog added succesfully!")	
		console.log(newlyobj);
		res.redirect("/news");
	}
	});
});

//News Page

router.get("/news",function(req,res){
    Posts.find({}).sort('-date').exec(function(err, posts){
        if(err){
            console.log(err);
        }
        else{
            res.render("newspage",{posts:posts});
        }
    });
});


router.get("/news/:id",function(req,res){
	Promise.all([
		Posts.findById(req.params.id),
		Posts.find({})
	]).then(([posts,news])=>{
		console.log("Posts=====>"+posts+"News =====>"+news);
		res.render("displaypage",{posts:posts,news:news})
	});
});

//Authentication Middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
    }
}

module.exports = router;