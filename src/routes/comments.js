const { Router } = require('express');
const { showComments, createComment } = require('../controllers/comments');

const router = Router();

// Show all Comments
router.get('/', showComments);

router.post('', createComment);

module.exports = router;
