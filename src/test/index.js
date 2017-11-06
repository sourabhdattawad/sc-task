const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Home page', () => {

    describe('/GET home', () => {
        it('It should have status', (done) => {

            chai.request('http://localhost:3000')
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });
});