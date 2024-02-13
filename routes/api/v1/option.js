const express = require('express');

const router = express.Router();
const optionsController = require('../../../controllers/optionsController')

router.post('/:optionId/add_vote',  optionsController.addVote)
router.get('/:optionId/delete', optionsController.delete)


module.exports = router;
