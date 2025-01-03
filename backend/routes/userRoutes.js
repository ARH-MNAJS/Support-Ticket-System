const express = require('express');
const router = express.Router();
const { loginRoute, registerRoute } = require('../controllers/userController');

router.post('/', registerRoute);
router.post('/login', loginRoute);

module.exports = router;
