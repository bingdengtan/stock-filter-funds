var express = require('express');
var router = express.Router();

var companyController = require('../controllers/companyController')

router.get('/list', companyController.list);
router.get('/:id/delete', companyController.delete);
router.get('/:id', companyController.get);

router.post('/create', companyController.create);
router.post('/:id/update', companyController.update);

module.exports = router;