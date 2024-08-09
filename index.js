import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

let allPosts = {};
let nextId = 1

app.get("/", (req, res) => {
    res.render('index.ejs', { blog: allPosts })
});

app.get("/blog/:post_id", (req, res) => {
    var post_id = req.params.post_id;
    res.render('blog.ejs', {blog: allPosts[post_id]})
});

app.post('/submit-post', (req, res) => {
    const post_title = req.body.title;
    const post_content = req.body.content;

    let todayDate = new Date().toLocaleString()
    
    allPosts[nextId] = {name: post_title, content: post_content, date: todayDate}
    nextId++;

    res.render('index.ejs', { blog: allPosts })
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});