const express = require('express'); 
const router = express.Router(); 
const auth = require('../../middleware/auth'); 
const {check, validationResult} = require('express-validator');
const Zine = require('../../models/Zine');


// @route   Post api/zines
// @desc    create of update zines
// @access  Private
router.post('/', 
    [ auth, 
      [
        check('cover_page_url', 'Cover page url required.')                 // checking for required data. See Zine Schema for required data.
            .not()
            .isEmpty(), 
        check('zine_title', 'Zine title required.')
            .not()
            .isEmpty(), 
        check('creator', 'Creator required.')
            .not()
            .isEmpty(), 
        check('pdf_url', 'PDF URL required.')
            .not()
            .isEmpty(),
        check('identifier', 'Identifier required.')
            .not()
            .isEmpty(), 
        check('content_description', 'Content description required')
            .not()
            .isEmpty() 
      ] 
    ],
    async  (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){                                             //if there are errors, run code block
            return res.status(400).json({errors: errors.array()});         // return status 400, json list of errors. 
        }

    
    const {
            zine_title,
            creator,
            pdf_url,
           cover_page_url,
            identifier,
            content_description,
            subject,
            genre,
            publisher,
            date,
            format,
            source,
            language,
            relation,
            coverage,
            rights,
            union_id,
            physical_description,
            freedoms_restrictions    
        } = req.body

        const zineData = {};                                                   // Build Zine Object - 1st initilize with empty object.
        if(zine_title) zineData.zine_title = zine_title;                       // If key has an array, look at video tutorial #17 @ 10minutes
        if(creator) zineData.creator = creator;
        if(pdf_url) zineData.pdf_url = pdf_url; 
        if(cover_page_url) zineData.cover_page_url = cover_page_url; 
        if(identifier) zineData.identifier = identifier; 
        if(content_description) zineData.content_description = content_description; 
        if(subject) zineData.subject = subject; 
        if(genre) zineData.genre = genre; 
        if(publisher) zineData.publisher = publisher; 
        if(date) zineData.date = date; 
        if(format) zineData.format = format; 
        if(source) zineData.source = source; 
        if(language) zineData.relation = relation; 
        if(coverage) zineData.coverage = coverage; 
        if(rights) zineData.rights = rights; 
        if(union_id) zineData.union_id = union_id; 
        if(physical_description) zineData.physical_description = physical_description; 
        if(freedoms_restrictions) zineData.freedoms_restrictions = freedoms_restrictions;  

        try{
            zine = new Zine(zineData);                                          // Create Zine
            
            await zine.save();
            res.json(zine);
        } catch(err) {
            console.log(err.message)
            res.status(500).send('Server Error - Your code sucks.');
        }
    }
);                                     

module.exports = router; 