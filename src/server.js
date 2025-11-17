require('dotenv/config');
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log('Running on ' + PORT));
