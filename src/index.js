import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import * as UserController from '../src/controllers/UserController.js'


dotenv.config()

const app = express()

mongoose
  .connect(process.env.MONGO_DEV_URL)
  .then(() => console.log('mongo connected success'))
  .catch((error) => `mongo connect error ${error}`)

app.get('/', (req, res) => res.send('Server is up and running'))
app.get('/create-user', UserController.create)

const port = 3000
app.listen(port, () => console.log(`Server is running on port ${port}`))
