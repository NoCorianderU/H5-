
require('../tools/mongoose')
const user = require('../models/user')

module.exports = async ctx => {
  let { username, itemTitle, pageList } = ctx.request.body
  let result = await user.updateOne({
    username,
    "dbs.title": itemTitle
  }, {
    $set: {
      "dbs.$.dataList": pageList
    }
  })
  if (result.ok === 1) {
    ctx.state = {
      code: 11,
      data: {
        msg: '修改成功'
      }
    }
  }
}
