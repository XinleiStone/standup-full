var config = require("./config");
var Wechat = require("./wechat/wechat");

var wechatApi = new Wechat(config.wechat);

exports.reply = function* (next) {
    var message = this.weixin;

    if (message.MsgType === "event") {
        if (message.Event === "subscribe") {
            if (message.EventKey) {
                console.log("扫描二维码：" + message.EventKey + " " + message.ticket);
            }
            console.log("关注");
            this.body = "哈哈，你订阅了这个号\r\n" + " 消息ID：" + message.MsgId;
        } else if (message.Event === "unsubscribe") {
            console.log("无情取关…");
            this.body = "";
        }
    } else if (message.MsgType === "text") {
        var content = message.Content;
        var reply = "你说的这个" + content + "太复杂了！";
        if (content === "1") {
            reply = "天下第一吃大米~";
        } else if (content === "2") {
            reply = [{
                title: "我只是个标题",
                description: "技术改变世界~",
                picUrl: "http://liuxinlei.com/works/images/kmeans.jpg",
                Url: "https://github.com/XinleiStone"
            }/*,
            {
                title: "第二个个标题",
                description: "爽歪歪的happy~",
                picUrl: "http://liuxinlei.com/works/images/touxiang.jpg",
                Url: "http://liuxinlei.com"
            }*/];
        } else if (content === "3") {
            var data = yield wechatApi.uploadMaterial('image', __dirname + "/images/2.jpg");
            console.log(data)
            reply = {
                type: "image",
                mediaId: data.media_id
            };
            
        } else if (content === "music") {
            var data = yield wechatApi.uploadMaterial('music', __dirname + "/images/2.jpg");
            console.log(data)
            reply = {
                type: "music",
                title: "音乐",
                description: "desc",
                musicUrl: "http://mp3.haoduoge.com/s/2016-08-11/1470914098.mp3",
                thumbMediaId: data.media_id
            };
        }

        this.body = reply;
    }

    yield next;
};