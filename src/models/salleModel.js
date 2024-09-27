const mongoose = require('mongoose');

const salleSchema = new mongoose.Schema({
  name: 
 { type: String,
     required: true 
 },

 capacity:
 { type: Number,
   required: true 
 },
 

  location: { 
    type: String,
    required: true
},
  

}, {
  timestamps: true, 
});


module.exports = mongoose.model('Salle', salleSchema);