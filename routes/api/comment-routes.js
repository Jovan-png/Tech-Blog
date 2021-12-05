const router = require('express').Router();
const {Comment, User} = require('../../models')
const sequelize = require('../../config/connection')
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
Comment.findAll({
    attributes: ['id' ,'c_text','created_at'],
include:{
    model: User,
    attributes: ['username']

}
})
.then(commentData=>{
    res.json(commentData)
})
.catch(err=>{
    console.log(err)
})
});

router.post('/', withAuth, (req, res) => {
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