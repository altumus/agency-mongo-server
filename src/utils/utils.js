import User from '../models/UserModel.js'

export const checkUserExistence = async (email) => {
  const results = await User.find({
    email: email,
  })

  const isExists = results.find((user) => user.email === email)

  return isExists
}
