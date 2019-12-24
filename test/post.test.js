const usersService = require('../src/services/users.service');
const tokensService = require('../src/services/tokens.service');
const postsService = require('../src/services/posts.service');
const request = require('supertest');
const app = require('../src/app');
const jwt = require('jsonwebtoken');
const db = require('../src/db/mongoose');


const postContent = 'This is post content';
const postTitle = 'Post title';

const email = 'test3@test.com';
const name = 'John-Smith';
const password = 'Very@StrongPass777';

let globalToken;
let globalUser;


beforeAll(() => {
   await db.connectToDb();
   // create mock user
   
   globalUser = await usersService.createUser({email:email,password:password,name:name});
   const anyUserToken = await tokensService.getUserTokens(globalUser._id);
   globalToken = anyUserToken[0];
  });

  afterAll(async () => {
      try{
         await  usersService.deleteUser(email);
      }
      catch(err) {}
      await db.disconnetFromDb();
  });

 

test('Should create a new post', async () => {
    const response = await request(app).post('/post').send({
        title: postTitle,
        content: postContent
    }).expect(201);

    // complete test !!!

    // // verify response
    // expect(response.body.user).not.toBeNull();

    // // Assert that the database was changed correctly
    // const user = await usersService.getUser(email);
    // expect(user).not.toBeNull();

    // // verify token
    // const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET);

    // expect(decoded).not.toBeNull();

    // expect(user.password).not.toBe(password);

    // const token = await tokensService.getToken(response.body.token,user._id);
    // expect(token).not.toBeNull();

    // globalToken = response.body.token;
    // globalUser = user;
});

