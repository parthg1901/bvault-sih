const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const institutionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    proofImage: {
        type: String,
        required: true,
        unique: true
    },
    verified: {
        type: String, // yes / no / rejected
        required: true
    }
})

institutionSchema.statics.signup = async function(name, email, password, proofImage) {
    if (!name || !email || !password) {
        throw Error("All the fields must be filled")
    }
    if (!validator.isEmail(email)) {
        throw Error("Please enter a valid email address")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }
    const exists = await this.findOne({email})
    if (exists) {
        throw Error("Email already in use. Please log in!")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const institution = await this.create({name, email, password: hash, proofImage ,verified: "no"})

    return institution
}

institutionSchema.statics.login = async function(email, password) {

    if (!email || !password) {
      throw Error('All fields must be filled')
    }
  
    const institution = await this.findOne({ email })
    if (!institution) {
      throw Error('Email not found. Please sign up!')
    }
  
    const match = await bcrypt.compare(password, institution.password)
    if (!match) {
      throw Error('Incorrect password')
    }
  
    return institution
  }
  
  module.exports = mongoose.model("Institution", institutionSchema)