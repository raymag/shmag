const router = require('express').Router();

const ShortUrlController = require('./controllers/ShortUrlController');

router.get('/', ShortUrlController.hello);

router.get('/:id', ShortUrlController.redirect);
router.post('/url', ShortUrlController.store);

module.exports = router;