const art = require('art-template');
const fs = require('fs');
const path = require('path');
const getdata = require("./postGetData");
const send = require("./mail");
const artTemplate = require('art-template');
const schedule = require("node-schedule");

//配置部分
//每日发送时间
let EmailHour = 5;
let EmialMinminute = 21;
//目标邮箱
let towhere = 'xxxxxx@qq.com';
//目标地区 请参考墨迹天气
let local = "liaoning/ganjingzi-district";
let WeatherUrl = "https://tianqi.moji.com/weather/china/" + local;
let HtmlData = {};

function app() {
    Promise.all([getdata.getWeatherTip(WeatherUrl), getdata.getWeatherData(WeatherUrl)]).then(
        function(data) {
            HtmlData["tip"] = data[0];
            HtmlData["threeDaysData"] = data[1];
            let template = artTemplate(path.resolve(__dirname, "index.art"))
            const html = template(HtmlData);
            send.sendMail(html, towhere);
        }
    ).catch(function(err) {
        app() //再次获取
        console.log('获取数据失败： ', err);
    })
}

let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 7)];
rule.hour = EmailHour;
rule.minute = EmialMinminute;
console.log('HoneyMail: 开始等待目标时刻...')
let j = schedule.scheduleJob(rule, function() {
    console.log("时间到了，准备发送");
    app();
});