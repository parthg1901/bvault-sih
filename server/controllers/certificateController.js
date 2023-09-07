const Certificate = require("../models/certificateModel")
const { signer } = require("../utils/wallet")

const ethers = require("ethers")
const QRCode = require("qrcode")
const Jimp = require("jimp")
const qrCodeReader = require('qrcode-reader');


const signCertificate = async (req, res, next) => {
    const {logo, name, title, description, institution, templateURL, signatureURL, signerDetails} = req.body;
    const signerFn = await signer()
    const message = `The ${title} has been issued to ${name}, by ${institution} on ${new Date().toLocaleDateString()}`
    signerFn.signMessage(ethers.solidityPackedKeccak256(["string"], [message])).then(async (signature) => {
        const certificate = await Certificate.create({logo, name, title, description, institution, templateURL, signatureURL, signerDetails, qr: " "})
        console.log(certificate._id)
        QRCode.toDataURL(JSON.stringify({message: message, signature: signature, c_id: certificate._id}))
            .then(async (url) => {
                await Certificate.findOneAndUpdate({_id: certificate._id}, {
                    qr: url
                })
                await res.status(200).json({qr: url})
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
    const { qr } = req.body
    if (qr) {
        console.log(qr)
        const buffer = Buffer.from(qr, "base64")
        console.log(buffer)
        Jimp.read(buffer, async function(err, image) {
            if (err) {
                console.error(err);
            }
            console.log("here")
            const qrCodeInstance = new qrCodeReader();
            console.log(image)
            qrCodeInstance.callback = async function(err, value) {
                if (err) {
                    console.error(err);
                }
                console.log("here")
                console.log(value.result);
                const { c_id, signature, message } = JSON.parse(value.result);
                const certificate = await Certificate.findById(c_id)
                if (ethers.verifyMessage(ethers.solidityPackedKeccak256(["string"], [ message ]), signature) === process.env.OWNER) {
                    await res.status(200).json({c_id, message, certificate})
                } else {
                    await res.status(404).json({msg: "The certificate is not valid"})
                }
            };
            qrCodeInstance.decode(image.bitmap)
        });
    } else {
        const { c_id, message, signature } = req.body
        const certificate = await Certificate.findById(c_id)
        if (ethers.verifyMessage(ethers.solidityPackedKeccak256(["string"], [ message ]), signature) === process.env.OWNER) {
            await res.status(200).json({c_id, message, certificate})
        } else {
            await res.status(404).json({msg: "The certificate is not valid"})
        }
    }
}

module.exports = {
    signCertificate, 
    verifyCertificate
}