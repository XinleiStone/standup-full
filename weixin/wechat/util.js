var xml2js = require("xml2js");
var Promise = require("bluebird");
var tpl = require("./tpl");

exports.parseXMLAsync = function(xml) {
    return new Promise(function(resolve, reject) {
        xml2js.parseString(xml, {trim: true}, function(err, content) {
            if (err) {
                reject(err);
            } else {
                resolve(content);
            }
        });
    });
    
};

exports.formatXMLAsync = function(xml) {
    return new Promise(function(resolve, reject) {
        xml2js.parseString(xml, {trim: true}, function(err, content) {
            if (err) {
                reject(err);
            } else {
                resolve(content);
            }
        });
    });
};

function formatMessage(result) {
    var message = {};

    if ("object" === typeof result) {
        var keys = Object.keys(result);

        for (var i = 0; i < keys.length; i++) {
            var item = result[keys[i]];
            var key = keys[i];
            if (!(item instanceof Array) || 0 === item.length) {
                continue;
            }

            if (1 === item.length) {
                var val = item[0];

                if ("object" === typeof val) {
                    message[key] = formatMessage(val);
                } else {
                    message[key] = (val || '').trim();
                }
            } else {
                message[key] = [];
                for (var j = 0, k = item.length; j < k; j++) {
                    message[key].push(formatMessage(item[j]));
                }
            }
        }
    }

    return message;
}

exports.formatMessage = formatMessage;

exports.tpl = function(content, message) {
    var info = {};
    var type = "text";
    var fromUserName = message.ToUserName;
    var toUserName = message.FromUserName;

    if (Array.isArray(content)) {
        type = "news";
    }

    type = content.type || type;
    info.content = content;
    info.createTime = new Date().getTime();
    info.toUserName = toUserName;
    info.fromUserName = fromUserName;
    info.msgType = type;

    return tpl.compiled(info);
};