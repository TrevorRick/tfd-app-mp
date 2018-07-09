const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const fs = require('fs');
const chinaTime = require('china-time');

let date = chinaTime('YYYYMMDD');

router.get('/', function (req, res) {
    res.type('text/html');
    res.sendFile('/root/tfd-app-mp/server/public/index.html');
});

router.post('/', function (req, res) {
    let form = new multiparty.Form({ uploadDir: '/root/tfd-app-mp/server/videos' });
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        let filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            console.log('parse error: ' + err);
        } else {
            let inputFile = JSON.parse(filesTmp).video[0];
            let uploadedPath = inputFile.path;

            let data = [];
            const readstream = fs.createReadStream('/root/tfd-app-mp/server/ocridcard.json');
            readstream.on('data', function (chunk) {
                data.push(chunk.toString());
            });
            readstream.on('close', function () {
                data = data.toString();
                let dstPath = '/root/tfd-app-mp/server/videos/' + date + '-' + JSON.parse(data).id_card_number + '.mp4';
                fs.rename(uploadedPath, dstPath, function (err) {
                    if (err) {
                        console.log('video rename error: ' + err);
                        res.send("{'status':200, 'message': '上传失败！'}");
                    } else {
                        console.log('video rename ok');
                        res.send("{'status':200, 'message': '上传成功！'}");
                    }
                });

            });
        }
    });
});

module.exports = router;
