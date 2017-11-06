const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('JSON patching', () => {

    describe('/POST patch', () => {
        it('It should not POST without valid (json-object, json patch-object, token)', (done) => {
            let data = {
                json_object: '{"baz": "qux","foo": "bar"}',
                json_patch: '[ { "op": "replace", "path": "/baz", "value": "boo" }]',
                token: 'foobar'
            }
            chai.request('http://localhost:3000')
                .post('/admin/json-patch')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql(true);
                    done();
                });
        });

    });
});