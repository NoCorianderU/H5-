
require('../tools/mongoose')
const user = require('../models/user')

module.exports = async ctx => {
  let { username, password } = ctx.request.body
  let result = await user.find({
    username
  })
  if (result.length == 0) {
    let data = await user.create({
      username,
      password
    })
    ctx.state.data = {
      userinfo: data
    }
  } else {
    ctx.state = {
      code: 1,
      data: {
        msg: '用户名已存在'
      }
    }
  }
}
