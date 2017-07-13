var express = require('express');
var users = require('../model/user.model');
var semister = require('../model/user.model');
var bcrypt = require('bcrypt');
// var cookieParser = require('cookie-parser');
// var session = require('express-session');
var firebase = require('firebase');

exports.registerUser = function(req,res,next){
      console.log(req.body);
      bcrypt.hash(req.body.password, bcrypt.genSaltSync(10), function(err, hash) {
      console.log("2",err);
        if (!err) {
            console.log(hash);
            var user ={};
                user.email = req.body.email;
                user.firstName =req.body.firstName;
                user.lastName = req.body.lastName;
                user.semister = req.body.semister;
                user.password = hash;
                console.log(user.password);
                
                users.create(user).then(function(user1){
                    res.send(user1)
                }).catch(next);
    
        } else{
            res.send(err)
            
        }
    });
   
}

exports.login = function(res1,res,next){
    //  firebase.auth().signInWithEmailAndPassword("devid@gmail.com", "123456");
     firebase.database().ref('childrenData')
          .on('value', data => {
            
            res.send(data.val())
          });
    //     firebase.database().ref('/').set({
    //     username: "test",
    //     email: "test@mail.com"
    // });
    //  users.find({ "email": res1.body.email }).then(function(userDetails){
    //     console.log(userDetails[0].email)
    //     bcrypt.compare(res1.body.password,userDetails[0].password, function(err, res1) {
    //         if(res1) {
                
    //                 res.send({"status":"true","statusCode":"200","message":"Logged in successfully","values":userDetails})
                    
    //         }else{
                
    //                 res.send({"status":"false","status":"404","message":"wrong password or email please check","values":[]});
    //         }
    //         });
    // }).catch(next);
  
}



exports.retriveUsers = function(req,res,next){

    users.find({}).then(function(user1){

        res.send(user1)

    }).catch(next);
}

exports.retriveSemister = function(req,res,next){

    console.log(req.body)
    users.find({ "semister.name": "Hindi" }).then(function(semister){

        res.send(semister)

    }).catch(next);
}