var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);

describe('Threads', function() {
it('should list ALL blobs on /threads GET', function(done) {
  chai.request(server)
    .get('/threads')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});
  it('should list a SINGLE Thread on /threads/<id> GET');
  it('should add a SINGLE Thread on /threads POST');
  it('should update a SINGLE blob on /threads/<id> PUT');
  it('should delete a SINGLE blob on /threads/<id> DELETE');
});
