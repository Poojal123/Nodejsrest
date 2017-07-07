var mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/testDB');
var Schema = mongoose.Schema;


var ProfileSchema = new Schema({
    uid: String,
    profileUrl:String,
    
});
// module.exports = mongoose.model('Semister', books);
module.exports = mongoose.model('profile', ProfileSchema);