const express = require("express")

const { signCertificate, verifyCertificate } = require('../controllers/certificateController')
const { upload } = require("../utils/imageUpload")

const router = express.Router()

router.post("/sign", signCertificate)
router.post("/verify", verifyCertificate)



module.exports = router