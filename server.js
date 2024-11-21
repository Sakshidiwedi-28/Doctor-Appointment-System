const  express = require('express');
const colors = require('colors');
const moragan = require('morgan');
const dotenv = require ('dotenv');
const connectDB = require('./config/db');


//dotenv config
config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(json());
app.use(moragan( 'dev' ));

//routes
app.use('/api/v1/user', require('./routes/userRoutes'));

// port
const port = process.env.PORT || 8080
//listen port
app.listen(port, () => {
    console.log(
        `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
        .bgCyan.white
    );
});