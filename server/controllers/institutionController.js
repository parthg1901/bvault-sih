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
        res.status(200).json({ name, email, token, type: "institutions"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const signupInstitution = async (req, res) => {
    const { name, email, password } = req.body
    console.log(name)
    try {
        const institution = await Institution.signup(name, email, password)
        const token = createToken(institution._id)

        res.status(200).json({name, email, token, type: "institutions"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginInstitution, signupInstitution }