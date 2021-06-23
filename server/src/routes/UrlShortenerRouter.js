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
    console.log(request.body)
    // force protocol 
    if( url.indexOf('http') < 0) {
      url = 'http://' + url;
    }
    
    if(isUrl(url)) {
      try {
        const savedUrl = await UrlShortener.findOne({originalUrl: url});
        if(savedUrl) {
          const { originalUrl, shortUrl} = savedUrl;
          response.status(200).json({success: true, originalUrl: originalUrl, shortUrl: shortUrl});
        } else {
          
          const shortId = shortid.generate();
          const newUrl = new UrlShortener({
            originalUrl: url,
            shortUrl: shortId
          });
          await newUrl.save();
          response.status(200).json({success: true, originalUrl: url, shortUrl: shortId});
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
      const url = await UrlShortener.findOne({shortUrl: id});
      if(url) {
        const { originalUrl, shortUrl} = url;
        response.status(200).json({success: true, originalUrl: originalUrl, shortUrl: shortUrl });
      } else {
        response.status(401).json({success: false, message: config.messages.notFound});
      }
    } catch(err) {
      response.status(500).json({success: false, message: config.messages.error});
    }
  });
}