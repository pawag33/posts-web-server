const express = require('express');
const cors = require('./middleware/cors');
// require('./db/mongoose')
const userRouter = require('./routers/user')
// const taskRouter = require('./routers/task')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

app.use(express.json());
app.use(cors);

app.use(userRouter)
// app.use(taskRouter)

module.exports = app;