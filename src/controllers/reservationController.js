const mongoose = require('mongoose');
const Salle = require('../models/salleModel');
const Seat = require('../models/seatModel');
const Seance = require('../models/seanceModel');

exports.createReservation = async (req, res) => {
    const { userId, seanceId, numOfSeats } = req.body;
  
    try {
     
      const seance = await Seance.findById(seanceId).populate('availableSeats');
      if (!seance) {
        return res.status(404).json({ error: 'Session not found' });
      }
  
     
      const availableSeats = seance.availableSeats.filter(seat => seat.availableS);
      if (availableSeats.length < numOfSeats) {
        return res.status(400).json({ error: `Not enough available seats. Only ${availableSeats.length} seats are available.` });
      }
  
     
      const selectedSeats = availableSeats.slice(0, numOfSeats);
  
    
      await Seat.updateMany({ _id: { $in: selectedSeats.map(seat => seat._id) } }, { availableS: false });
  
    
      const reservation = new Reservation({
        user: userId,
        seance: seanceId,
        seats: selectedSeats.map(seat => seat._id) 
      });
  
      await reservation.save();
  
      res.status(201).json(reservation);
    } catch (error) {
      res.status(500).json({ error: 'Error making reservation' });
    }
  };
  