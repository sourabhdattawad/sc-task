const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Authenticate using JWT', () => {

    describe('/POST authenticate', () => {
        it('It should not POST without email field', (done) => {
            let data = {
                password: "foobar",
            }
            chai.request('http://localhost:3000')
                .post('/user/authenticate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql(true);
                    res.body.should.not.have.property('token');
                    done();
                });
        });
        it('It should not POST without password field', (done) => {
            let data = {
                email: "foo@bar.com",
            }
            chai.request('http://localhost:3000')
                .post('/user/authenticate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql(true);
                    res.body.should.not.have.property('token');
                    done();
                });
        });
        it('It should POST with valid fields', (done) => {
            let data = {
                email: "foo@bar.com",
                password: "foobar"
            }
            chai.request('http://localhost:3000')
                .post('/user/authenticate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql(false);
                    res.body.should.have.property('token');
                    done();
                });
        });

    });
});