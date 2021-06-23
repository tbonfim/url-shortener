const moongoose = require('mongoose');
const { Schema } = moongoose;

const UrlShortenerSchema = new Schema({
  originalUrl: String,
  shortUrl: String
});

moongoose.model('UrlShortener', UrlShortenerSchema);