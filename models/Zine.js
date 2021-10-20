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
    indentifier: {
        type: Number, 
        required: true
    }, 
    content_description: {
        type: String, 
        required: true
    }, 
    subject: {
        type: String, 
        required: true
    }, 
    genre: {
        type: String, 
        required: true
    }, 
    publisher: {
        type: String, 
        required: true
    }, 
    date: {
        type: Number, 
        min: 0, 
        required: true
    }, 
    format: {
        type: String, 
        required: true
    }, 
    source: {
        type: String, 
        required: true
    }, 
    language: {
        type: String, 
        required: true, 
    },
    relation: {
        type: String, 
        required: true
    }, 
    coverage: {
        type: String, 
        required: true
    }, 
    rights: {
        type: String, 
        required: true
    },
    union_id: {
        type: String, 
        required: true
    },
    physical_description: {
        type: String, 
        required: true
    }, 
    freedoms_restrictions: {
        type: String, 
        required: true
    },
    cover_page_url: {
        type: String, 
        required: true
    }  
})

module.exports = Zine = mongoose.model('zine', ZineSchema);