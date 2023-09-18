const Certificate = require("../models/certificateModel")
const { signer } = require("../utils/wallet")
const ethers = require("ethers")
const QRCode = require("qrcode")

const signCertificate = async (req, res, next) => {
    const {name, title, description, institution, signerName, signerDesignation} = await req.body;
    console.log(signerDesignation)
    console.log(institution)
    const { logo,  templateURL, signatureURL } = await req.files
    console.log(req.body)
    console.log(req.files)
    console.log(templateURL)
    console.log(logo)
    const signerFn = await signer()
    const message = `The ${title} has been issued to ${name}, by ${institution} on ${new Date().toLocaleDateString()}`
    signerFn.signMessage(ethers.solidityPackedKeccak256(["string"], [message])).then(async (signature) => {
        const certificate = await Certificate.create({logo: logo[0].filename, name, title, description, institution: institution, templateURL: templateURL[0].filename, signatureURL :signatureURL[0].filename, signerDetails: {name: signerName, designation: signerDesignation}, qr: " "})
        console.log(certificate._id)
        QRCode.toDataURL(JSON.stringify({message: message, signature: signature, c_id: certificate._id}))
            .then(async (url) => {
                await Certificate.findOneAndUpdate({_id: certificate._id}, {
                    qr: url
                })
                await res.status(200).send(url)
                console.log(url)
            })
            .catch(err => {
                res.status(400).json(err)
                console.error(err)
            })
    }).catch(err => {
        res.status(400).json(err)
        console.log(err)
    })
}

const verifyCertificate = async (req, res, next) => {
    const { c_id, message, signature } = req.body
    const certificate = await Certificate.findById(c_id)
    if (ethers.verifyMessage(ethers.solidityPackedKeccak256(["string"], [ message ]), signature) === process.env.OWNER) {
        await res.status(200).json({c_id, message, certificate})
    } else {
        await res.status(404).json({msg: "The certificate is not valid"})
    }
}


module.exports = {
    signCertificate, 
    verifyCertificate
}