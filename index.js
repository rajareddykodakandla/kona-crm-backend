require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require('./Router/userRoute')

const app = express()

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/user", userRoute);

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(
    (res) => {
        console.log("Connected to database");
    },
    (err) => {
        console.log("Unable to connect to database: ", err)
    }
)

app.listen(process.env.PORT, () =>{
    console.log(`You can access server at ${process.env.PORT}`)
})

app.get('/test', (req, res) => {
    res.send('This is for testing')
})