
const mongoose = require('mongoose');
const Seance = require('../models/seanceModel');
const Salle = require('../models/salleModel');

exports.createSeance = async (req, res) => {
    try {
      const seance = new Seance(req.body);
      await seance.save();
      res.status(201).json(seance);
    } catch (err) {
      res.status(500).json({ message: 'Error creating seance', error: err });
    }
  };



exports.getAllseance = async (req, res) => {
    try {
      const seancelist = await Seance.find();
      res.json(seancelist);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching seances list', error: err });
    }
  };  

  exports.updateSeance = async (req, res) => {
    try {
      const updateSeance = await Seance.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updateSeance) return res.status(404).json({ message: 'seance not found' });
      res.json(updateSeance);
    } catch (err) {
      res.status(500).json({ message: 'Error updating seance', error: err });
    }
  };

  exports.deleteSeance = async (req, res) => {
    try {
      const deleteSeance = await Seance.findByIdAndDelete(req.params.id);
      if (!deleteSeance) return res.status(404).json({ message: 'seance not found' });
      res.json({ message: 'seance deleted', seance: deleteSeance });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting seance', error: err });
    }
  };

