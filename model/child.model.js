var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/daycareDB');
var Schema = mongoose.Schema;

// var profile = new Schema({
//     name:String
// })
var Images = new Schema({
    url:String,
    added_date_time:String
})
var Videos = new Schema({
    url:String,
    added_date_time:String
})
var ChildSchema = new Schema({
    uid: String,
    profileUrl:String,
    photos:[Images],
    videos:[Videos]
});
// module.exports = mongoose.model('Semister', books);
module.exports = mongoose.model('ChildrenProfile', ChildSchema);