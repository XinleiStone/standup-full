var path = require("path");
var util = require("./libs/util");
var wechat_file = path.join(__dirname, './config/wechat.txt');

var config = {
    wechat: {
        appID: "wx9e9b463320c7e367",
        appSecret: "b18ea6e7c9c441c281a4d4ca2c5c32a4",
        token: "liuxinleiwechatvisxian",
        getAccessToken: function() {
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken: function(data) {
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file, data);
        }
    }
};

module.exports = config;