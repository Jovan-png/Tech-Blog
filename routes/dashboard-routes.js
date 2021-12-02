const router = require('express').Router()
const sequelize = require('../config/connection');
const { Post, User, Comment} = require('../models');




router.get('/', (req,res)=>{
    console.log(req.session)
    Post.findAll({
        where:{
          user_id: req.session.user_id
        },
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
        res.render('dashboard', {posts})
    })
    .catch(err=>{
    console.log(err)
    })
})

router.get('/edit/:id', (req,res)=>{
Post.findOne({
    where:{
        id: req.params.id
    },
    attributes: ['id','title','text'],
    include:[{
        model: Comment,
        attributes:['id','c_text','user_id','post_id'],
        include:{
            model: User,
            attributes: ['username']
        }
    }]
})
.then(postData=>{
    if(!postData){
        res.status(404)
        return;
    }
    const post = postData.get({plain: true})
    res.render('edit-post', {post})
})
.catch(err =>{
    console.log(err)
})
})

module.exports = router;