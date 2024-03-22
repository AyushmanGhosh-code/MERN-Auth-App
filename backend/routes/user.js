const express = require('express');
const router = express.Router();

const {login,register,forgotPassword,resetPassword} = require('../controller/Auth');

router.post('/register',register);
router.post('/login',login);
router.post('/forgot-password',forgotPassword);
router.put('/reset-password/:id/:token',resetPassword);

module.exports = router;