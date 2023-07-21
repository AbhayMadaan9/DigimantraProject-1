const mongoose = require('mongoose')
const {Schema} = mongoose

const referenceSchema  = new Schema({
    contact_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    },
    rname: {
      type: String,
      required: true
    },
    rphone:{
        type: String,
        required: true
    },
    remail:{
      type: String,
      required: true
    },
    rcontact_relation:{
      type: String,
      required: true
    }
})

module.exports = mongoose.model('Reference', referenceSchema)