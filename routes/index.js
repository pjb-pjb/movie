var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile("index.html");
});
router.get("/search",function (req,res) {

    var con = req.query.con;
// 通过 GET 请求来读取 http://cnodejs.org/ 的内容
    var url = 'https://v.qq.com/x/search/?q='+con+'&stag=0&smartbox_ab=';
    request({
        url:encodeURI(url)
    },function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // 输出网页内容
            var $ = cheerio.load(body);
            var data = [];
           $(".result_btn_line .btn_primary").each(function (val,ele) {
               data.push({
                   url:"http://jx.52xftv.cn/?url="+$(ele).attr("href"),
                   text:$(ele).text(),
                   title:$(ele).parents(".result_item").find(".result_title").find("a").text(),
                   imgPath:"https:"+$(ele).parents(".result_item").find(".figure img").attr("src")
               });
           });
            res.render("see",{data:data});
        }else {
            console.log(error);
            res.send(error);
        }
    });

})
module.exports = router;
