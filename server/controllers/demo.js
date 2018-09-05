
require('../tools/mongoose')
const user = require('../models/user')

module.exports = async ctx => {
  let result = await user.create({
    username: 'admin',
    password: 'admin'
  })
  ctx.state.data = {
    result
  }
}
