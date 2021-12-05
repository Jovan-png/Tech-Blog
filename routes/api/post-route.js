const router = require('express').Router();
const {User, Post, Comment} = require('../../models')
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


router.get('/',(req,res)=>{
Post.findAll({
    attributes: [
        'id',
        'title',
        'text',
        'created_at'
    ],
    include:{
        model: Comment,
        attributes: ['id','c_text','user_id','post_id', 'created_at'],
        include:{
            model: User,
            attributes: ['username']
        }
    }
})
.then(PostData =>{
    res.json(PostData)
})
.catch(err => console.log(err))
})


router.get('/:id',(req,res)=>{
    Post.findOne({
        attributes: [
            'id',
            'title',
            'text',
            'created_at'
        ],
        include:{
            model: Comment,
            attributes:['id' ,'c_text','created_at'],
            include:{
                model: User,
                attributes: ['username']
            },
        where:{
            id: req.params.id
        }
    }
    })
    .then(PostData=>{
        res.json(PostData)
    })
    .catch(err => console.log(err))
})


router.post('/', withAuth,(req,res)=>{
    Post.create({
        title: req.body.title,
        text: req.body.text,
        user_id: req.session.user_id
    })
.then(PostData =>{
    res.json(PostData)
})
.catch(err =>{
    console.log(err)
})
});


router.put('/:id', withAuth,(req,res)=>{
    Post.update(req.body,{
        where:{
            id: req.params.id
        }
    })
});


router.delete('/:id',(req,res)=>{
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(PostData=>{
        res.json(PostData)
    })
    .catch(err=>{
        console.log(err)
    })
});

module.exports = router;