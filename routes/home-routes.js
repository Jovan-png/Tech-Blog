const router = require('express').Router()
const sequelize = require('../config/connection');
const { Post, User, Comment} = require('../models');


router.get('/', (req,res)=>{
    console.log(req.session)
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
        res.render('homepage', {
            posts,
            LoggedIn: req.session.LoggedIn
        })
    })
    .catch(err=>{
    console.log(err)
    })
})

router.get('/post/:id', (req,res)=>{
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
    res.render('one-post', {post})
})
.catch(err =>{
    console.log(err)
})
})

router.get('/login',(req,res)=>{
    if(req.session.LoggedIn){
        res.redirect('/');
        return
    }
    
    res.render('login')
})

router.get('/logout',(req,res)=>{
    if(req.session.LoggedIn){
        res.redirect('/')
     req.session.destroy(()=>{
         res.status(204).end()
     });
    }else{
        res.redirect('/')
        res.status(404).end
    }
})

module.exports = router;