  var express = require('express');
  var path = require('path');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var session = require('express-session');
  var bodyParser = require('body-parser');
//multiple RBJT views...
var engines = require('consolidate');
//multiple RBJT views...

// var connect = require('connect')
var firebase = require("firebase");
var config = {
  apiKey: "AIzaSyCcdNryutkZ9PaliOSS_rH1hfsCZpE_BYw",
    authDomain: "daycare-8da84.firebaseapp.com",
    databaseURL: "https://daycare-8da84.firebaseio.com",
    projectId: "daycare-8da84",
    storageBucket: "daycare-8da84.appspot.com",
    messagingSenderId: "398522364586"
};
firebase.initializeApp(config);
var database = firebase.database();

  var index = require('./routes/index');
  var users = require('./routes/users');

  var app = express();

//RBJT
app.use(session({secret: 'ssshhhhh'}));
//RBJT
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// RBJT....
app.engine('jade', engines.jade);
app.engine('ejs', engines.ejs);
//RBJT....

  config = require('./config/db'),
  mongoose = require('mongoose');

  // mongoose.connect("mongodb://127.0.0.1:27017/testDB");
  // mongoose.Promise = global.Promise;
  // var db = mongoose.connection;

  // db.on('error', function () {
  //   throw new Error('unable to connect to database at ' + config.db);
  // });
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  // app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(bodyParser());
  // app.use(bodyParser({limit: '50mb'}));
  // app.use(bodyParser.urlencoded({limit: '50mb'}));

app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));


  app.use(cookieParser());
  // app.use(express.static(path.join(__dirname, 'public')));
  // app.use("/public", express.static(path.join(__dirname, 'public')));
  // app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use("/public/images", express.static(__dirname + '/public/images'));
app.use("/public/uploads", express.static(__dirname + '/public/uploads'));
app.use("/public/videos", express.static(__dirname + '/public/videos'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });
  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });
//   app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
  // error handler


  //RBJT...
