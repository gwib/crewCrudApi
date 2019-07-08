var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

var app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));


const db = require('./app/config/db.config');

// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
    console.log('Drop and Resync with { force: false }');
});


// ROUTES
require('./app/routes/crew.routes.js')(app);


// Create Server
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("App listening at http://%s:%s", host, port)

});
