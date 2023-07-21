const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
  },
  name:{
    type: String,
    required: true
},
phone: {
  type: String,
  required: true
},
email:{
    type: String,
    required: true,
    unique: true
},
district:{
  type: String,
  required: true
},
court:{
  type: String,
  required: true
},
advocate:{
    type: String
},
field_of_practice:{
  type: String,
  required: true
},
relation:{
  type: String,
  required: true
},
contacted:{
  type: String,
  required: true
},
remark:{
  type: String,
  required: true
},
created_at:{
    type: Date,
    default: Date.now
},
});
module.exports  = mongoose.model('Contact', ContactSchema)