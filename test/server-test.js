var chai = require('chai');
chai.use(require('chai-http'));

var request = chai.request;
var expect = chai.expect;

describe('crud testing for species', () => {

  it('should get', (done) => {
    request('localhost:3000')
    .get('/speciess/cunninghamia_lanceolata')
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      done();
    });
  });

  it('should post cunninghamia lanceolata', (done) => {
    request('localhost:3000')
    .post('/speciess')
    .set({'name':'cunninghamia lanceolata'})
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      done();
    });
  });

  it('should post cedrus deodara', (done) => {
    request('localhost:3000')
    .post('/speciess')
    .set({'name':'cedrus deodara'})
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      done();
    });
  });

  it('should post cedrus atlantica', (done) => {
    request('localhost:3000')
    .post('/speciess')
    .set({'name':'cedrus atlantica'})
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      done();
    });
  });

  it('should put plzus responda to cedrus deodara', (done) => {
    request('localhost:3000')
    .put('/speciess/cedrus_deodara')
    .set({"update":"{\"id\":\"plzus_responda\"}"})
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      done();
    });
  });

  it('should put cedrus deodara to plzus responda', (done) => {
    request('localhost:3000')
    .put('/speciess/plzus_responda')
    .set({"update":"{\"id\":\"cedrus_deodara\"}"})
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      done();
    });
  });

  it('should delete cedrus deodara', (done) => {
    request('localhost:3000')
    .del('/speciess/cedrus_deodara')
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      done();
    });
  });

  it('should post cedrus deodara', (done) => {
    request('localhost:3000')
    .post('/speciess')
    .set({'name':'cedrus deodara'})
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      done();
    });
  });
});

describe('crud testing for trees', () => {

  it('should get cedrus deodara at lat: 47.665392 and lng: -122.310876', (done) => {
    request('localhost:3000')
    .get('/trees/cedrus_deodara@47.665392&-122.310876')
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      // console.log(typeof res.text);
      // expect(res.text).eql('<h1>cedrus deodara @ lat: 47.665392 lng: -122.310876</h1>');
      done();
    });
  });

});
