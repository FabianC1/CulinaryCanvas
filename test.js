import { app } from './JavaScript/server.js';



//Set up Chai library 
import chai from 'chai';
let should = chai.should();
let assert = chai.assert;
let expect = chai.expect;

//Set up Chai for testing web service
import chaiHttp from 'chai-http';
chai.use(chaiHttp);


describe('Web Service', () => {

    //Test of GET request sent to /M00860030/getAllUsers
    describe('/GET M00860030/getAllUsers', () => {
        it('should GET all the users', (done) => {
            chai.request(app)
                .get('/M00860030/getAllUsers')
                .end((err, response) => {
                    //Check there are no errors
                    expect(err).to.equal(null);

                    //Check the status code
                    response.should.have.status(200);

                    //Check that an array of users is returned
                    response.body.should.be.a('array');

                    //End test
                    done();
                });
        });

        it('should return status 401 when user is not logged in', (done) => {
            chai.request(app)
                .get('/M00860030/getAllUsers')
                .end((err, response) => {
                    //Check the status code
                    response.should.have.status(401);

                    //End test
                    done();
                });
        });
    });

    //Test of GET request sent to /M00860030/getUserRecipesCount
    describe('/GET M00860030/getUserRecipesCount', () => {
        it('should return the count of recipes for a user', (done) => {
            const username = 'testuser'; // Replace with an existing username in your database
            chai.request(app)
                .get(`/M00860030/getUserRecipesCount?username=${username}`)
                .end((err, response) => {
                    //Check there are no errors
                    expect(err).to.equal(null);

                    //Check the status code
                    response.should.have.status(200);

                    //Check that the response body contains a count property
                    response.body.should.have.property('count');

                    //End test
                    done();
                });
        });

        it('should return status 401 when user is not logged in', (done) => {
            chai.request(app)
                .get('/M00860030/getUserRecipesCount')
                .end((err, response) => {
                    //Check the status code
                    response.should.have.status(401);

                    //End test
                    done();
                });
        });
    });

    //Test of POST request sent to /M00860030/AddUser
    describe('/POST M00860030/AddUser', () => {
        it('should add a new user', (done) => {
            chai.request(app)
                .post('/M00860030/AddUser')
                .send({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'testpassword',
                    DOB: '1990-01-01',
                    profilePicture: 'test.jpg' // Replace with the path to a test profile picture file
                })
                .end((err, response) => {
                    //Check there are no errors
                    expect(err).to.equal(null);

                    //Check the status code
                    response.should.have.status(200);

                    //End test
                    done();
                });
        });
    });

    //Test of POST request sent to /M00860030/login
    describe('/POST M00860030/login', () => {
        it('should log in a user with valid credentials', (done) => {
            chai.request(app)
                .post('/M00860030/login')
                .send({
                    email: 'testuser@example.com',
                    password: 'testpassword'
                })
                .end((err, response) => {
                    //Check there are no errors
                    expect(err).to.equal(null);

                    //Check the status code
                    response.should.have.status(200);

                    //Check that the response contains a success message
                    response.body.should.have.property('message').that.equals('Login successful');

                    //End test
                    done();
                });
        });

        it('should return status 401 with invalid credentials', (done) => {
            chai.request(app)
                .post('/M00860030/login')
                .send({
                    email: 'invalid@example.com',
                    password: 'invalidpassword'
                })
                .end((err, response) => {
                    //Check the status code
                    response.should.have.status(401);

                    //End test
                    done();
                });
        });
    });

    //Test of POST request sent to /M00860030/logout
    describe('/POST M00860030/logout', () => {
        it('should log out a user', (done) => {
            chai.request(app)
                .post('/M00860030/logout')
                .end((err, response) => {
                    //Check there are no errors
                    expect(err).to.equal(null);

                    //Check the status code
                    response.should.have.status(200);

                    //Check that the response contains a success message
                    response.body.should.have.property('message').that.equals('Logout successful');

                    //End test
                    done();
                });
        });
    });

    //Test of POST request sent to /uploadImageAndDescription
    describe('/POST uploadImageAndDescription', () => {
        it('should upload an image and description', (done) => {
            chai.request(app)
                .post('/uploadImageAndDescription')
                .field('username', 'testuser')
                .field('title', 'Test Recipe')
                .field('description', 'This is a test recipe')
                .attach('myFile', 'test-image.jpg') // Replace with the path to a test image file
                .end((err, response) => {
                    //Check there are no errors
                    expect(err).to.equal(null);

                    //Check the status code
                    response.should.have.status(200);

                    //Check that the response contains a success message
                    response.body.should.have.property('message').that.equals('Recipe uploaded successfully');

                    //End test
                    done();
                });
        });
    });

});