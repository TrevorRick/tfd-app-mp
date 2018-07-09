const express = require('express');
const router = express.Router();
const fs = require('fs');
const request = require('request');
const chinaTime = require('china-time');

const config = require('../config');

let date = chinaTime('YYYYMMDD');

router.get('/', function (req, res) {
    let data = [];
    const readstream = fs.createReadStream('/root/tfd-app-mp/server/ocridcard.json');

    readstream.on('data', function (chunk) {
        data.push(chunk.toString());
    });

    readstream.on('close', function () {
        data = data.toString();
        let dstPath = '/root/tfd-app-mp/server/videos/' + date + '-' + JSON.parse(data).id_card_number + '.mp4';
        let name = JSON.parse(data).name,
            id_card_number = JSON.parse(data).id_card_number;
        let request_url = 'https://api.megvii.com/faceid/lite/raw/validate_video';

        let formData = {
            api_key: config.api_key,
            api_secret: config.api_secret,
            biz_no: config.biz_no,
            video: fs.createReadStream(dstPath),
            token_random_number: config.token_random_number
        };

        console.log('valiedateVideo request formData: ' + '\n' +JSON.stringify(formData));

        request.post({ url: `${request_url}`, formData: formData }, function optionalCallback(err, response, body) {
            if (err) {
                throw new Error(err);
            }

            console.log('valiedateVideo response body : ' + '\n'+ body);

            // verify action
            let token_video = JSON.parse(body).token_video;
            let request_url = 'https://api.megvii.com/faceid/lite/raw/verify';

            let formData = {
                api_key: config.api_key,
                api_secret: config.api_secret,
                biz_no: config.biz_no,
                token: `${token_video}`,
                comparison_type: 1,
                idcard_name: `${name}`,
                idcard_number: `${id_card_number}`
            };

            console.log('verify reqeust formData: ' + '\n' + JSON.stringify(formData));

            request.post({ url: `${request_url}`, formData: formData }, function optionalCallback(err, response, body) {
                if (err) {
                    throw new Error(err);
                }

                console.log('verify response body: ' + '\n' + body);

                if (JSON.parse(body).liveness.procedure_validation != 'PASSED') {
                    res.send({
                        procedure_validation: JSON.parse(body).liveness.procedure_validation
                    });
                } else {
                    res.send({
                        name: `${name}`,
                        id_card_number: `${id_card_number}`,
                        procedure_validation: JSON.parse(body).liveness.procedure_validation,
                        confidence: JSON.parse(body).result_faceid.confidence
                    });
                }
            });
        });
    });
});

module.exports = router;
