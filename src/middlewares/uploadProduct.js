const multer = require('multer');

const storageProduct = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/products');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storageProduct });

module.exports = upload
