/**
 * ajax 服务路由集合
 */
const router = require('koa-router')()
const controllers = require('../controllers')

router.get('/demo', controllers.demo)

router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.post('/addItem', controllers.addItem)
router.post('/deleteItem', controllers.deleteItem)
router.post('/upload', controllers.upload)
router.post('/updateItem', controllers.updateItem)

module.exports = router
