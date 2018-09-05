
require('../tools/mongoose')
const user = require('../models/user')

module.exports = async ctx => {
  let { username, title, newTitle, post } = ctx.request.body
  let result = await user.updateOne({
    username,
    'dbs.title': title
  }, {
    $set: {
      'dbs.$.title': newTitle,
      'dbs.$.post': post
    }
  })
  if (result.ok === 1) {
    ctx.state = {
      code: 15,
      data: {
        msg: '修改成功'
      }
    }
  } else {
    ctx.state = {
      code: 16,
      data: {
        msg: '修改失败， 请稍后再试'
      }
    }
  }
}
