const express = require('express');
const router = express.Router();
const request = require('request');
const multiparty= require('multiparty');
const fs = require('fs');
const chinaTime = require('china-time');

const config = require('../config');

let date = chinaTime('YYYYMMDD');

router.get('/', function(req, res) {
    res.type('text/html');
    res.sendFile('/root/tfd-app-mp/server/public/index.html');
});

router.post('/',function(req,res){
    let form = new multiparty.Form({ uploadDir: '/root/tfd-app-mp/server/images/'});
    form.parse(req, function (err, fields, files) {
        let filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            console.log('parse error: ' + err);
        } else {
            let inputFile = eval("(" + filesTmp + ")").file[0];
            let uploadedPath = inputFile.path;
            console.log('uploadedPath: ' + uploadedPath);
            let request_url = 'https://api.faceid.com/faceid/v1/ocridcard';
            let formData = {
                api_key: config.api_key,
                api_secret: config.api_secret,
                biz_no: config.biz_no,
                image: fs.createReadStream(uploadedPath)
            };

            request.post({url:`${request_url}`, formData: formData}, function optionalCallback(err, response, body) {
                if (err) {
                    throw new Error(err);
                }
            })
                .pipe(fs.createWriteStream('/root/tfd-app-mp/server/ocridcard.json'))
                .on('close', function(){
                    let data = [];
                    let readstream = fs.createReadStream('/root/tfd-app-mp/server/ocridcard.json');

                    readstream.on('data', function (chunk) {
                        data.push(chunk.toString());
                    });
                    readstream.on('close', function () {
                        data = data.toString();
                        let dstPath = '/root/tfd-app-mp/server/images/' + date + '-' + JSON.parse(data).id_card_number + '.jpeg';
                        fs.rename(uploadedPath, dstPath, function (err) {
                            if (err) {
                                console.log('image rename error: ' + err);
                                res.send("{'status':200, 'message': '上传失败！'}");
                            } else {
                                console.log('image rename ok');
                                console.log('id_card info: ' + '\n' + data);
                                res.send(JSON.parse(data));
                            }
                        });
                    });
                });
        }
    });
});

module.exports = router;
