import User from '../models/UserModel.js'

export const create = async (req, res) => {
  try {
    const createResponse = new User({
      avatar: 'sdkfjsdlkfjsldfjdl',
      email: 'huy',
      role: 1,
      hash: '12',
      name: 'huy'
    })

    await createResponse.save()

    res.json(createResponse)
  } catch (error) {
    console.log('error while create', error)
  }
}
