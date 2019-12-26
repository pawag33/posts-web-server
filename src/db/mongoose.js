const mongoose = require('mongoose');

const connectToDb = async () => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Connected to MongoDB')
    });
   await mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true,  useCreateIndex:true});
}

const disconnetFromDb = async () => {
     mongoose.connection.close();
}

module.exports = {
    connectToDb,
    disconnetFromDb
}


