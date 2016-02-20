var _ = require('lodash');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');
var moment = require('moment');
var Monster = require('../models/Monster');

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

exports.getMonstersForThisMonth = function(req, res) {
    console.log("Request getMonstersForThisMonth was called.");
    res.writeHead(200, {"Content-Type": "application/json"});
    
    //get data from db, filter only for one month
    var today = new Date();
    
    
    var allDaysInMonth = getDaysInMonth(parseInt(moment().format("MM")) - 1,parseInt(moment().format("YYYY")));
    console.log("**********");
    console.log(allDaysInMonth);
    
    var monsters = Monster.find({
        date: {
            $gte: allDaysInMonth[allDaysInMonth.length - 1],
            $lt: allDaysInMonth[0]
         
        }
    // appearance_id: 1
        }, function (err, docs) {
            if (err) {
                console.log(err.toString());
            }
            
            console.log("docs: " + docs);
            
            var allMonsters = [];
            if (docs.length < 20) {
                console.log("didnt found em, creating :(");
                allMonsters = createNewMonsters(allDaysInMonth);
            } else {
                console.log("already found em");
                for (var i = 0; i < docs.length; i++) {
                    var monster = docs[i];
                    var monsterJson = { appearance_id: monster.appearance_id,
                        killed: monster.killed,
                        date: monster.date };
                    allMonsters.push(monsterJson);
                }
            }
            
            var json = JSON.stringify({ 
                "monsters": allMonsters
            });
            res.end(json); 
        });
};

function createNewMonsters(allDaysInMonth) {
    var monstersArray = [];
    for (var i = 0; i < allDaysInMonth.length; i++) {
        var day = allDaysInMonth[i];
        var dictionary = { appearance_id: 1,
            killed: false,
            date: day };
        var monster = new Monster({
            appearance_id: 1,
            killed: false,
            date: day
        });
        monster.save();
        console.log(dictionary);
        monstersArray.push(dictionary);
    }
    return monstersArray;
}

exports.postDaySummary = function(req, res) {
if (req.isAuthenticated()) {
     //Store moster in user database
      User.findById(req.user.id, function(err, user) {
        if (err) {
          return next(err);
        }
        
        var date = req.body.date;
        
        user.game.dailySummaries.push({ "date": req.body.date, "balance": req.body.balance });
        //TODO: kill monster if nessesarry
        killMonster(new Date());
        user.save(function(err) {
          if (err) {
            return next(err);
          }

          res.redirect('/');
        });
    });
      
  }

};

function killMonster(date) {
    var today = moment(date).startOf('day')
    var tomorrow = moment(today).add(1, 'days')
    
    Monster.find({
      date: {
        $gte: today.toDate(),
        $lt: tomorrow.toDate()
      }
        
    }, function (err, docs) {
        console.log(docs);
    });
    
}


function getDaysInMonth(month, year) {
    console.log("month: " + month + ", year: " + year);
     var date = new Date(year, month, 1);
     var days = [];
     while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
     }
     return days;
}