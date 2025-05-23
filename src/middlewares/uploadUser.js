const multer = require('multer');

const storageUser = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/users');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storageUser });

module.exports = upload
