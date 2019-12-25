const usersService = require('../src/services/users.service');
const tokensService = require('../src/services/tokens.service');
const postsService = require('../src/services/posts.service');
const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db/mongoose');


let postContent = 'This is post content';
let postTitle = 'Post title';

const email = 'test3@test.com';
const name = 'John-Smith';
const password = 'Very@StrongPass777';

let globalToken;
let globalUser;
let createdPost;


beforeAll(async () => {
   await db.connectToDb();
   // create mock user
   
   globalUser = await usersService.createUser({email:email,password:password,name:name});
   globalToken = await tokensService.generateAuthToken(globalUser);
});

  afterAll(async () => {
      try{
         await  usersService.deleteUser(email);
         await tokensService.deleteAllUserTokens(globalUser._id);
         // if test to delete post failed 
         await postsService.deleteUserPost(createdPost.id,globalUser._id);
      }
      catch(err) {}
      await db.disconnetFromDb();
  });

 

test('Should create a new post', async () => {
    const response = await request(app)
                    .post('/post')
                    .set('Authorization', `Bearer ${globalToken}`)
                    .send({
                        title: postTitle,
                        content: postContent
                    }).expect(201);

    // verify response
    expect(response.body).not.toBeNull();

    createdPost = response.body;

    // Assert that the database was changed correctly
    const post = await postsService.getUserPost(response.body.id);
    expect(post).not.toBeNull();

    expect(response.body).toEqual({title: post.title, content: post.content, id: post._id.toString(), creator : post.creator.name});
});

test('Should update a  post', async () => {
    postTitle = "update title";
    postContent = "update content";

    const response = await request(app)
                    .put('/post/'+createdPost.id)
                    .set('Authorization', `Bearer ${globalToken}`)
                    .send({
                        title: postTitle,
                        content: postContent
                    }).expect(200);

    // Assert that the database was changed correctly
    const post = await postsService.getUserPost(createdPost.id);
    expect(post).toMatchObject({title: postTitle, content: postContent});
});

test('Should get a post', async () => {
 
    const response = await request(app)
                    .get('/post/'+createdPost.id)
                    .send().expect(200);

    // verify response
    expect(response.body).not.toBeNull();
    expect(response.body).toEqual({title: postTitle, content: postContent, creator : globalUser.name , id : createdPost.id});
});

test('Should get a all post', async () => {
 
    const response = await request(app)
                    .get('/post')
                    .send().expect(200);

    // verify response
    expect(response.body).not.toBeNull();
    expect(response.body[0]).toEqual({title: postTitle, content: postContent, creator : globalUser.name , id : createdPost.id});
});


test('Should delete a post', async () => {
    await request(app)
        .delete('/post/'+createdPost.id )
        .set('Authorization', `Bearer ${globalToken}`)
        .send()
        .expect(200);

    const post = await postsService.getUserPost(createdPost.id);
    expect(post).toBeNull();
});




