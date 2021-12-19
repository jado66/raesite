var router = require('express').Router();
const blog_posts_path = '../blog_posts';

const fs = require('fs')

router.post('/', function (req, res) {

    console.log("Request recieved:")
    console.log(req.body)
    console.log("Request recieved:")

    // console.log("Post Title: " + title);
    // console.log("Post Date: " + req.body.date);
    // console.log("Post Body: " + postBody);

    let blogPost = {}

    let fileTitle = req.body.postTitle.replace(/ /g,"_");
    blogPost.title = req.body.postTitle;
    blogPost.date = req.body.postDate;
    blogPost.body = req.body.postBody;
    blogPost.caption = blogPost.body.slice(0,225)

    // TODO create a json object with the date, body, and where images go

    let blogPostCount = fs.readdirSync(blog_posts_path).length

    console.log(`There are ${blogPostCount} blog posts`)

    fs.writeFile(blog_posts_path+`/${blogPostCount+1}-${fileTitle}`, JSON.stringify(blogPost,null,4), function (err) {
        if (err){
            console.log(err)
            res.send(err);
            throw err;
        } 
        console.log('File is created successfully.')
        res.send('File is created successfully.');
      });
    
      console.log("success")
    //   res.redirect('http://localhost:3000/admin')
});

module.exports = router;