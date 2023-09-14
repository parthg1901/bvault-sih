const jwt = require("jsonwebtoken")
const Institution = require("../models/institutionModel")

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "365d"})
}

const loginInstitution = async (req, res) => {
    const { email, password } = req.body
    try {
        const institution = await Institution.login(email, password)
        const token = createToken(institution._id)
        const name = await institution.name
        const verified = await institution.verified
        res.status(200).json({ name, email, token, type: "institutions", verified})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const signupInstitution = async (req, res) => {
    const { name, email, password } = req.body
    const proofImage = req.file
    console.log(name)
    console.log(password)
    try {
        const institution = await Institution.signup(name, email, password, proofImage.filename)
        const token = createToken(institution._id)
        console.log(institution)
        res.status(200).json({name, email, token, type: "institutions", verified: "no"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const checkVerification = async (req, res) => {
    const { email } = req.body
    try {
        const institution = await Institution.findOne({email})
        const verified = institution.verified
        res.status(200).json({ verified })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateVerification = async (req, res) => {
    const { i_id, verified } = req.body
    try {
        const institution = await Institution.findOneAndUpdate({_id: i_id}, {
            verified: verified
        })
        res.status(200).json({ verified })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getInstitutions = async (req, res) => {
    const institutions = await Institution.find({}).sort({updatedAt: -1})
    res.status(200).json(institutions)
}

module.exports = { loginInstitution, signupInstitution, checkVerification, updateVerification, getInstitutions }