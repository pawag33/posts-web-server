const app = require('./app');
const db = require('./db/mongoose');

const port = process.env.PORT || 3000;

db.connectToDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is up on port ${port}`);
    });
});