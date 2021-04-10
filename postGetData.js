let cheerio = require('cheerio');
let superagent = require('superagent');


//获取提示
function getWeatherTip(WeatherUrl) {
    let p = new Promise(function(resolve, reject) {
        superagent
            .get(WeatherUrl)
            .end(function(err, res) {
                if (err) {
                    reject(err);
                }
                let tip = "";
                let $ = cheerio.load(res.text);
                tip = $(".wea_tips").find("em").text();
                resolve(tip);
            })
    })
    return p;
}
//获取天气信息
function getWeatherData(WeatherUrl) {
    let p = new Promise(function(resolve, reject) {
        superagent
            .get(WeatherUrl)
            .end(function(err, res) {
                if (err) {
                    reject(err);
                }
                let threeDaysData = [];
                let $ = cheerio.load(res.text);
                $(".forecast .days").each(function(item, elem) {
                    const theDay = $(elem).find("li");
                    threeDaysData.push({
                        Day: $(theDay[0])
                            .text()
                            .replace(/(^\s*)|(\s*$)/g, ""),
                        WeatherImgUrl: $(theDay[1])
                            .find("img")
                            .attr("src"),
                        WeatherText: $(theDay[1])
                            .text()
                            .replace(/(^\s*)|(\s*$)/g, ""),
                        Temperature: $(theDay[2])
                            .text()
                            .replace(/(^\s*)|(\s*$)/g, ""),
                        WindDirection: $(theDay[3])
                            .find("em")
                            .text()
                            .replace(/(^\s*)|(\s*$)/g, ""),
                        WindLevel: $(theDay[3])
                            .find("b")
                            .text()
                            .replace(/(^\s*)|(\s*$)/g, ""),
                        Pollution: $(theDay[4])
                            .text()
                            .replace(/(^\s*)|(\s*$)/g, ""),
                        PollutionLevel: $(theDay[4])
                            .find("strong")
                            .attr("class")
                    })
                })
                resolve(threeDaysData);
            })
    })
    return p;

}
//测试用
// getWeatherData().then(res => {
//     console.log(res);
// });
// getWeatherTip().then(res => {
//     console.log(res);
// });

module.exports = { getWeatherData, getWeatherTip };