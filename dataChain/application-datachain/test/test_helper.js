// test/test_helper.js
  
const mongoose = require('mongoose');
var express = require('express');
// var app = express();
var app = require('../server');
const User = require("../models/user");
  
// tells mongoose to use ES6 implementation of promises
mongoose.Promise = global.Promise;
const dbURI = 'mongodb+srv://joethompson:Thojoe12@cluster0.sw8hl.mongodb.net/datachain';
mongoose.connect(dbURI, { useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT || 3001))
    .catch((err) => console.log(err));
  
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ', error);
    });
      
    // runs after each test
    afterEach((done) => {
        mongoose.connection.collections.users.drop(() => {
            // done();
        });

        mongoose.connection.collections.accreditors.drop(() => {
            // done();
        });

        mongoose.connection.collections.departments.drop(() => {
            // done();
        });

        mongoose.connection.collections.viewers.drop(() => {
            done();
        });
});