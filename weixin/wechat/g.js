
var sha1 = require("sha1");
var Wechat = require("./wechat");
var getRawBody = require('raw-body');
var util = require('./util');

module.exports = function(opts) {
    //var wechat = Wechat(opts);
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
                this.body = "wrong";
                return false;
            }

            var data = yield getRawBody(this.req, {
                length: this.length,
                limit: '1mb',
                encoding: this.charset
            });

            var content = yield util.parseXMLAsync(data);

            console.log(content)

            var message = yield util.formatMessage(content.xml);


            if ('event' === message.MsgType) {
                if (message.Event === 'subscribe') {
                    var now = new Date().getTime();
                    console.log(now + 'dddd')
                    that.status = 200;
                    that.type = 'application/xml';
                    var reply = "<xml>"
                        + "<ToUserName><![CDATA[" + message.ToUserName + "]]></ToUserName>"
                        + "<FromUserName><![CDATA[" + message.FromUserName + "]]></FromUserName>"
                        + "<CreateTime>"+ now +"</CreateTime>"
                        + "<MsgType><![CDATA[text]]></MsgType>"
                        + "<Content><![CDATA[this is a test]]></Content>"
                        + "<MsgId>1234567890123456</MsgId>"
                        + "</xml>";

                    //console.log(reply);
                    that.body = reply;

                    return;
                }
            }
        }
        
    };
};