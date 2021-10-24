const express = require('express'); 
const router = express.Router(); 
const auth = require('../../middleware/auth'); 
const User = require('../../models/User');
const config = require('config')
const { check, validationResult } = require('express-validator'); 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs') 



// @route   GET api/auth
// @desc    Test route
// @access  Public 
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');              //req.user has the decoded user info from our middleware
        res.json(user); 
    } catch(err) {
        console.error(err.message); 
        res.status(500).send('Server Error')
    }
});       



// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public 

router.post('/', [
    check('username', 'username is required')                                               // to validate username is present, response if not present
    .not()
    .isEmpty(),
    check('password', 'Password is required').exists()                                      // validate password exists
], 

async (req, res) => {                                                                       // code block if there are errors validating user input
   const errors = validationResult(req); 
   if(!errors.isEmpty()) {
       return res.status(400).json({errors: errors.array()})                        
   } 

const { username, password } = req.body;                                                 
                                                                                            // code block checks if user exists
   try {                                                                                    // try is a statement that allows you to check for errors. 
        let user = await User.findOne({ username });                                       
        if (!user){                                                                         // if user does not exist
           return res.status(400).json({errors: [ {msg: 'Invalid Credentials'} ]});         // send 'invalid credentials' message
        }
      
        
const isMatch = await bcrypt.compare(password, user.password)                               //bcrypt compare saved user password with password input
    
    if(!isMatch) {
        return res.status(400).json({errors: [ {msg: 'Invalid Credentials'} ]});            //if password is not a match, return invalid credentials
    }
    


const payload = {                                                                           // create payload
    user: {
        id: user.id
    }
}


jwt.sign(                                                                                   // this will send back the JWT token to client
    payload, 
    config.get('jwtSecret'),
    { expiresIn: 36000 },
    (err, token) => {
        if(err) throw err; 
        res.json({ token });
    })
} catch (err) {
    console.log(err.message); 
    res.status(500).send('Server Error')
   }
})

module.exports = router; 