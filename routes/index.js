const router = require('express').Router();

const userRoutes = require('../routes/api/user-route')

router.use('/users', userRoutes)
router.use('/posts', apiRoutes)
router.use('/comments', apiRoutes)

module.exports = router;