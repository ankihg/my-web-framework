var chai = require('chai');
chai.use(require('chai-http'));

var request = chai.request;
var expect = chai.expect;

describe('server testing', () => {

  it('should get', (done) => {
    request('localhost:3000')
    .get('/trees/cunninghamia-lanceolata')
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      done();
    });
  });

  it('should post cunninghamia lanceolata', (done) => {
    request('localhost:3000')
    .post('/trees')
    .set({'name':'cunninghamia lanceolata'})
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      done();
    });
  });

  it('should post cedrus deodara', (done) => {
    request('localhost:3000')
    .post('/trees')
    .set({'name':'cedrus deodara'})
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      done();
    });
  });

  it('should post cedrus deodara', (done) => {
    request('localhost:3000')
    .post('/trees')
    .set({'name':'cedrus atlantica'})
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      done();
    });
  });

  it('should put plzus responda to cedrus deodara', (done) => {
    request('localhost:3000')
    .put('/trees/cedrus_deodara')
    .set({"update":"{\"id\":\"plzus_responda\"}"})
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      done();
    });
  });

  it('should put plzus responda to cedrus deodara', (done) => {
    request('localhost:3000')
    .put('/trees/plzus_responda')
    .set({"update":"{\"id\":\"cedrus_deodara\"}"})
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      done();
    });
  });


});
