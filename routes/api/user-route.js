const router = require('express').Router();
const {User} = require('../../models')
const sequelize = require('../../config/connection')

router.get('/',(req,res)=>{
User.findAll()
.then(UserData => res.json(UserData))
.catch(err => console.log(err))
})

router.get('/:id',(req,res)=>{
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(UserData =>{
res.json(UserData)
    })
    .catch(err => console.log(err))
})

router.post('/',(req,res)=>{
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(UserData =>{
        res.json(UserData)
    })
    .catch(err => console.log(err))
})

router.put('/:id',(req,res)=>{
    User.update(req.body,{
        where:{
            id: req.params.id
        }
    })
    .then(UserData=>{
        res.json(UserData)
    })
    .catch(err => console.log(err))
})

router.delete('/:id',(req,res)=>{
    User.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(UserData =>{
        res.json(UserData)
    })
    .catch(err => console.log(err))
})

module.exports = router;