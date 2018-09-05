export default {

  uploadIdentifyCode (state) {
    let identifyCode = ''
    let identifyCodes = "1234567890"
    for (let i = 0; i < 4; i++) {
      identifyCode += identifyCodes[
        Math.floor(Math.random() * (identifyCodes.length - 0) + 0)
      ];
    }
    state.identifyCode = identifyCode
  },

  savaUserinfo (state, user) {
    state.loginState = true
    state.user = user
    state.itemList = user.dbs
  },

  addItem (state, title) {
    state.itemList.push({
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
  },

  editItem (state, item) {
    state.curItem = {
      title: item.title,
      post: item.post
    },
    state.pageList = item.dataList
  },

  deleteItem (state, index) {
    state.itemList.splice(index, 1)
  },

  changePage (state, index) {
    state.pageIndex = index
  },

  addPage (state) {
    state.pageList.push([
      [
        //text
      ],
      [
        //img
      ]
    ],)
  },

  deletePage (state, index) {
    state.pageList.splice(index, 1)
    if (state.pageIndex >= state.pageList.length) {
      if (state.pageList.length === 0) {
        state.pageIndex = 0
      } else {
        state.pageIndex = state.pageList.length -1
      }
    }
  },

  addTextItem (state) {
    if (!state.pageList.length) {
      return
    }
    state.pageList[state.pageIndex][0].push({
      content: '文本',
      style: {
        fontSize: '24px',
        color: '#000000',
        left: '0px',
        top: '0px',
        opacity: 1,
        animationClass: 'none',
        animationDuration: '1s',
        animationDelay: '0s',
        animationIterationCount: 1
      }
    })
  },

  addImgItem (state, item) {
    if (!state.pageList.length) {
      return
    }
    state.pageList[state.pageIndex][1].push({
      name: item.name,
      post: item.src,
      style: {
        width: '200px',
        height: '100px',
        left: '0px',
        top: '0px',
        opacity: 1,
        animationClass: '',
        animationDuration: '1s',
        animationDelay: '0s',
        animationIterationCount: 1
      }
    })
  },

  uploadPost (state, img) {
    state.curItem.post = img
  },

  updateCurItem (state, title) {
    state.curItem.title = title
  }
}
