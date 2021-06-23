module.exports = {
  port: 5001,
  mongo: {
    uri: 'mongodb+srv://urladmin:urladmin@cluster0.wlull.mongodb.net/urlshortener?retryWrites=true&w=majority',
    settings: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    request: {
      timeout: 10000
    }
  }, 
  messages: {
    error: 'Something went wrong, please try again',
    notFound: 'URL not found in the database',
    duplicated: 'Url has already been shortened',
    invalid: 'Invalid URL'
  }
}