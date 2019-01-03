var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendfile("index.html");
});
router.get("/search", function (req, res) {

    var con = req.query.con;
    var yuan = req.query.yuan;
    // 通过 GET 请求来读取 http://cnodejs.org/ 的内容
    if (yuan == 't') {
        var url = 'https://v.qq.com/x/search/?q=' + con + '&stag=0&smartbox_ab=';
        request({
            url: encodeURI(url)
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // 输出网页内容
                var $ = cheerio.load(body);
                var data = [];
                $(".result_btn_line .btn_primary").each(function (val, ele) {
                    data.push({
                        url: "http://jx.52xftv.cn/?url=" + $(ele).attr("href"),
                        text: $(ele).text(),
                        title: $(ele).parents(".result_item").find(".result_title").find("a").text(),
                        imgPath: "https:" + $(ele).parents(".result_item").find(".figure img").attr("src")
                    });
                });
                res.render("see", {data: data});
            } else {
                res.send(error);
            }
        });
    }else if(yuan == 'a'){
        var url = 'https://so.iqiyi.com/so/q_' + con + '?source=input';
        request({
            url: encodeURI(url)
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // 输出网页内容
                var $ = cheerio.load(body);
                var data = [];
                $(".series-item").each(function (val, ele) {
                    data.push({
                        url: "http://jx.52xftv.cn/?url=" + $(ele).find(".result_title").find("a").attr("href"),
                        text: $(ele).find(".info_item_bottom").find("a").text(),
                        title: $(ele).find(".result_title").find("a").text(),
                        imgPath: "https:" + $(ele).find(".figure-wrapper a img").attr("src")
                    });
                });
                res.render("see", {data: data});
            } else {
                res.send(error);
            }
        });
    }else if(yuan == 'y'){
        var url = 'https://so.youku.com/search_video/q_' + con;
        request({
            url: encodeURI(url)
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // 输出网页内容
                var $ = cheerio.load(body);
                console.log($(".sk-mod"));
                var data = [];
                $(".l-wrap .sk-mod").each(function (val, ele) {
                    console.log(1);
                    data.push({
                        url: "http://jx.52xftv.cn/?url=" + $(ele).find(".mod-film-play").find("a").attr("href"),
                        text: $(ele).find(".mod-film-play").find("span").text(),
                        title: $(ele).find(".mod-header").find("a").text(),
                        imgPath: "https:" + $(ele).find(".mod-left img").attr("src")
                    });
                });
                res.render("see", {data: data});
            } else {
                res.send(error);
            }
        });
    }else if(yuan == 'm'){
        var url = 'https://so.mgtv.com/so/k-' + con;
        request({
            url: encodeURI(url)
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // 输出网页内容
                var $ = cheerio.load(body);
                var data = [];
                $(".so-result-info").each(function (val, ele) {
                    data.push({
                        url: "http://jx.52xftv.cn/?url=" + $(ele).find("a.so-result-btn").attr("href"),
                        text: $(ele).find("a.so-result-btn span").text(),
                        title: $(ele).find(".result-til .report-click").text(),
                        imgPath: "https:" + $(ele).find(".result-pic img").attr("src")
                    });
                });
                res.render("see", {data: data});
            } else {
                res.send(error);
            }
        });
    }

});
module.exports = router;
