const router = require('express').Router();

router.use('/', require('./users'));
router.use('/items', require('./items'));
router.use('/images', require('./images'));

module.exports = router;