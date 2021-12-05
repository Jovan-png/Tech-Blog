const router = require('express').Router();
const {User, Post, Comment} = require('../../models')
const sequelize = require('../../config/connection')

router.get('/',(req,res)=>{
User.findAll({
    include:[
    {
        model: Post,
        attributes: ['id','title','text','user_id', 'created_at']
    },
  {
        model: Comment,
        attributes: ['id','c_text','user_id','post_id'],
        
    }
]
})
.then(UserData => res.json(UserData))
.catch(err => console.log(err))
})

router.get('/:id',(req,res)=>{
    User.findOne({
        where: {
            id: req.params.id
        },
        include:[
        {
            model: Post,
            attributes: ['id','title','text','user_id', 'created_at']
        },
        {
            model: Comment,
            attributes: ['id','c_text','user_id','post_id', 'created_at']
        }
    ]
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
        req.session.save(()=>{
            req.session.user_id = UserData.id;
            req.session.username = UserData.username;
            req.session.LoggedIn = true;

            res.json(UserData);
        })
        
    })
    .catch(err => console.log(err))
})

router.put('/:id',(req,res)=>{
    User.update(req.body,{
        individualHooks: true,
        where:{
            id: req.params.id
        }
    })
    .then(UserData=>{
        res.json(UserData)
    })
    .catch(err => console.log(err))
})

router.post('/login',(req,res)=>{
    User.findOne({
        where:{
            email: req.body.email
        }
    })
    .then(UserData=>{
        if(!UserData){
            res.status(400)
            return;
        }
        const vPassword = UserData.checkPassword(req.body.password);
        if(!vPassword){
            res.status(400).json({message: "wrong password my guy"});
            return;
        }
        req.session.save(()=>{
            req.session.user_id = UserData.id;
            req.session.username = UserData.username;
            req.session.LoggedIn = true;

            res.json({user: UserData, message: "logged in my boy!"})
        })
        
    })
  
});

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