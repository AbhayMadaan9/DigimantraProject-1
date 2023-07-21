const mongoose = require('mongoose');
const { Schema } = mongoose;

const DistrictSchema = new Schema({
  User_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
contact_id:{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Contact'
},
    name: {
      type: String,
      required: true
    },
});
module.exports  = mongoose.model('District', DistrictSchema)