var _ = require('lodash');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');
//^^^Probably don't need all of them!^^^

/**
 * POST /expense
 * User input for expense
 */
exports.postExpense = function(req, res) {
  if (req.isAuthenticated()) {
     //Store expense in user database
      User.findById(req.user.id, function(err, user) {
        if (err) {
          return next(err);
        }
        
        
        
        
        
        //start validating user input
          
          
          /* RENDER NEXT SCREEN
            e.g.
            res.render('account/profile', {
            title: 'Account Management'
          });*/
        
        
        
        
        
        
        var date = new Date();
        var nowDate = String(date.toUTCString());
        user.game.expenses.push({ timestamp: nowDate, value: req.body.expense });
        
        user.save(function(err) {
          if (err) {
            return next(err);
          }

          res.redirect('/');
        });
    });
      
  }
};