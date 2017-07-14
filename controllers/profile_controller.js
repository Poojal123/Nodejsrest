var express = require('express');
var multer = require('multer');
var profile = require('../model/profile.model');
const fs = require('fs');
var path = require('path');

var Storage = multer.diskStorage({

     destination: function(req, file, callback) {
         console.log("sdhgjhsdg")
         callback(null, "./public/images");
     },
     filename: function(req, file, callback) {
         console.log("sharvari "+file.uid )
         callback(null,  file.uid+"_"+Date.now()+"_" +file.originalname);
     }
 });

//  var upload = multer({
//      storage: Storage
//  }).array("profile_pic", 3); //Field name and max count
//  var upload = multer({
//      storage: Storage
//  }).any();
//  var upload = multer({
//                 storage: Storage
//             }).single('profile')
            
 exports.uploadProfile= function(req, res) {
            var storage = multer.diskStorage({
                    destination:function(req, file, callback) {
                        console.log("sdhgjhsdg")
                        callback(null, "./public/images");
                    },
                    filename: function(req, file, callback) {
                       
                        callback(null,  Date.now()+".jpg");
                    }
                });
    var upload = multer({ storage : storage}).any();

    upload(req,res,function(err) {
        if(err) {
            console.log(err);
         res.send("Error uploading file.");
        } else {
           console.log(req.body.uid);
        //    console.log(req.body.file.path)
           req.files.forEach( function(f) {
             console.log(f);
             // and move file to final destination...
             console.log(f.path)
              var user_profile ={}
                    user_profile.uid =req.body.uid;
                    user_profile.profileUrl = f.path;

                    console.log("req.body.uid ===> "+req.body.uid);
                    var uid_1 = req.body.uid
                    profile.find({"uid":uid_1}).then(function(details){
                        console.log("jhfdfsjfhdj details.uid == req.body.uid ==> "+ details.length)
                        if(details.length > 0){
                            console.log("update")
                            profile.update({ "uid": uid_1 },{$set: {profileUrl: user_profile.profileUrl}},{ upsert: true }).then(function(profile_deatails){
                                if(profile_deatails.ok){
                                 res.send({"status":"true","statusCode":"200","message":"Profile Saved Successfully","uid":uid_1,"profile_pic":user_profile.profileUrl})
                                }else{
                                    res.send({"status":"false","statusCode":"400","message":"Profile Not Saved"})
                                }
                                 
                             })
                        }else{
                             console.log("insert")
                             profile.create(user_profile).then(function(profile_deatails){
                                res.send({"status":"true","statusCode":"200","message":"Profile Saved Successfully","values":profile_deatails,"uid":profile_deatails.uid,"profile_pic":profile_deatails.profileUrl})
                            })
                        }
                     });
                });
        
        }
    });
        
     };

     exports.getProfileDetails = function(req,res,next){
         console.log("df "+req.body.uid)
          profile.find({uid:req.body.uid}).then(function(details){

              res.send({"status":"true","statusCode":"200","message":"Profile Saved Successfully","values":details})

            }).catch(next);
     }