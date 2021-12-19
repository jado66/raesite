const { json } = require("express");
var express = require("express");
var router = express.Router({ mergeParams: true });

const blog_posts_path = '../blog_posts';

const fs = require('fs')

router.get('/', function(req, res) {
    
    let blogID = req.query.blogID

    blogFile = null;

    // Get file from directory
    fs.readdir(blog_posts_path, function (err, files) {
        if (err) {
          console.log(err);
          return;
        }
        for (var i = 0; i < files.length; i++){
            if (files[i].split('-')[0] == `${blogID}`){
                blogFile = files[i];
                console.log("Found file - "+blogFile)
                
                if (blogFile){
                    fs.readFile(blog_posts_path+ "/"+blogFile, 'utf8', function (err,data) {
                        if (err) {
                            console.log("Problem with file")
                            return console.log(err);
                        }
                        // console.log(data);
                        // let blogObject = JSON.parse(data); 
                        // console.log(JSON.stringify(blogObject))
                        res.json(data);
                    });
                    // res.send("API is working properly");
                }
                else{
                    res.send("No File Found");
                }
                break;
            }
        }
    });    
});

module.exports = router;