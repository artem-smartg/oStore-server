const Router = require('express');
const router = new Router()
const multer = require('multer')
const {v1: uuidv4} = require('uuid')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static/');
    },
    filename: async (req, file, cb) => {
        const fileName = uuidv4().toString() + file.originalname
        cb(null, fileName);
    },
})

const upload = multer({storage})

router.post('/', upload.single('file'), function(req, res){
    console.log("req.file", req.file)

    res.json({
        url: `/static/${req.file.filename}`
    })

})

module.exports = router