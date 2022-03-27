const User = require('./user');

const addUser = async (telephone, name) => {
  try {
    await User.create({
      name: name,
      telephone: telephone,
      context: 'onboarding1',
      city: 'null',
      family_income: 'null',
      how_many_residents: 0,
      gender: 'null',
      race: 'null',
      age_group: 'null',
      scholarity: 'null',
      actual_occupation: 'null'
    })
  } catch (error) {
    console.log(error)
  }
}

const existUser = async (telephone = '') => {
  try {
    const allUsers = await User.findAll()
    return allUsers.find((user) => user.dataValues.telephone === telephone) ? true : false
  } catch (error) {
    console.log(error)
  }
}

const findUserData = async (telephone = '') => {
  try {
    const allUsers = await User.findAll()
    return allUsers.find((user) => user.dataValues.telephone === telephone)
  } catch (error) {
    console.log(error)
  }
}

//o fields precisa ser um array
const updateDataByPhone = async (telephone, fields, data) => {
  try {
    const userData = await findUserData(telephone)
    fields.map(async (field) => {
      userData[field] = data
      await userData.save()
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteUserByPhone = async (telephone) => {
  try {
    const userData = await findUserData(telephone)
    await userData.destroy()
  } catch {
    console.log(error)
  }
}

module.exports = { addUser, existUser, findUserData, updateDataByPhone, deleteUserByPhone }