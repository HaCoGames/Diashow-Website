const fs = require('fs');
const path = require('path');
const multer = require('multer');

const config = require('../config');

const imageExtensionHeaderDictionary = {
    'png': 'image/png',
    'jpg': 'image/jpeg',
};


/**
 * Handles the incomming requests for an image.
 * @param {*} req 
 * @param {*} res 
 * @returns The code of the res.send() method.
 */
const getImage = function (req, res) {
    let parameter = req.params;
    let dataDir = path.join(__dirname, '..', config.dataDir);
    let fileDirectory = path.join(dataDir, parameter.id);
    let fileExtension = fileDirectory.split('.').pop();

    let tested = false;

    for (let extension of Object.keys(imageExtensionHeaderDictionary)) {
        if (fileExtension == extension) {
            tested = true;
            break
        }
    }

    if (!tested) return res.status(400).send({error: `The passed string is not for an image!`, fix: `Please pass a string with an ${Object.keys(imageExtensionHeaderDictionary).join(" or ")}  extension.`});

    let fileExists = fs.existsSync(fileDirectory);
    if (fileExists) {
        res.set("Content-Type", imageExtensionHeaderDictionary[fileExtension])
        return res.status(200).sendFile(fileDirectory);
    } 
    else return res.status(404).send("The Image you requested does not exist!");
}

/**
 * Gets all available images.
 */
const getAvailableImages = function (_req, res) {
    let dataDir = path.join(__dirname, '../data/images');
    let files = fs.readdirSync(dataDir);
    let availableImages = [];

    files.forEach(function (file) {
        if (file.includes('.png') || file.includes('.jpg')) availableImages.push(file);
    });

    res.status(200).send(availableImages);
}

const postImage = function (req, res) {
    return res.status(501).send({error: "This endpoint is not implemented yet!"});
}

function handleError(err, res) {
    res.status(500).send({error: err});
}

module.exports = {
    get : getImage,
    available: getAvailableImages,
    post: postImage,
}