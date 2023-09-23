const express = require("express");
const router = express.Router();
const Post = require('../models/post');

/**
 * GET /
 * HOME
 */
//Routes
router.get('', async(req,res) => {
    const locals = {
        title: "NodeJs Blog",
        description: "Simple Blog created with NodeJS, Express & MongoDB."
    }
    try {
        const data = await Post.find();
        res.render('index', { locals, data });
    } catch (error) {
        console.log(error);
    }
});













router.get('/about', (req, res) => {
    res.sender('about');
});

// function insertPostData () {
//     Post.insertMany([
        
//         {
//             title: "MVC",
//             body: "Introduction tO MVC"
//         },
//         {
//             title: "ExpressJs",
//             body: "Introduction tO Express"
//         },
//         {
//             title: "ReactJs",
//             body: "Introduction tO ReactJs"
//         },
//         {
//             title: "VueJS",
//             body: "Introduction tO VueJs"
//         },
//         {
//             title: "MongoDB",
//             body: "Introduction tO mongodb"
//         },
//         {
//             title: "React native",
//             body: "Introduction tO React native"
//         },
//     ])
// }
// insertPostData ();

module.exports = router;