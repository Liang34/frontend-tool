module.exports = toEmail => {
    const nodemailer = require('nodemailer')
    const smtpTransport = require('nodemailer-smtp-transport')

    const assert = require('http-assert')

    const transport = nodemailer.createTransport(smtpTransport({
        host: 'smtp.163.com', // 服务 由于我用的163邮箱
        port: 465, // smtp端口 默认无需改动
        secure: true,
        auth: {
            user: '18948006184@163.com', // 用户名
            pass: 'ZIEUFIMWRMCCLJNS' // SMTP授权码
        }
    }));

    const randomFns = () => { // 生成6位随机数
        let code = ""
        for (let i = 0; i < 6; i++) {
            code += parseInt(Math.random() * 10)
        }
        return code
    }
    const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/ //验证邮箱正则

    if (regEmail.test(toEmail)) {
        let code = randomFns()
        transport.sendMail({
            from: '18948006184@163.com', // 发件邮箱
            to: toEmail, // 收件列表
            subject: '验证你的电子邮件', // 标题
            html: `
          <p>你好！</p>
          <p>您正在注册账号</p>
          <p>你的验证码是：<strong style="color: #ff4e2a;">${code}</strong></p>
          <p>***该验证码5分钟内有效***</p>` // html 内容
        },
            function (error, data) {
                assert(!error, 500, "发送验证码错误！")
                transport.close(); // 如果没用，关闭连接池
            })
            // 设置5分钟后过期
        //   const Code = require("../models/Code")
        //   const e_mail = toEmail
        //   await Code.deleteMany({e_mail})
        //   const [data] = await Code.insertMany({e_mail,veri_code:code})
        //   setTimeout(async ()=>{    //5分钟后失效
        //       await Code.deleteMany({e_mail})
        //   },1000*60*5)
    } else {
        assert(false, 422, '请输入正确的邮箱格式！')
    }
}
