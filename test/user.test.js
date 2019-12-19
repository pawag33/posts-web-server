// const { userOneId, userOne, setupDatabase } = require('./fixtures/db');
const usersService = require('../src/services/users');
const usersService = require('../src/services/tokens');
const request = require('supertest');
const app = require('../src/app');
const jwt = require('jsonwebtoken');

//beforeEach(setupDatabase);

const email = 'test3@test.com';
const userName = 'coolUserName';
const password = 'Very@StrongPass777';

test('Should signup a new user', async () => {
   

    const response = await request(app).post('/users').send({
        userName: userName,
        email: email,
        password: password
    }).expect(201);

    // Assert that the database was changed correctly
    const user = await usersService.findUser(email);
    expect(user).not.toBeNull();

    // verify token
    const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET);

    expect(decoded).not.toBeNull();

    expect(user.password).not.toBe(password);
});

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: email,
        password: password
    }).expect(200);

     // verify token
     const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET);

     expect(decoded).not.toBeNull();
  
    // in future validate token that they exist in db
   // expect(response.body.token).toBe(user.tokens[1].token)
});

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: email,
        password: password
    }).expect(200);

     // verify token
     const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET);

     expect(decoded).not.toBeNull();
  
    // in future validate token that they exist in db
   // expect(response.body.token).toBe(user.tokens[1].token)
});

