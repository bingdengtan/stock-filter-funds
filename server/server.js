var express = require('express');
var path = require('path');
var mount = require('mount-routes');

var app = express();

bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;  
var router = express.Router(); 

app.use("/", express.static(path.join(__dirname,'..','client/dist')))
mount(app);

app.listen(port);
console.log('Server is running...');