const express = require('express');
const config = require('./config');
const path = require('path');

const app = express();

var routes = require('./routes/index');
routes(app);

process.on('uncaughtException', error => {
    console.log(error);
});

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port',(config.port || 3000));
app.listen(app.get('port'),function(){
    console.log('Server listening on port:',app.get('port'));
});
