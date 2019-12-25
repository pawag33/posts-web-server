const usersService = require('../src/services/users.service');
const tokensService = require('../src/services/tokens.service');
const request = require('supertest');
const app = require('../src/app');
const jwt = require('jsonwebtoken');
const db = require('../src/db/mongoose');


const email = 'test1@test.com';
const name = 'John-Smith';
const password = 'Very@StrongPass777';
let globalToken;
let globalUser;


beforeAll( async () => {
   await db.connectToDb();
  });

  afterAll(async () => {
      try{
          // in case of delete test was failed
         await  usersService.deleteUser(email);
      }
      catch(err) {}
      await db.disconnetFromDb();
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
    const user = await usersService.getUser(email);
    expect(user).not.toBeNull();

    // verify token
    const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET);

    expect(decoded).not.toBeNull();

    expect(user.password).not.toBe(password);

    const token = await tokensService.getToken(response.body.token,user._id);
    expect(token).not.toBeNull();

    globalToken = response.body.token;
    globalUser = user;
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
     const token = await tokensService.getToken(response.body.token,globalUser._id)
     expect(token).not.toBeNull();
});

test('Should delete account for user', async () => {
    await request(app)
        .delete('/user')
        .set('Authorization', `Bearer ${globalToken}`)
        .send()
        .expect(200);

    const user = await usersService.getUser(email);
    expect(user).toBeNull();
    const anyUserToken = await tokensService.getUserTokens(globalUser._id);
    expect(anyUserToken).toEqual([]);
});


