const express = require('express'); 
const router = express.Router(); 
const auth = require('../../middleware/auth'); 
const Zine = require('../../models/Profile'); 


// @route   GET api/zines
// @desc    get all zines
// @access  Public 
router.get('/', auth, async (req, res) => {                               //add auth to make it a protected route

    try{
                                                                        // wait till next video
    } catch(err){
        console.log(err.message); 
        res.status(500).send('Server Error')
    }
})        

module.exports = router; 