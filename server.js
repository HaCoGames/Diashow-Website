let express = require('express');
let path = require('path');
let config = require('./config');
let multer = require('multer');

let images = require('./listeners/image');

let app = express();
let port = process.env.PORT || config.port || 3000;
let API_PREFIX = "/api";

const upload = multer({dest: "./data/uploads"});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'wwwPublic')));

app.get(`${API_PREFIX}/image/:id`, images.get);
app.get(`${API_PREFIX}/images`, images.available);
app.post(`${API_PREFIX}/image`,upload.single("file"), images.post);

app.listen(port, () => {
    console.log('Server running on port ' + port);
});