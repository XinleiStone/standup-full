
var Koa = require("koa");
var sha1 = require("sha1");
var wechat = require("./wechat/g");
var path = require("path");
var util = require("./libs/util");
var wechat_file = path.join(__dirname, './config/wechat.txt');

var config = {
    wechat: {
        appID: "111",
        appSecret: "111",
        token: "111",
        getAccessToken: function() {
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken: function(data) {
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file, data);
        }
    }
};

var app = new Koa();

app.use(wechat(config.wechat));

app.listen(1234);
console.log("app started listening 1234...");