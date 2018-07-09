const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require('fs');

const config = require('../config');

router.get('/', function (req, res) {
    let request_url = 'https://api.megvii.com/faceid/lite/raw/get_random_number';

    let formData = {
        api_key: config.api_key,
        api_secret: config.api_secret,
        biz_no: config.biz_no
    };

    console.log('getrandomNum request formData: ' + '\n' + JSON.stringify(formData));

    request.post({ url: `${request_url}`, formData: formData }, function optionalCallback(err, response, body) {
        if (err) {
            throw new Error(err);
        }
        console.log('get_random_number response body: ' + '\n' + body);
        config.token_random_number = JSON.parse(body).token_random_number;
        res.send(JSON.parse(body).random_number);

    }).pipe(fs.createWriteStream('/root/tfd-app-mp/server/random.json'));
});

module.exports = router;
