const mongoose = require('mongoose');
const Seance = require("./seanceModel");
const Seat = require("./seatModel");
const User = require("./userModel");
const Schema = mongoose.Schema;


const reservationSchema = new Schema({
    user: { 
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true 
}, 
    session: { 
    type: Schema.Types.ObjectId, 
    ref: 'Seance', 
    required: true 
}, 
    seats: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Seat', 
    required: true 
}], 
    date: { 
    type: Date, 
    default: Date.now 
}
  });
  
  module.exports = mongoose.model('Reservation', reservationSchema);
  