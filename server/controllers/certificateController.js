const Certificate = require("../models/certificateModel");
const { signer } = require("../utils/wallet");
const ethers = require("ethers");
const QRCode = require("qrcode");

const signCertificate = async (req, res, next) => {
  const { message, cid } = req.body;
  console.log(message, cid);
  const signerFn = await signer();
  signerFn
    .signMessage(ethers.solidityPackedKeccak256(["string"], [message]))
    .then(async (signature) => {
      const certificate = await Certificate.create({ message, cid, qr: " " });
      console.log(certificate._id);
      QRCode.toDataURL(
        JSON.stringify({
          message: message,
          cid,
          signature: signature,
          c_id: certificate._id,
        })
      )
        .then(async (url) => {
          await Certificate.findOneAndUpdate(
            { _id: certificate._id },
            {
              qr: url,
            }
          );
          await res.status(200).send({
            qr: url,
            _id: certificate._id,
            timestamp: certificate.createdAt,
          });
          console.log(url);
        })
        .catch((err) => {
          res.status(400).json(err);
          console.error(err);
        });
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
};

const verifyCertificate = async (req, res, next) => {
  try {
    const { c_id, message, signature, cid } = req.body;
    const certificate = await Certificate.findById(c_id);
    if (
      ethers.verifyMessage(
        ethers.solidityPackedKeccak256(["string"], [message]),
        signature
      ) === process.env.OWNER
    ) {
      await res.status(200).json({
        _id: c_id,
        message,
        cid,
        timestamp: certificate.createdAt,
        qr: certificate.qr,
      });
    } else {
      await res.status(404).json({ msg: "The certificate is not valid" });
    }
  } catch (err) {
    await res.status(404).json({ msg: "The certificate is not valid" });
  }
};

module.exports = {
  signCertificate,
  verifyCertificate,
};
