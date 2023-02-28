const express = require('express');
const registerApi = require('./register');
const loginApi = require('./login');
const userApi = require('./users');
const fileApi = require('./file');
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();

router.use(registerApi);
router.use(loginApi);

router.use(userApi);
router.use(fileApi);

router.post('/logout', authenticateJWT, (req, res) => {
  res.json({ message: 'User logged out successfully' });
});

module.exports = router;
