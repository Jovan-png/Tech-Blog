const router = require('express').Router()
const sequelize = require('../config/connection');
const { Post, User,} = require('../models');


router.get('/', (req,res)=>{
    Post.findAll({
        attributes: [
            'id',
            'title',
            'text'
        ],
        include:{
            model: User,
            attributes:['username']
        }
    })
    .then(postData =>{
        console.log(postData)
        const posts = postData.map(post=> post.get({plain: true}))
        res.render('homepage', {posts})
    })
    .catch(err=>{
    console.log(err)
    })
})
router.get('/login',(req,res)=>{
    res.render('login')
})

module.exports = router;