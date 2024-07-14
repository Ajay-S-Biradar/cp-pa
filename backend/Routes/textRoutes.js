const express = require('express');
const { addMsg, getMsg, updateMsg, deleteMsg } = require('../controllers/msgControllers');
const { sendMail } = require('../controllers/feedbackControllers');

const router = express.Router();

router.route('/').post(addMsg);
router.route('/feedback').post(sendMail);
router.route('/:id').get(getMsg).post(updateMsg).delete(deleteMsg);

module.exports = router ;