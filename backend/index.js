
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/router');  
const  mongoose  = require('mongoose');
const cors = require("cors")

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Yashi:QPEHxrJgXeuX6UVu@cluster1.gswwfzc.mongodb.net/?retryWrites=true&w=majority&appName=EmployeeManagement", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use('/', route);


app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});
