var router = require('express').Router();

const blog_posts_path = '../blog_posts';

const fs = require('fs')

router.get('/', function(req, res) {

    // Get file from directory
    fs.readdir(blog_posts_path, function (err, files) {
        res.send(`${files.length}`)
        // res.send(files.length)   
    });
})

module.exports = router;