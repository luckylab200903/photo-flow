const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: {
    function(req, file, cb) {
      cb(null, new Date().toISOString + "-" + file.originalname);
    },
  },
});

const filter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb({ message: "unable to upload unsupported file format" }, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 4 * 1024 * 1024 },
  filter:filter
});

//const upload = multer({ storage: storage });

module.exports = upload;
