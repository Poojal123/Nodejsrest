var mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/testDB');
var Schema = mongoose.Schema;

var profile = new Schema({
    name:String
})
var ProfileSchema = new Schema({
    uid: String,
    profile_image: String,
    
});
module.exports = mongoose.model('Semister', books);
module.exports = mongoose.model('profile', ProfileSchema);