var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');


/* GET home page. */
router.get('/', function (req, res) {
    res.sendfile("index.html");
});
router.get("/search", function (req, res) {
    var con = req.query.con;
    var yuan = req.query.yuan;
    res.render("see.html");
});
router.get("/qq", function (req, res) {
    let {con} = req.query;
    let url = 'https://v.qq.com/x/search/?q=' + con + '&stag=0&smartbox_ab=';
    request({
        url: encodeURI(url)
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // 输出网页内容
            let $ = cheerio.load(body);
            let data = [];
            $(".result_btn_line .btn_primary").each(function (val, ele) {
                data.push({
                    url: "?url=" + $(ele).attr("href"),
                    text: "立即播放",
                    title: $(ele).parents(".result_item").find(".result_title").find("a em").text(),
                    imgPath: "https:" + $(ele).parents(".result_item").find(".figure img").attr("src"),
                    time:$(ele).parents(".result_item").find(".result_title").find("a span").text()
                });
            });
            res.send({code: 0, data: data});
        } else {
            res.send({code: 1, msg: "err"});
        }
    });
});
router.get("/iqiyi", function (req, res) {
    var {con} = req.query;
    var url = 'https://so.iqiyi.com/so/q_' + con + '?source=input';
    request({
        url: encodeURI(url)
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // 输出网页内容
            var $ = cheerio.load(body);
            // console.log(body);
            var data = [];
            $(".list_item").each(function (index, ele) {
                if ($(ele).find(".bottom_left a.info_play_btn").attr("href")) {
                    $(ele).find(".result_title").each((n, ele) => {
                        data.push({
                            url: "?url=" + $(ele).parents(".result_info").find(".bottom_left a.info_play_btn").attr("href"),
                            text: "立即播放",
                            title: $(ele).parents(".result_info").find(".result_title").find("a").attr("title"),
                            imgPath: "https:" + $(ele).parents(".result_info").siblings().find("a.figure img").attr("src"),
                            time:$(ele).parents(".result_info").find(".result_title").find("em").text()
                        });
                    });

                }

            });
            res.send({code: 0, data: data});
        } else {
            res.send({code: 1, msg: "err"});
        }
    });
});
router.get("/youku", function (req, res) {
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
                    url: "?url=" + $(ele).find(".mod-film-play").find("a").attr("href"),
                    text: "立即播放",
                    title: $(ele).find(".mod-header").find("a").text(),
                    imgPath: "https:" + $(ele).find(".mod-left img").attr("src")
                });
            });
            res.send({code: 0, data: data});
        } else {
            res.send({code: 1, msg: "err"});
        }
    });
});
router.get("/mgtv", function (req, res) {
    var {con} = req.query;
    var url = 'https://so.mgtv.com/so/k-' + con;
    request({
        url: encodeURI(url)
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // 输出网页内容
            var $ = cheerio.load(body);
            var data = [];
            $(".so-result-info").each(function (val, ele) {
                if ($(ele).find("a.so-result-btn").attr("href")) {

                    data.push({
                        url: "?url=" + $(ele).find("a.so-result-btn").attr("href"),
                        text: "立即播放",
                        title: $(ele).find(".result-til em .report-click").eq(0).text(),
                        imgPath: "https:" + $(ele).find(".result-pic img").attr("src"),
                        time:$(ele).find(".result-til .year").eq(0).text()
                    });
                }


            });
            res.send({code: 0, data: data});
        } else {
            res.send({code: 1, msg: "err"});
        }
    });
});
router.get("/video",function (req,res) {
    var {url} = req.query;
    request({
        url: encodeURI(url)
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body = replace(/src=/);
            var $ = cheerio.load(body);
            // 输出网页内容
            // fs.writeFile(filename, body, function () {
            //     res.render("video",{html:body+"<script src='/public/javascripts/insert.js'></script>"});
            // })
            res.end(body+"<script src='/javascripts/insert.js'></script>");
        } else {
            res.render("video",{html:"err"});
        }
    });
});
module.exports = router;
