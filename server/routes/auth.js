import express from 'express';

const router = express.Router();

// Controllers
import { register, login, logout, currentUser } from '../controllers/auth'
// Middleware
import { requestSignin } from '../middlewares';

router.post('/register', register);
router.post('/login', login);
router.get("/logout", logout);
router.get("/current-user", requestSignin, currentUser);

module.exports = router;