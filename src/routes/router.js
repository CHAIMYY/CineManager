const express = require('express');
// const AuthRouter = require('./AuthRouter');
const router = express.Router();


// Middleware (move these to index.js, since it's the main app)
// router.use(cors());
// router.use(express.json());

// Define your routes
router.get('/', (req, res) => {
    res.send('Welcome to CinéManager!');
});


// router.use('/api/Auth', AuthRouter);

module.exports = router;