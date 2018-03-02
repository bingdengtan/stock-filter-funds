var express = require('express');
var router = express.Router();

var fundController = require('../controllers/fundController')

router.post('/list', fundController.list);
router.get('/:id/delete', fundController.delete);
router.get('/:id', fundController.get);

router.post('/create', fundController.create);
router.post('/:id/update', fundController.update);

module.exports = router;