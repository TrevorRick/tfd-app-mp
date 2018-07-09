const express = require('express');
const router = express.Router();
const fs = require('fs');
const request = require('request');

const config = require('../config');

router.get('/', function (req, res) {
    const validate_file = '/root/tfd-app-mp/server/validateVideo.json';
    let validate_result = JSON.parse(fs.readFileSync(validate_file));

    const ocridcard_file = '/root/tfd-app-mp/server/ocridcard.json';
    const ocridcard_result = JSON.parse(fs.readFileSync(ocridcard_file));

    let request_url = 'https://api.megvii.com/faceid/lite/raw/verify';

    let formData = {
        api_key: config.api_key,
        api_secret: config.api_secret,
        biz_no: config.biz_no,
        token: validate_result.token_video,
        comparison_type: 1,
        idcard_name: ocridcard_result.name,
        idcard_number: ocridcard_result.id_card_number
    };

    console.log('verify reqeust formData: ' + '\n' + JSON.stringify(formData));

    request.post({ url: `${request_url}`, formData: formData }, function optionalCallback(err, response, body) {
        if (err) {
            throw new Error(err);
        }
        console.log('verify response body: ' + '\n' + body);
        res.send({
            name: ocridcard_result.name,
            id_card_number: ocridcard_result.id_card_number,
            procedure_validation: JSON.parse(body).liveness.procedure_validation,
            confidence: JSON.parse(body).result_faceid.confidence
        });
    });
});

module.exports = router;
