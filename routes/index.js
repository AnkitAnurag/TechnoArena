var express = require("express");
var router = express.Router();


//LANDING ROUTE
router.get("/", function(req, res){
	res.render("mainpage");	
});

router.get("/aboutus", function(req, res){
	res.render("aboutus");
});

router.get("/news", function(req, res){
	Posts.find({}, function(err, allPosts){
		if(err){
			console.log(err);
		}
		else {
			res.render("news", {posts : allPosts});
		}
	})
});

module.exports = router;