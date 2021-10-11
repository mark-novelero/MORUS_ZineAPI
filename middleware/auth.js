//custom middleware will send the token back to authenticate and access protected routes. 

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {                                        // middleware function has access to req - res cycle

    const token = req.header('x-auth-token');                                       //get token from header

    if(!token) {                                                                    // check if no token
        return res.status(401).json({ msg: 'No token, authorization denied'}); 
    }

    try {                                                                           // verify token 
        const decoded = jwt.verify(token, config.get('jwtSecret'));                 // this will decode the token 

        req.user = decoded.user;                                            
        next();                                                                     
    } catch (err) {
        res.status(401).json({ msg: 'token is not valid'}); 
    }
}

                                                                                    //next step is to implement this custom middleware to a protect route. 
 