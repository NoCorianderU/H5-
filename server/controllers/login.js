
require('../tools/mongoose')
const user = require('../models/user')

module.exports = async ctx => {
  let { username, password } = ctx.request.body
  let result = await user.findOne({
    username
  })
  if (result) {
    if (result.password === password) {
      let userinfo = {
        username: result.username,
        dbs: result.dbs
      }
      ctx.state = {
        code: 11,
        data: {
          msg: '登陆成功',
          userinfo
        }
      }
    } else {
      ctx.state = {
        code: 12,
        data: {
          msg: '密码错误'
        }
      }
    }
  } else {
    ctx.state = {
      code: 14,
      data: {
        msg: '用户名不存在'
      }
    }
  }
}
