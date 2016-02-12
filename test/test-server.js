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

  it('should list a SINGLE object on /threads/<id> GET', function(done) {
      var threadIdHolder;
      chai.request(server)
      .get('/threads/')
      .end(function(err, res) {
      
        chai.request(server).get('/threads').end(function(err, res) {
           threadIdHolder = res.body[0]._id;
           
            chai.request(server).get('/threads/' + threadIdHolder).end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.title.should.be.a('string');
                res.body.text.should.be.a('string');
            done(); 
            });  
        }); 
      });
  });
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
  it('should delete a SINGLE object on /threads/<id> DELETE', function(done) {
  var threadIdHolder;
      chai.request(server)
      .get('/threads/')
      .end(function(err, res) {
      
        chai.request(server).get('/threads').end(function(err, res) {
           threadIdHolder = res.body[0]._id;
           
            chai.request(server)
            .delete('/threads/' + threadIdHolder)
            .end(function(err, res) {
                res.should.have.status(204);
            done(); 
            });  
        });
        });
        });
    });