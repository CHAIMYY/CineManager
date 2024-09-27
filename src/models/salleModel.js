const mongoose = require('mongoose');
const Seat = require("./seatModel");
const Schema = mongoose.Schema;






const salleSchema = new Schema({
  name: 
 { type: String,
     required: true 
 },

 capacity:
 { type: Number,
   required: true 
 },

 availableSeats: [{ 
 
    number: { 
    type: String,
    required: true 
    }, 
    // salle: { 
    // type: Schema.Types.ObjectId, 
    // ref: 'Salle',
    // required: true 
    // },
    isReserved: {
    type: Boolean, 
    default: false 
   
  }
}],
  location: { 
    type: String,
    required: true
},
  

}, {
  timestamps: true, 
});


module.exports = mongoose.model('Salle', salleSchema);