import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import * as ApplicationsController from '../src/controllers/ApplicationsController.js'
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

// логинация + регистрация
app.post(
  '/register-with-organization',
  UserController.createUserWithOrganization,
)
app.post('/register-with-invite', UserController.createUserWithInvite)
app.post('/login', UserController.login)
app.post('/hash-auth', UserController.authWithHash)

// работа с пользователями
app.patch('/update-user', UserController.update)
app.post('/delete-user', UserController.remove)
app.get('/users-in-organization', UserController.getUsersInOrganization)
app.get('/get-invite-code', UserController.getInviteCode)
app.get('/organization-creator-id', UserController.getOrganizationCreatorId)

// работа с заявками
app.get('/my-applications', ApplicationsController.getMyApplications)
app.post('/create-application', ApplicationsController.createApplication)
app.get(
  '/get-employees-applications',
  ApplicationsController.getEmployeesApplications,
)
app.get(
  '/incoming-applications',
  ApplicationsController.getIncomingApplications,
)
app.patch('/update-application', ApplicationsController.updateApplication)
app.post('/remove-application', ApplicationsController.removeApplication)

const port = 3000
app.listen(port, () => console.log(`Server is running on port ${port}`))
