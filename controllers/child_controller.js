var express = require('express');
var multer = require('multer');
var child = require('../model/child.model');
const fs = require('fs');
var path = require('path');



 exports.uploadChild= function(req, res,next) {
    //  res("hiiii hellooo")

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
           
           
        //    console.log(req.body.file);
        //    console.log(req.body.file.path)
           req.files.forEach( function(f) {
             console.log(f);
             // and move file to final destination...
             console.log(f.path)
                    var child_profile ={}
                    child_profile.uid =req.body.uid;
                    child_profile.profileUrl = "http://"+req.headers.host+"/"+f.path;

                    console.log("req.body.uid ===> "+req.body.uid);
                    var uid_1 = req.body.uid
                    child.find({"uid":uid_1}).then(function(details){
                        console.log("jhfdfsjfhdj details.uid == req.body.uid ==> "+ details.length)
                        if(details.length > 0){
                            console.log("update")
                            child.update({ "uid": uid_1 },{$set: {profileUrl: child_profile.profileUrl}},{ upsert: true }).then(function(child_deatails){
                                if(child_deatails.ok){
                                 res.send({"status":"true","statusCode":"200","message":"Profile Saved Successfully","uid":uid_1,"profile_pic":child_profile.profileUrl})
                                }else{
                                    res.send({"status":"false","statusCode":"400","message":"Profile Not Saved"})
                                }
                                 
                             })
                        }else{
                             console.log("insert")
                             child.create(child_profile).then(function(profile_deatails){
                                res.send({"status":"true","statusCode":"200","message":"Profile Saved Successfully","values":profile_deatails,"uid":profile_deatails.uid,"profile_pic":profile_deatails.profileUrl})
                            })
                        }
                     });
                });
        
        }
    });
        
     };

    //  exports.getProfileDetails = function(req,res,next){
    //      console.log("df "+req.body.uid)
    //       profile.find({uid:req.body.uid}).then(function(details){

    //           res.send({"status":"true","statusCode":"200","message":"Profile Saved Successfully","values":details})

    //         }).catch(next);
    //  }