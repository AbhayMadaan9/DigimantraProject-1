const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourtSchema = new Schema({
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
module.exports  = mongoose.model('Court', CourtSchema)