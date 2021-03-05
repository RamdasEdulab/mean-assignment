const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./database/db');
var category = require('./routes/category');
var product = require('./routes/product');
cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', category);
app.use('/api', product);
app.listen(3000, () => console.log('Server started at port : 3000'));
