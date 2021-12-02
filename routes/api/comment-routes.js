const router = require('express').Router();
const {Comment} = require('../../models')
const sequelize = require('../../config/connection')



router.get('/', (req, res) => {
Comment.findAll()
.then(commentData=>{
    res.json(commentData)
})
.catch(err=>{
    console.log(err)
})
});

router.post('/', (req, res) => {
    if(req.session){
    Comment.create({
        c_text: req.body.c_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
    .then(commentData=>{
        res.json(commentData)
    })
    .catch(err=>{
        console.log(err)
    })
}
});

router.delete('/:id', (req, res) => {
Comment.destroy({
    where:{
        id: req.params.id
    }
})
.then(commentData=>{
    res.json(commentData)
})
.catch(err=>{
    console.log(err)
})
});






module.exports = router;