const express = require('express');
var bodyParser = require('body-parser');

const routes = require('./routes/routes');

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

app.use(express.json());

app.use('/api', routes)


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
 })