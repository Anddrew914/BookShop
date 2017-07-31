const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const logger = require('morgan')
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// --> APIs <--
const mongoose = require('mongoose');

//Mongo Lab
mongoose.connect('mongodb://test:test@ds127883.mlab.com:27883/bookshopanddrew914')

//Local DB
// mongoose.connect('mongodb://localhost:27017/bookshop')

const db = mongoose.connection
db.on('error', console.error.bind(console, '#MongoDB - connection error: '))

// ---> SET UP SESSIONS <---
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave:false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}, // 2 days in milliseconds
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
//ttl: 2 days * 24 hours * 60 minutes * 60 seconds
}))

// SAVE SESSION CART API
  app.post('/cart', function(req, res){
    const cart = req.body
    req.session.cart = cart
    req.session.save(function(err){
      if(err){
        console.log(err)
      }
      res.json(req.session.cart)
    })
  })

// GET SESSION CART API
  app.get('/cart', function(req, res){
    if(typeof req.session.cart !== 'undefined'){
      res.json(req.session.cart)
    }
})
//END SESSION SETUP

Books = require('./models/books.js');

// POST
app.post('/books', function(req, res){
  const book = req.body;
  Books.create(book, function(err, books){
    if(err){
      console.log(err);
    }
    res.json(books);
 })
})

//------->>> GET BOOKS <<<-------
app.get('/books', function(req, res){
  Books.find(function(err, books){
    console.log("books", books)
    if(err){
      console.log(err);
}
    res.json(books)
  })
})

//---->>> UPDATE BOOKS <<<------
app.put('/books/:_id', function(req, res){
  const book = req.body
  const query = req.params._id
  // if the field doesn't exist $set will set a new field
  const update = {
    '$set':{
      title:book.title,
      description:book.description,
        image:book.image,
      price:book.price
    }
}
// When true returns the updated document
const options = {new: true};
    Books.findOneAndUpdate(query, update,
options, function(err, books){
      if(err){
        console.log(err)
      }
      res.json(books)
    })
})

//---->>> DELETE BOOKS <<<------
app.delete('/books/:_id', function(req, res){
  const query = {_id: req.params._id};
  Books.remove(query, function(err, books){
    if(err){
      console.log(err); }
    res.json(books);
  })
});

// --> GET BOOKS IMAGES API <--
app.get('/images', function(req, res){
  const imgFolder = __dirname + '/public/images/'
  const fs = require('fs')

  fs.readdir(imgFolder, function(err, files){
    if(err){
      return console.error(err)
    }
    const filesArr = []
    files.forEach(function(file){
      filesArr.push({name: file})
    })
    res.json(filesArr)
    console.log("filesArr", filesArr)
  })
})
 // --> END APIs <--
app.listen(3001, function(err){
  if(err){
    return console.log(err)
  }
  console.log('API server is listening on http://localhost:3001')
})
