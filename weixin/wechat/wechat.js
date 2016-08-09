
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var prefix = "https://api.weixin.qq.com/cgi-bin/";
var api = {
    accessToken: prefix + "token?grant_type=client_credential"
};

function Wechat(opts) {
    var that = this;

    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;

    this.isValidAccessToken = function(data) {
        if (!data || !data.access_token || !data.expires_in)
            return false;
        var nowTime = (new Date()).getTime();
        if (nowTime < data.expires_in) {
            return true;
        } else {
            return false;
        }
    };

    this.updateAccessToken = function() {
        var appID = this.appID;
        var appSecret = this.appSecret;
        var url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret;

        return new Promise(function(resolve, reject) {
            request({
                url: url,
                json: true
            }).then(function(response) {
                var data = response.body;
                var now = (new Date()).getTime();
                var expires_in = now + (data.expires_in - 20) * 1000;
                data.expires_in = expires_in;

                resolve(data);
            });

        });
    };

    this.getAccessToken()
        .then(function(data) {
            try {
                data = JSON.parse(data);
            } catch (e) {
                return that.updateAccessToken();
            }

            if (that.isValidAccessToken(data)) {
                return Promise.resolve(data);
            } else {
                return that.updateAccessToken();
            }
        })
        .then(function(data) {
            that.access_token = data.access_token;
            that.expires_in = data.expires_in;

            that.saveAccessToken(data);
        });
}

module.exports = Wechat;

/*Wechat.prototype.isValidAccessToken = function(data) {
    if (!data || !data.access_token || !data.expires_in)
        return false;
    var nowTime = (new Data()).getTime();
    if (nowTime < data.expires_in) {
        return true;
    } else {
        return false;
    }
};

Wechat.prototype.updateAccessToken = function() {
    var appID = this.appID;
    var appSecret = this.appSecret;
    var url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret;

    return new Promise(function(resolve, reject) {
        request({
            url: url,
            json: true
        }).then(function(res) {
            var data = res[1];
            var now = (new Date()).getTime();
            var expires_in = now + (data.expires_in - 20) * 1000;
            data.expires_in = expires_in;
        });

        resolve(data);
    });
};*/