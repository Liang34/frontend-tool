const router = require('koa-router')()
const sendEmail = require('../controller/index')

router.get('/api/sendCode', async ctx => {
    const res = sendEmail('1160685230@qq.com')
    ctx.body = {
        code: 0,
        msg: "验证码已经发送"
    }
})
module.exports = router;
