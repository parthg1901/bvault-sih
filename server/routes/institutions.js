const express = require("express")

const { loginInstitution, signupInstitution, checkVerification, updateVerification, getInstitutions,  } = require('../controllers/institutionController')
const { upload } = require("../utils/imageUpload")

const router = express.Router()

router.post("/login", loginInstitution)

router.post("/signup", upload.single("proofImage"), signupInstitution)

router.post("/check", checkVerification)

router.post("/update", updateVerification)

router.get("/get", getInstitutions)

module.exports = router