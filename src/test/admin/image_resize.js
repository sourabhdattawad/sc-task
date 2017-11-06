const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Creating thumbail and image resizing', () => {

    describe('/POST patch', () => {
        it('It should not POST without valid (public image url, token)', (done) => {
            let data = {
                img_url: 'https://google.com/logo',
                token: 'foobar'
            }
            chai.request('http://localhost:3000')
                .post('/admin/create-thumbnail')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql(true);
                    res.body.should.not.have.property('resized_file_url');
                    done();
                });
        });

    });
});