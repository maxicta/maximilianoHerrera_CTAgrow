const multer = require("multer");

const storageProduct = multer.diskStorage({
    fileFilter(req, file, cb) {
        // Validar tipos de img
        
        
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(
                new Error("Solo se aceptan archivos JPG, JPEG, PNG o GIF"),
                false
            );
        }
        cb(null, true);
    },

    destination: function (req, file, cb) {
        cb(null, "./public/images/products");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storageProduct });

module.exports = upload;
