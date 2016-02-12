var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);

describe('Threads', function() {
it('should list ALL data objects on /threads GET', function(done) {
  chai.request(server)
    .get('/threads')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});
  it('should list a SINGLE object on /threads/<id> GET');
  it('should add a SINGLE object on /threads POST', function(done) {
  // Add a timestamp to the text
  var myDateTimeStamp = new Date();
   
  chai.request(server)
  .post('/threads')
  .send({ title: 'myTitle '+ myDateTimeStamp, text: 'myText ' + myDateTimeStamp})
    .end(function(err, res){
      res.should.have.status(201);
      done();
    });
  });  
  it('should update a SINGLE object on /threads/<id> PUT');
  it('should delete a SINGLE object on /threads/<id> DELETE');
});
