const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);

//client.on('connect', function () {
//    console.log('Redis client connected');
//});

//client.on('error', function (err) {
//    console.log('Something went wrong ' + err);
//});

//client.set('user', 'eternal é um chupeta', redis.print);
//client.get('teste8', function (error, result) {
// if (error) {
//    console.log(error);
//     throw error;
//   }
//    console.log('GET result -> ' + result);
//});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

mongoose.connect('mongodb+srv://ranking:ranking@cluster0-g0atg.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.listen(process.env.PORT || 3030);