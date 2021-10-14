const express = require('express'); 
const router = express.Router(); 
const bcrypt = require('bcryptjs')                                                          // import bcrypt.js
const User = require('../../models/User')                                                   // import User schema
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator'); 

// @route   POST api/users
// @desc    Test route
// @access  Public 



router.post('/', [
    check('username', 'username is required')                                               // to validate username is present, response if not present
    .not()
    .isEmpty(), 
    check('password', 'Please enter a password with 6 or more characters')                  // validate password is present, response if not present
    .isLength({ min: 6})                                                                    // validate password 6 char min. 
], 


async (req, res) => {                                                                       // code block if there are errors validating user input
   const errors = validationResult(req); 
   if(!errors.isEmpty()) {
       return res.status(400).json({errors: errors.array()})                        
   } 


   const { username, password } = req.body;                                                 // code block checks if user exists
   try {                                                                                    // try is a statement that allows you to check for errors. 
        let user = await User.findOne({ username });                                        // See if user exists during user registration by checking if username exists
        if (user){  
           return res.status(400).json({errors: [ {msg: 'User already exists!'} ]});         // if user already exists, send status 400
        }

        user = new User({
            username, 
            password
        })

        const salt = await bcrypt.genSalt(10)                                               // code block encrypts password. Generate Salt, 10 is ideal
        user.password = await bcrypt.hash(password, salt)                                   // this code encrypts password
        await user.save();                                                                  // saves new user to database
         
                                                                                            // code block to return jsonwebtoken
        const payload = {                                                                   // create payload
            user: {
                id: user.id
            }
        }

        jwt.sign(                                                                           // this will send back the JWT token to client
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