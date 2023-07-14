const mongoose = require('mongoose')
const {Schema} = mongoose
const referenceSchema  = new Schema({
    contact_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    },
    name: {
      type: String,
      required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
      type: String,
      required: true
    },
    contact_relation:{
      type: String,
      required: true
    }
})

module.exports = mongoose.model('Reference', referenceSchema)