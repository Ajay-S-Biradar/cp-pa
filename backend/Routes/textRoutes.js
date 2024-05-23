const express = require('express');
const { addMsg, getMsg } = require('../controllers/msgControllers');

const router = express.Router();

router.route('/').post(addMsg);
router.route('/:id').get(getMsg);

module.exports = router ;