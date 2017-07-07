var express = require('express');
var multer = require('multer');
var child = require('../model/child.model');
const fs = require('fs');
var path = require('path');
var dateTime = require('node-datetime');



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
            //  {name: data.childname,dob:data.birthday,profile_pic:res.profile_pic,age:data.age,uid_parent:data.uid_parent,uid_daycare:firebase.auth().currentUser.uid}
                    var child_profile ={}
                    child_profile.uid =req.body.uid;
                    child_profile.name=req.body.name;
                    child_profile.dob=req.body.dob;
                    child_profile.age=req.body.age;
                    child_profile.uid_parent=req.body.uid_parent;
                    child_profile.uid_daycare = req.body.uid_daycare
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

     exports.uploadPhotosOfChild = function(req,res,next){
         console.log("df "+req.body.uid)
         var storage = multer.diskStorage({
                    destination:function(req, file, callback) {
                        console.log("sdhgjhsdg")
                        callback(null, "./public/uploads");
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
                    req.files.forEach( function(f) {
                    console.log(f);
                    console.log(f.path)
                            var child_profile ={}
                            child_profile.uid ="1499346628069";//req.body.uid;
                            child_profile.profileUrl = "http://"+req.headers.host+"/"+f.path;
                            var dt = dateTime.create();
                            var formatted = dt.format('Y-m-d H:M:S');
                            console.log(formatted);
                            console.log("req.body.uid ===> "+req.body.uid);
                            var uid_1 = req.body.uid
                            child.update({ "uid": req.body.uid}, {
                                $push: {
                                    "photos": { "url": child_profile.profileUrl,"added_date_time":formatted }
                                }}).then(function(result                                                                                                                                                                                                                                           ){
                                    if(result.ok){
                                        res.send({"status":"true","statusCode":"200","message":"Profile Saved Successfully","uid":uid_1,"profile_pic":child_profile.profileUrl,"added_date_time":formatted})
                                    }else{
                                        res.send({"status":"false","statusCode":"400","message":"Profile Not Saved"})
                                    }
                                 });
                    });
                }
            })
     }

     exports.getPhotos = function(req, res, next){
        child.find({uid:req.body.uid}).then(function(details){

              res.send({"status":"true","statusCode":"200","message":"rescords found","values":details})

            }).catch(next);
     }
     exports.getAllChildrens = function(req, res, next){
        child.find({}).then(function(details){

              res.send({"status":"true","statusCode":"200","message":"rescords found","values":details})

            }).catch(next);
     }