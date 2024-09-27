const mongoose = require('mongoose');

const Salle = require("./salleModel");
const Schema = mongoose.Schema;


const seatSchema = new Schema({
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
  });
  
  module.exports = mongoose.model('Seat', seatSchema);
  

