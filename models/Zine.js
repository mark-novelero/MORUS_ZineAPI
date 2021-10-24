const mongoose = require('mongoose'); 

const ZineSchema = new mongoose.Schema({
    zine_title: {
        type: String, 
        required: true
    },
    creator: {
        type: String, 
        requires: true
    }, 
    pdf_url: {
        type: String, 
        required: true
    }, 
    identifier: {
        type: String, 
        required: true
    }, 
    content_description: {
        type: String, 
        required: true
    }, 
    subject: {
        type: String 
    }, 
    genre: {
        type: String
    }, 
    publisher: {
        type: String
    }, 
    date: {
        type: Number, 
        min: 0
    }, 
    format: {
        type: String
    }, 
    source: {
        type: String
    }, 
    language: {
        type: String 
    },
    relation: {
        type: String
    }, 
    coverage: {
        type: String
    }, 
    rights: {
        type: String
    },
    union_id: {
        type: String
    },
    physical_description: {
        type: String
    }, 
    freedoms_restrictions: {
        type: String
    },
    cover_page_url: {
        type: String, 
        required: true
    }  
})

module.exports = Zine = mongoose.model('zine', ZineSchema);