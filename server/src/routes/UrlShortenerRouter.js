require('../models/UrlShortener');
const mongoose = require('mongoose');
const UrlShortener = mongoose.model('UrlShortener');
const shortid = require('shortid');
const isUrl = require('is-url');

const config = require('../../config/development');

module.exports = app => {
  app.get('/api/urlshortener', async (request, response) => { 
    try {
      const urls = await UrlShortener.find({});
      response.send(urls);
    } catch(err) {
      response.status(5000).json({ success: false, message: config.messages.error});
    }
  });

  app.post('/api/urlshortener', async (request, response) => {
    
    let { url } = request.body;
    // force protocol 
    if( url.indexOf('http') < 0) {
      url = 'http://' + url;
    }
    
    if(isUrl(url)) {
      try {
        const savedUrl = await UrlShortener.findOne({originalUrl: url});
        if(savedUrl) {
          console.log('already saved ', url, savedUrl);
          response.status(200).json({success: true, data: savedUrl});
        } else {
          
          const shortId = shortid.generate();
          const newUrl = new UrlShortener({
            originalUrl: url,
            shortUrl: shortId
          });
          await newUrl.save();
          console.log('saving new', newUrl);

          response.status(200).json({success: true, data: newUrl});
        }
      } catch (err) {
        response.status(500).json({success: false, message: config.messages.error});
      }
    } else {
      response.status(401).json({success: false, message: config.messages.invalid});
    }
  });

  app.get('/api/urlshortener/:id', async (request, response) =>  {
    const id = request.params.id;
    
    try{
      const shortUrl = await UrlShortener.findOne({shortUrl: id});
      if(shortUrl) {
        response.status(200).json({success: true, data: shortUrl});
      } else {
        response.status(401).json({success: false, message: config.messages.notFound});
      }
    } catch(err) {
      response.status(500).json({success: false, message: config.messages.error});
    }
  });
}