const express = require("express")

const { signCertificate, verifyCertificate } = require('../controllers/certificateController')
const { upload } = require("../utils/imageUpload")

const router = express.Router()

router.post("/sign", upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'templateURL', maxCount: 1 }, { name : 'signatureURL', maxCount: 1}]), signCertificate)
router.post("/verify",verifyCertificate)



module.exports = router