var express = require('express');
var router = express.Router();

var fundStockController = require('../controllers/fundStockController')

router.get('/:id/delete', fundStockController.delete);
router.get('/:id', fundStockController.get);

router.post('/funds/:code',fundStockController.searchFunds);
router.post('/create', fundStockController.create);
router.post('/:id/update', fundStockController.update);

module.exports = router;