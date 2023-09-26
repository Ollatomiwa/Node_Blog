const express = require("express");
const router = express.Router();
const Post = require('../models/post');

/**
 * GET /
 * HOME
 */
//Routes
//WITH PAGINATIONS
router.get('', async(req,res) => {
    try {
        const locals = {
            title: "NodeJs Blog",
            description: "Simple Blog created with NodeJS, Express & MongoDB."
        }
        

        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{  $sort: { createdAt: -1}}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();


        const count = await Post.count();
        const nextPage = parseInt(page) + 1;
        const hasNewPage = nextPage <=  Math.ceil(count / perPage); 

        res.render('index', { 
            locals, 
            data ,
            current: page,
            nextPage: hasNewPage ? nextPage : null
        });
    } catch (error) {
        console.log(error);
    }
});

/**
 * GET /
 * POST:_ID
 */
router.get('/post/:id', async(req,res) => {
    try {
        
        let slug = req.params.id;
        
        const data = await Post.findById({ _id: slug});

        const locals = {
            title: data.title,
            description: "Simple Blog created with NodeJS, Express & MongoDB."
        }
        res.render('post', { locals, data });
    } catch (error) {
        console.log(error);
    }
});

/**
 * POST /
 * Post: Search
 */

router.post('/search', async(req,res) => {
    try {
        const locals = {
            title: "Search",
            description: "Simple Blog created with NodeJS, Express & MongoDB."
        }
        
        let searchTerm = req.body.searchTerm;
        const searchNoSpcialChar = searchTerm.replace (/[*a-zA-Z0-9]/g, "")



        const data = await Post.find({
            $or : [
                {title:{$regex: new RegExp(searchNoSpcialChar, 'i')}},
                {body:{$regex: new RegExp(searchNoSpcialChar, 'i')}}
            ]
        });
        res.render('search', { locals, data });
    } catch (error) {
        console.log(error);
    }
})





































// without pagination
// router.get('', async(req,res) => {
//     const locals = {
//         title: "NodeJs Blog",
//         description: "Simple Blog created with NodeJS, Express & MongoDB."
//     }
//     try {
        
//         const data = await Post.find();
//         res.render('index', { locals, data });
//     } catch (error) {
//         console.log(error);
//     }
// });

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