const mongoose = require('mongoose');
const Salle = require('../models/salleModel');

exports.createSalle = async (req, res) => {
    try {
      const salle = new Salle(req.body);
      await salle.save();
      res.status(201).json(salle);
    } catch (err) {
      res.status(500).json({ message: 'Error creating salle', error: err });
    }
  };

  
  exports.getAllsalle = async (req, res) => {
    try {
      const sallelist = await Salle.find();
      res.json(sallelist);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching salle list', error: err });
    }
  };

  exports.updateSalle = async (req, res) => {
    try {
      const updateSalle = await Salle.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updateSalle) return res.status(404).json({ message: 'salle not found' });
      res.json(updateSalle);
    } catch (err) {
      res.status(500).json({ message: 'Error updating salle', error: err });
    }
  };

  exports.deleteSalle = async (req, res) => {
    try {
      const deleteSalle = await Salle.findByIdAndDelete(req.params.id);
      if (!deleteSalle) return res.status(404).json({ message: 'salle not found' });
      res.json({ message: 'salle deleted', salle: deleteSalle });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting salle', error: err });
    }
  };