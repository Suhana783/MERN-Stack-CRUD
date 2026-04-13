const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { checkProfile, verifyToken } = require('../middlewares/profileMiddleware');

router.post('/register', checkProfile, profileController.registerProfile);
router.get('/profile', verifyToken, profileController.getCurrentProfile);
router.put('/update/:id', checkProfile, profileController.updateProfile);
router.delete('/delete/:id', profileController.deleteProfile);
router.post('/login', profileController.loginProfile);

module.exports = router;