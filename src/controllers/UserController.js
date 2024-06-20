import md5 from 'md5'
import ApplicationsModel from '../models/ApplicationsModel.js'
import OrganizationsModel from '../models/OrganizationsModel.js'
import User from '../models/UserModel.js'
import { checkUserExistence } from '../utils/utils.js'

export const login = async (req, res) => {
  try {
    const userEmail = req.body.email
    const userPassword = md5(req.body.password).toString()

    const checkUser = await User.findOne({
      email: userEmail,
      hash: userPassword,
    })

    if (!checkUser) {
      res.status(500).json({ message: 'user not found' })
      return
    }

    res.status(200).json(checkUser)
  } catch (error) {
    console.log('error while login', error)
  }
}

export const getOrganizationCreatorId = async (req, res) => {
  try {
    const organizationId = req.query.organizationId

    const creatorId = await OrganizationsModel.findById(organizationId)

    res.status(200).json({ creator: creatorId.organizationCreator })
  } catch (error) {
    console.log('error while get creator', erro)
  }
}

export const getInviteCode = async (req, res) => {
  try {
    const organizationId = req.query.organizationId

    const inviteCode = await OrganizationsModel.findById(organizationId)

    res.status(200).json({ inviteCode: inviteCode.organizationInviteCode })
  } catch (error) {
    console.log('error while get invite code', error)
  }
}

export const authWithHash = async (req, res) => {
  try {
    const userEmail = req.body.email
    const userPassword = req.body.hash

    const checkUser = await User.findOne({
      email: userEmail,
      hash: userPassword,
    })

    if (!checkUser) {
      res.status(500).json({ message: 'user not found' })
      return
    }

    res.status(200).json(checkUser)
  } catch (error) {
    console.log('error while login', error)
  }
}

export const createUserWithOrganization = async (req, res) => {
  try {
    const isUserExists = await checkUserExistence(req.body.email)

    if (isUserExists) {
      res.status(500).json({ message: 'user already exists' })
      return
    }

    const userPassword = md5(req.body.password).toString()

    const userResponse = new User({
      email: req.body.email,
      role: 1,
      hash: userPassword,
      name: req.body.name,
    })

    await userResponse.save()

    const newOrganization = new OrganizationsModel({
      organizationCreator: userResponse._id,
      organizationInviteCode: md5(new Date().getTime().toString()).toString(),
    })

    await newOrganization.save()

    await User.updateOne(
      {
        _id: userResponse._id,
      },
      {
        organizationId: newOrganization._id,
      },
    )

    const fullUser = await User.findById(userResponse._id)

    res.status(200).json(fullUser)
  } catch (error) {
    console.log('error while register user with org', error)
  }
}

export const createUserWithInvite = async (req, res) => {
  try {
    const isUserExists = await checkUserExistence(req.body.email)

    if (isUserExists) {
      res.status(500).json({ message: 'user already exists' })
      return
    }

    const organizationCode = await OrganizationsModel.findOne({
      organizationInviteCode: req.body.inviteCode,
    })

    if (!organizationCode) {
      res.status(500).json({ message: 'invite code not found' })
      return
    }

    const userPassword = md5(req.body.password).toString()

    const userResponse = new User({
      email: req.body.email,
      role: 0,
      hash: userPassword,
      name: req.body.name,
      organizationId: organizationCode._id,
    })

    await userResponse.save()
    const fullUser = await User.findById(userResponse._id)

    res.status(200).json(fullUser)
  } catch (error) {
    console.log('error while register user with org', error)
  }
}

export const getUsersInOrganization = async (req, res) => {
  try {
    const organizationId = req.query.organizationId

    const usersInOrganization = await User.find({
      organizationId: organizationId,
    })

    res.status(200).json(usersInOrganization)
  } catch (error) {
    console.log('error while get users in organization')
  }
}

export const remove = async (req, res) => {
  try {
    const userId = req.body.id

    console.log('user', userId)

    await User.findOneAndDelete({
      _id: userId,
    })

    const updatedTasks = await ApplicationsModel.updateMany(
      {
        responsibleUser: userId,
      },
      {
        responsibleUser: null,
      },
    )

    res.status(200).json(updatedTasks)
  } catch (error) {
    console.log('error while update user', error)
  }
}

export const update = async (req, res) => {
  try {
    const userId = req.body._id

    await User.updateOne(
      {
        _id: userId,
      },
      {
        email: req.body.email,
        hash: req.body.hash,
        name: req.body.name,
        role: req.body.role,
      },
    )

    res.json(req.body)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось обновить пользователя',
    })
  }
}
