const express = require('express');
const router = express.Router();
const { loginRoute, registerRoute, getMe } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerRoute);
router.post('/login', loginRoute);
router.get('/me', protect, getMe);

module.exports = router;
