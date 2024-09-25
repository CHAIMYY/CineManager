
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const filmController = require('../controllers/filmController');

router.get('/', (req, res) => {
    res.send('Welcome to CinéManager!');
});

router.post('/api/auth/register', authController.register);
router.post('/api/auth/login', authController.login);

// film crud

router.post('/api/film/create', filmController.createfilm);
router.get('/api/film/getAll', filmController.getAllfilm);
router.get('/api/film/getFilm/:id', filmController.getfilmById);
router.put('/api/film/editFilm/:id', filmController.updateFilm);
router.delete('/api/film/deleteFilm/:id', filmController.deleteFilm);


module.exports = router;