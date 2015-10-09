var express = require('express');
var router = express.Router();

require('node-jsx').install({
    harmony: true,
    extension: '.jsx'
});

var React = require('react/addons'),
    ReactApp = React.createFactory(require('../app/components/App'));

router.get('/', function(req, res) {
    
    var seed = {
      name: 'ray',
      age: '20'
    };
    
    var reactHtml = React.renderToString(new ReactApp({ seed: seed }));
    
    res.render('index.ejs', { 
                title: 'React Isomorphic TodoList', 
                reactOutput: reactHtml, seed: JSON.stringify(seed) });
});

module.exports = router;

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express Todo List' });
// });


// OLD monk db
// router.get('/userlist', function(req, res) {
//     var db = req.db;
//     var collection = db.get('usercollection');
//     collection.find({},{},function(e,docs){
//         res.render('userlist', {
//             "userlist" : docs
//         });
//     });
// });

// router.get('/api/userlist', function(req, res) {
//     var db = req.db;
//     var collection = db.get('usercollection');
//     collection.find({},{},function(e,docs){
//         res.json({
//             "userlist" : docs
//         });
//     });
// });

// router.get('/newuser', function(req, res) {
//     res.render('newuser', { title: 'Add New User' });
// });

// /* POST to Add User Service */
// router.post('/adduser', function(req, res) {
 
//     // Set our internal DB variable
//     var db = req.db;
 
//     // Get our form values. These rely on the "name" attributes
//     var userName = req.body.username;
//     var userEmail = req.body.useremail;
 
//     // Set our collection
//     var collection = db.get('usercollection');
 
//     // Submit to the DB
//     collection.insert({
//         "username" : userName,
//         "email" : userEmail,
//         "updated_at" : Date.now()
//     }, function (err, doc) {
//         if (err) {
//             // If it failed, return error
//             res.send("There was a problem adding the information to the database.");
//         }
//         else {
//             // If it worked, set the header so the address bar doesn't still say /adduser
//             res.location("userlist");
//             // And forward to success page
//             res.redirect("userlist");
//         }
//     });
// });


