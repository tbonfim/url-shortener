const request = require('supertest');
const config = require('../../config/development');
const testEndPoint = require('./utils/requestUtils').testEndPoint;

const api = `${config.host}:${config.port}`;;
const endpoint = `/api/urlshortener`;

describe('GET /api/urlshortener', () => {
  it('Should return 200', () => {
    return request(api)
      .get(endpoint)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('Should return an array', async () => {
    const results = await testEndPoint('/api/urlshortener/', 
     { method: 'GET', json: true },
     { originalUrl: 'http://www.apple.com' })();

    expect(results instanceof Array).toBe(true);
    expect(results[0].shortUrl).toBeDefined();
  });
});

describe('GET /api/urlshortener/:id', () => {
  it('Should be returning with status 200', () => {
    return request(api)
      .get(`${endpoint}/d92BHTZ7B`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('Should return an error if no url is found', () => {
    return request(api)
      .get(`${endpoint}/wrongID`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });

  it('should list one unique url object', async () => {
    const uri = `${endpoint}/d92BHTZ7B`
    const results = await testEndPoint(uri, 
     { method: 'GET', json: true },
     { originalUrl: 'http://www.apple.com' })();

    expect(results instanceof Object).toBe(true);
    expect(results.success).toBe(true);
    expect(results.shortUrl).toBe('d92BHTZ7B');
    expect(results).toMatchSnapshot(`GET ${uri}`);
  })
});

describe('POST /api/urlshortener', () => {
  it('Should save a new short url', () => {
    return request(api)
      .post(`${endpoint}`)
      .send({ url: 'http://www.apple-test.com' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('Should not shorten urls already shortened', async () => {
    const uri = `${endpoint}`
    const results = await testEndPoint(uri, 
      { method: 'POST', json: true },
      { url: 'http://apple.com' })();

    expect(results instanceof Object).toBe(true);
    expect(results.success).toBe(true);
    expect(results.shortUrl).toBe('d92BHTZ7B');
    expect(results).toMatchSnapshot(`POST ${uri}`);
  });
});