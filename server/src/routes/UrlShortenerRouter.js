require('../models/UrlShortener');
const mongoose = require('mongoose');

const UrlShortener = mongoose.model('UrlShortener');
const shortid = require('shortid');
const isUrl = require('is-url');

const config = require('../../config/development');

const {
  messages: { errorMessage, invalidMessage, notFoundMessage },
} = config;

module.exports = (app) => {
  app.get('/api/urlshortener', async (request, response) => {
    try {
      const urls = await UrlShortener.find({});
      response.send(urls);
    } catch (err) {
      response
        .status(200)
        .json({ success: false, message: errorMessage, error: err });
    }
  });

  app.post('/api/urlshortener', async (request, response) => {
    let {
      body: { url },
    } = request;
    if (!url) {
      response.status(500).json({ success: false, message: errorMessage });
    }
    // force protocol
    url = url.trim();
    if (url.indexOf('http') < 0) {
      url = `http://${url}`;
    }

    if (isUrl(url)) {
      try {
        const savedUrl = await UrlShortener.findOne({ originalUrl: url });
        if (savedUrl) {
          const { originalUrl, shortUrl } = savedUrl;
          response
            .status(200)
            .json({
              success: true,
              originalUrl,
              shortUrl,
            });
        } else {
          const shortId = shortid.generate();
          const newUrl = new UrlShortener({
            originalUrl: url,
            shortUrl: shortId,
          });
          await newUrl.save();
          response
            .status(200)
            .json({ success: true, originalUrl: url, shortUrl: shortId });
        }
      } catch (err) {
        response
          .status(500)
          .json({ success: false, message: errorMessage, error: err });
      }
    } else {
      response.status(401).json({ success: false, message: invalidMessage });
    }
  });

  app.get('/api/urlshortener/:id', async (request, response) => {
    const {
      params: { id },
    } = request;
    try {
      const url = await UrlShortener.findOne({ shortUrl: id });
      if (url) {
        const { originalUrl, shortUrl } = url;
        response
          .status(200)
          .json({
            success: true,
            originalUrl,
            shortUrl,
          });
      } else {
        response.status(401).json({ success: false, message: notFoundMessage });
      }
    } catch (err) {
      response
        .status(500)
        .json({ success: false, message: errorMessage, error: err });
    }
  });
};
