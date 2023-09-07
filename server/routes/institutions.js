const express = require("express")

const { loginInstitution, signupInstitution } = require('../controllers/institutionController')

const router = express.Router()

router.post("/login", loginInstitution)

router.post("/signup", signupInstitution)

module.exports = router