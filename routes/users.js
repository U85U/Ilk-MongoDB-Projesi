var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(error, users){
    res.render('users', {userList: users});
  });
});

router.get('/create', function(req, res){
  res.render('create');
});

router.post('/create', function(req, res){
  new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    age: req.body.age
  })
  .save(function(err, comment){
    res.redirect('/users');
  });
});

router.get('/delete/:id', function(req, res){
  User.findByIdAndRemove(req.params.id, function(err, next){
    res.redirect('/users');
  });
});

router.get('/update/:id', function(req, res){
  res.render('update', {id: req.params.id});

});

router.post('/update/:id', function(req, res){
  User.findByIdAndUpdate(req.params.id, {name: req.body.name, surname: req.body.surname, age: req.body.age}, function(err, result){
    res.redirect('/users');
  });
});

router.post('/find', function(req, res){
 if(req.body.isim){
  User.find({name: req.body.isim}, function(error, users){
    res.render('users', {userList: users});
  });
 }else{
   res.redirect('/users');
 }
});



module.exports = router;
