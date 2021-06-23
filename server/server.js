const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config/development');
const UrlShortenerRouter = require('./src/routes/UrlShortenerRouter');

mongoose.Promise = global.Promise;

mongoose.connect(config.mongo.uri, { ...config.mongo.settings}, (err, db) => {
  if(err) { 
    console.log(err);
  }
  console.log('Successfully connected to MongoDB');
});

const app = express();
const port = process.env.PORT || config.port;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

UrlShortenerRouter(app);


app.listen(port, () => console.log(`Url Shortener app running on port ${port}`));