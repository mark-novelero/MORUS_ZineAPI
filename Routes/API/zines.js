const express = require('express'); 
const router = express.Router(); 

// @route   GET api/zines
// @desc    Test route
// @access  Public 
router.get('/', (req, res) => res.send('Zines Route'))

module.exports = router; 