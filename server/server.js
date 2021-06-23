const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config/development');

const {
  mongo: { settings, uri },
} = config;
const UrlShortenerRouter = require('./src/routes/UrlShortenerRouter');

mongoose.Promise = global.Promise;

mongoose.connect(uri, { ...settings }, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  // eslint-disable-next-line no-console
  console.log('Successfully connected to MongoDB');
});

const app = express();
const { port } = config;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

UrlShortenerRouter(app);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Url Shortener app running on port ${port}`));
