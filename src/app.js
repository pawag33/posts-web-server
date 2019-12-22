const express = require('express');
const cors = require('./middleware/cors');
// require('./db/mongoose')
const userRouter = require('./routers/user.route');
//const s = require('./services/tokens.service');

// const taskRouter = require('./routers/task')
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}

//(async () => { await s.deleteAllTokens();})();


const app = express();

app.use(express.json());
app.use(cors);

app.use(userRouter);
// app.use(taskRouter)

// Resource not found
app.use((_req, res) => {
    res.status(404).send('Resource not found');
});


module.exports = app;