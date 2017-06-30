var mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/testDB');
var Schema = mongoose.Schema;

var books = new Schema({
    name:String
})
var UserSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    password:String,
    semister:[books]
});
// module.exports = mongoose.model('Semister', books);
module.exports = mongoose.model('User', UserSchema);