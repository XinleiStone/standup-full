
var sha1 = require("sha1");
var Wechat = require("./wechat");
var getRawBody = require('raw-body');
var util = require('./util');

module.exports = function(opts, handler) {
    var wechat = new Wechat(opts);
    return function *(next) {
        var that = this;

        var token = opts.token;
        var nonce = this.query.nonce;
        var signature = this.query.signature;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        var str = [token, timestamp, nonce].sort().join('');
        var sha = sha1(str);

        // 验证合法性
        if (this.method === 'GET') {
            if (sha === signature) {
                this.body = echostr + '';
            } else {
                this.body = "wrong";
            }
        } else if (this.method === 'POST') {
            if (sha !== signature) {
                console.log("signature wrong");
                this.body = "wrong";
                return false;
            }

            var data = yield (getRawBody(this.req, {
                length: this.length,
                limit: '1mb',
                encoding: this.charset
            }));

            var content = yield util.parseXMLAsync(data);
            var message = util.formatMessage(content.xml);

            this.body = content;
            this.weixin = message;

            yield handler.call(this, next);

            wechat.reply.call(this);

            /*if ('event' === message.MsgType) {
                if (message.Event === 'subscribe') {
                    var now = new Date().getTime();
                    that.status = 200;
                    that.type = "application/xml";
                    var reply = "<xml>" +
                        "<ToUserName><![CDATA["+ message.ToUserName +"]]></ToUserName>" +
                        "<FromUserName><![CDATA["+ message.FromUserName +"]]></FromUserName>" +
                        "<CreateTime>"+ now +"</CreateTime>" +
                        "<MsgType><![CDATA[text]]></MsgType>" +
                        "<Content><![CDATA[欢迎关注~]]></Content>" +
                        "</xml>";
                    console.log(reply);
                    that.body = reply;

                    return;
                }
            }*/

            /*if (message.MsgType === "text") {
                var content1 = message.Content;
                var reply = "你说的这个" + content1 + "太复杂了！";
                if (content1 === "1") {
                    reply =
                        "<xml>" +
                        "<ToUserName><![CDATA[" + message.FromUserName + "]]></ToUserName>" +
                        "<FromUserName><![CDATA[" + message.ToUserName + "]]></FromUserName>" +
                        "<CreateTime>" + (new Date().getTime()) + "</CreateTime>" +
                        "<MsgType><![CDATA[text]]></MsgType>" +
                        "<Content><![CDATA[欢迎关注~]]></Content>" +
                        "</xml>";
                    console.log(reply)
                }

                this.body = reply;
            }*/
        }
        
    };
};