var sess;
app.get('/admin',function(req,res){
sess = req.session;
if(sess.email) {
    res.render('index.ejs', { title: 'Express' });
}
else {
    res.redirect('/admin/login');
}
});
app.get('/admin/login',function(req, res){
  sess = req.session;
   if(sess.email){
      res.redirect('/admin');
   }else{
     res.render('login.ejs');
   }
});
app.post('/admin/logindo',function(req,res){
  sess = req.session;
  
    var email = req.body.username;
    var password = req.body.password;
    var student = new Array();
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(uid) {
       sess.email = req.body.username;
      console.log(uid.uid);
      res.redirect('/admin');
    }).catch(function(error) {
    // Handle Errors here.
    res.render('login.ejs');
    // ...
    });
});
app.get('/admin/logout',function(req, res){
  // app.use('/admin/logout',admin_controller.login);
   sess = req.session;
   sess.destroy();
   res.redirect('/admin/login');
});
app.get('/admin/day-cares',function(req, res){
sess = req.session;
var dayCares = new Array();
var childLen = new Array();
if(sess.email) {
          database.ref('/userData').on('value', function(users) {
           
                length = Object.keys(users.val()).length;
                for(var i=0;i<length;i++){
                    var key = Object.keys(users.val())[i];
                    dayCares[i] = {
                    'id':key,
                    'name':users.val()[key].username,
                    'mobile':users.val()[key].mobile,
                    'email':users.val()[key].email,
                    'count':0
                }
                  
                }
             database.ref('/childrenData').on('value', function(users) {
           
                length = Object.keys(users.val()).length;
                for(var i=0;i<length;i++){
                    var key = Object.keys(users.val())[i];
                    childLen[i] = {
                    'uid_daycare':users.val()[key].uid_daycare,
                    
                }
                  
                }
              //  console.log(dayCares);
              //  console.log(childLen);
              // console.log(dayCares[0].count+1);
              for(var i=0;i<childLen.length;i++) {
                  for(var j=0;j<dayCares.length;j++) {
                    if(childLen[i].uid_daycare == dayCares[j].id){
                       dayCares[j].count = dayCares[j].count+1
                    }
                  }
              }
                res.render('dayCareList.ejs',{dayCares:dayCares});
             });         
            
              // for(var i=0;i<dayCares.length;i++){
              //     var tableRef = database.ref("childrenData/");
              //     console.log(dayCares[i].id);
              //     tableRef.orderByChild("uid_daycare").startAt(dayCares[i].id).endAt(dayCares[i].id).once("child_added",function(data,childKey){
              //      var newPlayer = data.val();
              //      console.log("Previous Player: " + childKey);
              //     }); 
              //  } 
              
                
                          
            });
}
else {
    res.redirect('/admin/login');
}
});
app.get('/admin/parents',function(req, res){
sess = req.session;
var parents = new Array();
var childLen = new Array();
if(sess.email) {
          database.ref('/parentsData').on('value', function(users) {
           
                length = Object.keys(users.val()).length;
                for(var i=0;i<length;i++){
                    var key = Object.keys(users.val())[i];
                    parents[i] = {
                    'id':key,
                    'name':users.val()[key].username,
                    'mobile':users.val()[key].mobile,
                    'email':users.val()[key].email,
                    'count':0
                }
                  
                }
             database.ref('/childrenData').on('value', function(users) {
           
                length = Object.keys(users.val()).length;
                for(var i=0;i<length;i++){
                    var key = Object.keys(users.val())[i];
                    childLen[i] = {
                    'uid_parent':users.val()[key].uid_parent,
                    
                }
                  
                }
              //  console.log(dayCares);
              //  console.log(childLen);
              // console.log(dayCares[0].count+1);
              for(var i=0;i<childLen.length;i++) {
                  for(var j=0;j<parents.length;j++) {
                    if(childLen[i].uid_parent == parents[j].id){
                       parents[j].count = parents[j].count+1
                    }
                  }
              }
                res.render('parentsList.ejs',{parents:parents});
             });         
            
              // for(var i=0;i<dayCares.length;i++){
              //     var tableRef = database.ref("childrenData/");
              //     console.log(dayCares[i].id);
              //     tableRef.orderByChild("uid_daycare").startAt(dayCares[i].id).endAt(dayCares[i].id).once("child_added",function(data,childKey){
              //      var newPlayer = data.val();
              //      console.log("Previous Player: " + childKey);
              //     }); 
              //  } 
              
                
                          
            });
}
else {
    res.redirect('/admin/login');
}
});
app.get('/admin/uid_daycare',function(req,res){
   sess = req.session;
   var child_list = new Array();
   var daycare_name;
  if(sess.email) {
     uid = req.query.uid_daycare;
    
           database.ref('/userData/'+uid).once('value', function(daycare) { 
            //  console.log(daycare.val());
             daycare_name = daycare.val().username;
             
              const ref = database.ref("childrenData/");

              ref.orderByChild('uid_daycare')
              .equalTo(uid)
              .once('value')
              .then(function (snapshot) {
                if(snapshot.val() == null){
                  res.render('child_list.ejs',{child_list:child_list,daycare_name:daycare_name});
                }
                else{
                     length = Object.keys(snapshot.val()).length;
                    for(var i=0;i<length;i++){
                              var key = Object.keys(snapshot.val())[i];
                               var host = req.get('host');
                               var http = req.protocol;
                              var image = snapshot.val()[key].profile_pic == null ? '' : http + "://" + host +"/"+ snapshot.val()[key].profile_pic;
                              child_list[i] = {
                              'child_id': key, 
                              'name':snapshot.val()[key].name,
                              'age': snapshot.val()[key].age,
                              'dob':snapshot.val()[key].dob,
                              'profile_pic':image
                                                  
                          }
                            
                          } 
                        // console.log(child_list);
                        // console.log("\n"+daycare_name);
                       res.render('child_list.ejs',{child_list:child_list,daycare_name:daycare_name}); 
                }
                 
                
           });  

        });
        
  }
  else{
     res.redirect('/admin/login'); 
  }
});
app.get('/admin/uid_parent',function(req,res){
   sess = req.session;
   var child_list = new Array();
   var parent_name;
  if(sess.email) {
     uid = req.query.parent_id;
    
           database.ref('/parentsData/'+uid).once('value', function(parent) { 
            //  console.log(daycare.val());
             parent_name = parent.val().username;
             
              const ref = database.ref("childrenData/");

              ref.orderByChild('uid_parent')
              .equalTo(uid)
              .once('value')
              .then(function (snapshot) {
                if(snapshot.val() == null){
                  res.render('parentchild_list.ejs',{child_list:child_list,parent_name:parent_name});
                }
                else{
                     length = Object.keys(snapshot.val()).length;
                    for(var i=0;i<length;i++){
                              var key = Object.keys(snapshot.val())[i];
                               var host = req.get('host');
                               var http = req.protocol;
                              var image = snapshot.val()[key].profile_pic == null ? '' : http + "://" + host +"/"+ snapshot.val()[key].profile_pic;
                              child_list[i] = {
                              'child_id': key, 
                              'name':snapshot.val()[key].name,
                              'age': snapshot.val()[key].age,
                              'dob':snapshot.val()[key].dob,
                              'profile_pic':image
                                                  
                          }
                            
                          } 
                        // console.log(child_list);
                        // console.log("\n"+daycare_name);
                       res.render('parentchild_list.ejs',{child_list:child_list,parent_name:parent_name}); 
                }
                 
                
           });  

        });
        
  }
  else{
     res.redirect('/admin/login'); 
  }
});
app.get('/admin/child_id/',function(req,res){
sess = req.session;
var photos = new Array();
var videos = new Array(); 
var child = [];
if(sess.email) {
     cid = req.query.child_id;
     database.ref('/childrenData/'+cid).once('value', function(childs) {
       var host = req.get('host');
       var http = req.protocol;
       var image = childs.val().profile_pic == null ? '' : http + "://" + host +"/"+ childs.val().profile_pic;
       child = {
         'name':childs.val().name,
         'profile':image
       } 
       
        if( !("photos" in childs.val()) == 0){
           photo_length = Object.keys(childs.val().photos).length;
           
           for(var i=0;i<photo_length;i++){
             var key = Object.keys(childs.val().photos)[i];
             var host = req.get('host');
             var http = req.protocol;
             var image = childs.val().photos[key].url == null ? '' : http + "://" + host +"/"+ childs.val().photos[key].url;
              photos [i]={
                 'url': image
              }
           }
          if( !("videos" in childs.val()) == 0){
              video_length = Object.keys(childs.val().videos).length;
             
              for(var i=0;i<video_length;i++){
                 
                var key = Object.keys(childs.val().videos)[i];
                var host = req.get('host');
                  var http = req.protocol;
                  var video = childs.val().videos[key].url == null ? '' : http + "://" + host +"/"+ childs.val().videos[key].url;
                  videos [i]={
                    'url':video
                  }
               }

            }  
          //  console.log(child);
          //  console.log(photos);
          //  console.log(videos);
          res.render('childView.ejs',{child:child,photos:photos,videos:videos});
        }
        else{
          if( !("videos" in childs.val()) == 0){
              video_length = Object.keys(childs.val().videos).length;
              for(var i=0;i<video_length;i++){
                var key = Object.keys(childs.val().videos)[i];
                  videos [i]={
                    'url':childs.val().videos[key].url
                  }
               }
            }
              // console.log(child);
              // console.log(photos);
              // console.log(videos);
              res.render('childView.ejs',{child:child,photos:photos,videos:videos});     
        }  
        
        
        
     });
}
    else{
   res.redirect('/admin/login'); 
    }
});  
//RBJT...

  // app.use(session({secret: "Shh, its a secret!"}));
  app.use('/', index);
  // app.use('/api/users', users);
  app.use('/api', users);
  // app.use('/users', require('./controllers/users')) //using data

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error.jade');
  });

  module.exports = app;
