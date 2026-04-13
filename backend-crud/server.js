const express = require('express');
const mongoose = require('mongoose');
const app = express();


// middleware 
app.use(express.json());


// connect MongoDB 
mongoose.connect('mongodb://127.0.0.1:27017/mydb')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// import routes
const profileRoutes = require('./routes/profileRoutes');

// use routes 
app.use('/', profileRoutes);



// server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});


