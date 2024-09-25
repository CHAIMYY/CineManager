
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const filmController = require('../controllers/filmController');
const salleController = require('../controllers/salleController');


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

// salle crud

router.post('/api/salle/createSalle', salleController.createSalle);
router.put('/api/salle/editSalle/:id', salleController.updateSalle);
router.delete('/api/salle/deleteSalle/:id', salleController.deleteSalle);
router.get('/api/salle/salleList', salleController.getAllsalle);

// seance curd

router.post('/api/seance/createSeance', seanceController.createSeance);
router.get('/api/seance/seanceList', seanceController.getAllseance);
router.put('/api/seance/editSeance/:id', seanceController.updateSeance);
router.delete('/api/seance/deleteSeance/:id', seanceController.deleteSeance);


module.exports = router;