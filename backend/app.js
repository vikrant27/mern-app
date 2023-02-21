const dotenv = require('dotenv')
const express = require('express');
const connectDB = require('./db/connect');
const cors = require('cors');

const app = express();

// Load Config
dotenv.config({ path:'./config/.env'})



// middleware
app.use(cors());
app.use(express.static('./public'));
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

const PORT = process.env.PORT || 5000;

const start = async() => {
    try {
        //connectDB
        connectDB()
        app.listen(PORT, console.log(`server is listening on port ${PORT}...`))
    } catch (error) {
        console.log(error)
    }
}

start()