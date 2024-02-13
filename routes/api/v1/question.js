const express = require('express');
const router = express.Router();

const questionController = require('../../../controllers/questionsController')
const optionsController = require('../../../controllers/optionsController')


router.post('/create', questionController.create)
router.get('/:questionId', questionController.question)
router.get('/:questionId/delete' , questionController.delete)
router.post('/:questionId/options/create', optionsController.create )




module.exports = router;