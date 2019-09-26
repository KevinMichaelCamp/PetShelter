const express   = require('express'),
      app       = express(),
      mongoose  = require('./config/mongoose');

app.use(express.json());
app.use(express.static(__dirname + '/public/dist/public'));
app.use(express.urlencoded({extended: true}));
require('./config/routes')(app);

app.listen(6789, () => console.log("listening on port 6789"));
