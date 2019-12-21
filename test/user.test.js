const usersService = require('../src/services/users.service');
const tokensService = require('../src/services/tokens.service');
const request = require('supertest');
const app = require('../src/app');
const jwt = require('jsonwebtoken');
const db = require('../src/db/mongoose');


const email = 'test1@test.com';
const name = 'jhonSmith';
const password = 'Very@StrongPass777';


beforeAll(() => {
    db.connectToDb();
  });

  afterAll(async () => {
    await usersService.deleteUser(email);
    db.disconetFromDb();
  });


test('Should signup a new user', async () => {
    const response = await request(app).post('/user').send({
        name: name,
        email: email,
        password: password
    }).expect(201);

    // verify response
    expect(response.body.user).not.toBeNull();

    // Assert that the database was changed correctly
    const user = await usersService.findUser(email);
    expect(user).not.toBeNull();

    // verify token
    const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET);

    expect(decoded).not.toBeNull();

    expect(user.password).not.toBe(password);
});

test('Should login existing user', async () => {
    const response = await request(app).post('/user/login').send({
        email: email,
        password: password
    }).expect(200);

     // verify token
     expect(response.body.token).not.toBeNull();

     const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET);

     expect(decoded).not.toBeNull();
  
    // in future validate token that they exist in db
   // expect(response.body.token).toBe(user.tokens[1].token)
});
