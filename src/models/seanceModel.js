const mongoose = require('mongoose');
const Film = require("./filmModel");
const Salle = require("./salleModel");
const Seat = require("./seatModel");
const Schema = mongoose.Schema;


const seanceSchema = new Schema({
 
  film: {
    type: Schema.Types.ObjectId,
    ref: "Film",
    required: true,
  },
  salle: {
    type: Schema.Types.ObjectId,
    ref: "Salle",
    required: true,
  },
  startTime: { 
    type: Date,
    required: true 
  },
  endTime: { 
    type: Date, 
    required: true 
  },
  availableSeats: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Seat' 
  }],
  // tarif: {
  //   type: Number,
  //   required: true
  // }
  // horaire: {
  //   type: Date,
  //   required: true,
  // },
  // tarif: {
  //   type: Number,
  //   required: true,
  // },
  // placesDisponibles: {
  //   type: Number,
  //   required: true,
  // },
  // archived_seance: {
  //   type: Boolean,
  //   default: false,
  // },
});

const seanceModel = mongoose.model("seances", seanceSchema);

module.exports = seanceModel;