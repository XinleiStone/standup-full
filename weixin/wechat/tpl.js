var ejs = require("ejs");
var heredoc = require("heredoc");

var tpl = heredoc(function() {/*
    <xml>
        <ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
        <FromUserName><![CDATA[<%= fromUserName %>]]></FromUserName>
        <CreateTime><%= createTime %></CreateTime>
        <MsgType><![CDATA[<%= msgType %>]]></MsgType>
    <% if (msgType === "text") { %>
        <Content><![CDATA[<%= content %>]]></Content>
    <% } else if (msgType === "image") { %>
        <Image>
            <MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
        </Image>
    <% } else if (msgType === "voice") { %>
        <Voice>
            <MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
        </Voice>
    <% } else if (msgType === "video") { %>
        <Video>
            <MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
            <Title><![CDATA[<%= content.title %>]]></Title>
            <Description><![CDATA[<%= content.Description %>]]></Description>
        </Video>
    <% } else if (msgType === "music") { %>
        <Music>
            <Title><![CDATA[TITLE]]></Title>
            <Description><![CDATA[<%= content.Description %>]]></Description>
            <MusicUrl><![CDATA[<%= content.musicUrl %>]]></MusicUrl>
            <HQMusicUrl><![CDATA[<%= content.hqMusicUrl %>]]></HQMusicUrl>
            <ThumbMediaId><![CDATA[<%= content.thumbMediaId %>]]></ThumbMediaId>
        </Music>
    <% } else if (msgType === "news") { %>
        <ArticleCount><%= content.length %></ArticleCount>
        <Articles>
        <% content.forEach(function(item){ %>
            <item>
                <Title><![CDATA[<%= item.title %>]]></Title> 
                <Description><![CDATA[<%= item.Description %>]]></Description>
                <PicUrl><![CDATA[<%= item.picUrl %>]]></PicUrl>
                <Url><![CDATA[<%= item.Url %>]]></Url>
            </item>
        <% }); %>
        </Articles>
    <% } %>
    </xml>
*/});

var compiled = ejs.compile(tpl);

exports = module.exports = {
    compiled: compiled
};