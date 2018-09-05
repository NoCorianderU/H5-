
require('../tools/mongoose')
const user = require('../models/user')

module.exports = async ctx => {
  let { username, title } = ctx.request.body
  let result = await user.updateOne({
    username
  }, {
    $pull: {
      dbs: {
        title,
      }
    }
  })
  if (result.ok == 1) {
    ctx.state = {
      code: 14,
      data: {
        msg: result
      }
    }
  }
}
