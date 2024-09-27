
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const filmController = require('../controllers/filmController');
const salleController = require('../controllers/salleController');
const seanceController = require('../controllers/seanceController');
const adminController = require('../controllers/adminController');
const { authenticateJWT, isAdmin }  = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
    res.send('Welcome to CinéManager!');
});

router.post('/api/auth/register', authController.register);
router.post('/api/auth/login', authController.login);

// film crud

router.post('/api/film/create', authenticateJWT,isAdmin, filmController.createfilm);
router.get('/api/film/getAll', authenticateJWT,isAdmin,filmController.getAllfilm);
router.get('/api/film/getFilm/:id', authenticateJWT,isAdmin, filmController.getfilmById);
router.put('/api/film/editFilm/:id',authenticateJWT, isAdmin,filmController.updateFilm);
router.delete('/api/film/deleteFilm/:id', authenticateJWT,isAdmin, filmController.deleteFilm);

// salle crud

router.post('/api/salle/createSalle',authenticateJWT,isAdmin, salleController.createSalle);
router.put('/api/salle/editSalle/:id',authenticateJWT,isAdmin, salleController.updateSalle);
router.delete('/api/salle/deleteSalle/:id',authenticateJWT,isAdmin, salleController.deleteSalle);
router.get('/api/salle/salleList',authenticateJWT,isAdmin, salleController.getAllsalle);

// seance curd

router.post('/api/seance/createSeance', authenticateJWT,isAdmin,seanceController.createSeance);
router.get('/api/seance/seanceList',authenticateJWT,isAdmin, seanceController.getAllseance);
router.put('/api/seance/editSeance/:id', authenticateJWT,isAdmin,seanceController.updateSeance);
router.delete('/api/seance/deleteSeance/:id', authenticateJWT,isAdmin,seanceController.deleteSeance);

// admin crud

router.post('/api/admin/createAdmin', authenticateJWT,isAdmin,adminController.createAdmin);
router.get('/api/admin/getAlladmin', authenticateJWT,isAdmin,adminController.getAlladmin);
router.put('/api/admin/updateadmin/:id', authenticateJWT,isAdmin,adminController.updateadmin);
router.delete('/api/admin/deleteadmin/:id', authenticateJWT,isAdmin,adminController.deleteadmin);




module.exports = router;