var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Todo = new Schema({
    user      : String,
    content   : String,
    done      : String,
    create_at : Date,
    update_at : Date
});

mongoose.model('Todo', Todo);
mongoose.connect( 'mongodb://localhost:27017/appdb' );