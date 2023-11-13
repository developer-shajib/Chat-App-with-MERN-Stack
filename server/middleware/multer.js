import multer from 'multer';

// multer config
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + Math.floor(Math.random() * 1000000) + '_' + file.fieldname);
  }
});

export const imageMulter = multer({ storage }).single('image');
export const chatImgMulter = multer({ storage }).single('chatImg');
