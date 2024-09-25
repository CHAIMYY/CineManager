
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.get('/', (req, res) => {
    res.send('Welcome to CinéManager!');
});

router.post('/api/auth/register', authController.register);
router.post('/api/auth/login', authController.login);




module.exports = router;