const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.createAdmin = async function(req, res) {
    try {
    
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to create admins.' });
      }
  
      const newAdmin = new User(req.body);
      newAdmin.hash_password = bcrypt.hashSync(req.body.password, 10);
      newAdmin.role = 'admin'; 
      
      const admin = await newAdmin.save();
      admin.hash_password = undefined;
      return res.json(admin);
      
    } catch (err) {
      console.log('Admin Creation Error: ', err);
      return res.status(400).json({ message: err.message });
    }
  };

  exports.getAlladmin= async (req, res) => {
    try {
        const adminlist = await User.find({ role: 'admin' });
      res.json(adminlist);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching admins list', error: err });
    }
  };