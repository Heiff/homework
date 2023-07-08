const { Router } = require('express');
const router = Router()
const { Register,Login } = require('../controllers/auth.comtroller')

router.post('/register',Register)
router.post('/login',Login)

module.exports = router;