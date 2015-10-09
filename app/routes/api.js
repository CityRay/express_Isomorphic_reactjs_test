var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Todo     = mongoose.model( 'Todo' );

router.get('/todolist', function(req, res, next) {
    
    Todo.find().
    sort( 'update_at' ).
    exec( function ( err, todos ){
      if( err ) return next( err );
    
      //console.log(todos);
      res.json({
          status : 200,
          todos : todos
      });

    });
});

router.post('/addtodo', function(req, res, next) {
    
    // Get our form values. These rely on the "name" attributes
    var user = req.body.user;
    var content = req.body.content;
 
    // Set our collection
    new Todo({
      user       : "RAY",
      content    : content,
      done       : "false",
      create_at  : Date.now(),
      update_at  : Date.now()
    }).save( function ( err, todo, count ){
        if( err ) return next( err );
        console.log('db save');
        res.json({
          status : 200
        });
        //res.redirect( '/newuser' );
    });
    
});

router.post('/destory', function(req, res, next) {
    
    // destory by id
    Todo.findById(req.body.id, function(err, todo){
        todo.remove( function ( err, todo ){
          if( err ) return next( err );
    
          res.json({
            status : 200
          });
        });
    });
    
    
});

router.post('/update', function(req, res, next) {
    
    // destory by id
    Todo.findById(req.body.id, function(err, todo){
        todo.done = "true";
        todo.updated_at = Date.now();
        todo.save(function(err, todo, count){
           if(err) return next( err );
           //res.redirect( '/newuser' );
           res.json({
              status : 200
           });
        });
    });
    
    
});

module.exports = router;