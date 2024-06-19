import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import * as UserController from '../src/controllers/UserController.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose
  .connect(process.env.MONGO_DEV_URL)
  .then(() => console.log('mongo connected success'))
  .catch((error) => `mongo connect error ${error}`)

app.get('/', (req, res) => res.send('Server is up and running'))

app.patch('/update-user', UserController.update)
app.delete('/delete-user', UserController.remove)

app.post(
  '/register-with-organization',
  UserController.createUserWithOrganization,
)
app.post('/register-with-invite', UserController.createUserWithInvite)
app.post('/login', UserController.login)

const port = 3000
app.listen(port, () => console.log(`Server is running on port ${port}`))
