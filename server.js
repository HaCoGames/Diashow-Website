let express = require('express');
let path = require('path');
let app = express();
let port = process.env.PORT || 3000;

let API_PREFIX = "/api";

let images = require('./listeners/image');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'wwwPublic')));

app.get(`${API_PREFIX}/image/:id`, images.get);
app.get(`${API_PREFIX}/images`, images.available);

app.listen(port, () => {
    console.log('Server running on port ' + port);
});