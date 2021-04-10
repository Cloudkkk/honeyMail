const nodemailer = require('nodemailer');
const dayjs = require('dayjs');
const art = require('art-template');
const fs = require('fs');
const path = require('path');



//发送邮件
function sendMail(html, towhere) {
    let time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com", //网易为smtp.163.com
        secureConnection: true,
        port: 465,
        secure: true,
        auth: {
            user: 'xxxxxx@qq.com',
            pass: 'xxxxxx' //smtp授权码
        }
    })
    let mailOptions = {
        from: 'xxxxxx@qq.com',
        to: towhere,
        subject: 'To my honey',
        html: html
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('sendMail failed', error)
            return
        }
        console.log('sendMail successed', time)
    })
}
module.exports = { sendMail }