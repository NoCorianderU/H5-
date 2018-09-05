
require('../tools/mongoose')
const user = require('../models/user')

module.exports = async ctx => {
  let { username, title } = ctx.request.body
  let result = await user.findOne({
    username
  })
  let flag = false
  result.dbs.forEach ( i => {
    if (i.title == title) {
      flag = true
      return
    }
  })
  if (!flag) {
    result.dbs.push({
      title,
      post: '',
      dataList: [
        [
          [

          ],
          [

          ]
        ]
      ]
    })
    result.save()
    ctx.state.code = 12
    ctx.state.data = {
      msg: '添加成功'
    }
  } else {
    ctx.state.code = 13
    ctx.state.data = {
      msg: '重复命名'
    }
  }
}
