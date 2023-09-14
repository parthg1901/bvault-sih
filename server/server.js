require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")

const certificateRoutes = require("./routes/certificates")
const institutionRoutes = require("./routes/institutions")
const { getImages } = require("./utils/imageUpload")

const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use("/api/certificates", certificateRoutes)
app.use("/api/institutions", institutionRoutes)
app.use("/api/images/:filename", getImages)


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("connected and listening to the port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })