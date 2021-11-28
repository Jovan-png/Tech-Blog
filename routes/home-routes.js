const router = require('express').Router();
const sequalize = require('../config/connection')
const {User, Post, Comment} = require('../models');



router.get('/', (req,res )=>{
    res.render('homepage')
})







module.exports = router;