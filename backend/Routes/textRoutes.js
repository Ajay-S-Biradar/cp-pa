const express = require('express');
const { addMsg, getMsg, updateMsg, deleteMsg } = require('../controllers/msgControllers');

const router = express.Router();

router.route('/').post(addMsg);
router.route('/:id').get(getMsg).post(updateMsg).delete(deleteMsg);

module.exports = router ;