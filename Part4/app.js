const config = require("./utils/config")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const cors = require("cors")
const mongoose = require("mongoose")
const middleware = require("./utils/middleware")
const supertest = require('supertest')


const api = supertest(app)

mongoose.set("useCreateIndex", true)
mongoose.set("useFindAndModify", false)
mongoose.set('useUnifiedTopology', true);

console.log('connecting to', config.MONGODB_URI)


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
.then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(middleware.requestLogger)
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test") {
	const testingRouter = require("./controllers/tests")
	app.use("/api/tests", testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

