const express = require('express');
const router = express.Router();
const { body} = require('express-validator');
const { login, getUser, createuser } = require('../controllers/auth');
const authenticationMiddleware = require('../middleware/auth');

//createuser
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min : 5})
],createuser);

//login
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blanks').exists()
],login);


//route:3 Get login User Details using : GET "/api/auth/getuser".Loign required

router.get('/getuser',authenticationMiddleware,getUser)


module.exports = router
