const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/user.route');
const postRouter = require('./routers/post.route');


if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const dotenv = require('dotenv');
    dotenv.config();
}

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(postRouter);

// Resource not found
app.use((_req, res) => {
    res.status(404).send('Resource not found');
});


module.exports = app;
