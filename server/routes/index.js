module.exports = function(app){
    var login = require('../controllers/login');
    app.use('/weapp/login', login);

    var uploadImage = require('../controllers/uploadImage');
    app.use('/weapp/upload/images', uploadImage);

    var getrandomNum = require('../controllers/getrandomNum');
    app.use('/weapp/getrandomNum', getrandomNum);

    var uploadVideo = require('../controllers/uploadVideo');
    app.use('/weapp/upload/videos', uploadVideo);

    var validateVideo = require('../controllers/validateVideo');
    app.use('/weapp/validateVideo', validateVideo);

    var verify = require('../controllers/verify');
    app.use('/weapp/verify', verify);
};
