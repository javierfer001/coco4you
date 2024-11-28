var request = require('supertest');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('./server');
  });
  
  it('responds to /', function testSlash(done) {
    request(server).get('/').expect(200, done);
  });
  it('responds to /about-us', function testSlash(done) {
    request(server).get('/about-us').expect(200, done);
  });
  it('responds to /franchises', function testSlash(done) {
    request(server).get('/franchises').expect(200, done);
  });
  it('responds to /privacy', function testSlash(done) {
    request(server).get('/privacy').expect(200, done);
  });
  it('responds to /privacy', function testSlash(done) {
    request(server).get('/privacy').expect(200, done);
  });
  it('responds to /send', function testSlash(done) {
    request(server).post('/send').expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/pageerror')
      .expect(404, done);
  });
 
});