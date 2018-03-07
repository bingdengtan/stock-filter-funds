var express = require('express');
var router = express.Router();

var stockController = require('../controllers/stockController')

router.get('/filter/:query',stockController.filter);
router.get('/:id/delete', stockController.delete);
router.get('/:id', stockController.get);

router.post('/create', stockController.create);
router.post('/:id/update', stockController.update);

module.exports = router;