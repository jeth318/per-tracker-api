const express = require('express')
const app = express()
const port = 5000

//Import the mongoose module
var mongoose = require('mongoose');
var Pef = require('./models/pef.js');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//Set up default mongoose connection
var mongoDB = 'mongodb://admin:taQcyd-jyhnar-xoxpi1@ds159073.mlab.com:59073/pef-tracker';
mongoose.connect(mongoDB, { useNewUrlParser: true }, (err)=>{
    if (err) console.log('ERROR:', err)
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/api/pef', (req, res) => {
    Pef.find({})
        .then(documents => {
            return res.send(documents);
        })
        .catch(err => console.log(err))
})

app.get('/api/pef/:date', (req, res) => {
    Pef.find({date: req.params.date})
        .then(res => console.log(res))
        .then(() => {
            return res.send()
        })
        .catch(err => console.log(err))
})
app.post('/api/pef', (req, res) => {
    console.log(req.body);
    Pef.create(req.body, (err, doc) =>{
       return res.json(doc)
    })
})
app.put('/api/pef', (req, res) => {
    Pef.findOneAndUpdate({_id: req.body._id}, req.body, { new: true }, (err, doc) =>{
        return res.json(doc)
    })
});
app.delete('/api/pef', (req, res) => {
    Pef.findOneAndDelete({_id: req.body._id}, (err, doc) => {
       return res.send(err ? err : doc);
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))