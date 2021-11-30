const router = require('express').Router();

const userRoutes = require('./user-route');
const postRoutes = require('./post-route');
const commentRoutes = require('./comment-routes');


router.use('/comments', commentRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;