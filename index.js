const express = require('express')
const http = require('http')
const morgan = require("morgan")
const bodyParser = require("body-parser")
const router = require("./Routes/router")
const port = process.env.PORT || 8000
const app = express()
const mongoose = require("mongoose")

mongoose.set('useCreateIndex', true);

app.use(morgan("dev"))
app.use(bodyParser.json({ type: "*/*" }))

router(app)

app.listen(port, () => {
  mongoose.connect('mongodb://localhost:27017/DBUsers', { useNewUrlParser: true, useUnifiedTopology: true });
  console.log(`Server started on http://localhost:${port}`)
})