
var Koa = require("koa");
//var sha1 = require("sha1");
var path = require("path");
var wechat = require("./wechat/g");
var util = require("./libs/util");
var config = require("./config");
var weixin = require("./weixin");
var wechat_file = path.join(__dirname, './config/wechat.txt');

var app = new Koa();
app.use(wechat(config.wechat, weixin.reply));

app.listen(1234);
console.log("app started listening 1234...");