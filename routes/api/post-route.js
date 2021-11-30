const router = require('express').Router();
const {User, Post} = require('../../models')
const sequelize = require('../../config/connection')


router.get('/',(req,res)=>{
Post.findAll()
.then(PostData =>{
    res.json(PostData)
})
.catch(err => console.log(err))
})


router.get('/:id',(req,res)=>{
    Post.findOne({
        where:{
            id: req.params.id
        }
    })
    .then(PostData=>{
        res.json(PostData)
    })
    .catch(err => console.log(err))
})


router.post('/',(req,res)=>{
    Post.create({
        title: req.body.title,
        text: req.body.text,
        user_id: req.body.user_id
    })
.then(PostData =>{
    res.json(PostData)
})
.catch(err =>{
    console.log(err)
})
});


router.put('/:id',(req,res)=>{
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