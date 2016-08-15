/*function displayNode(event) {
    console.log($(event.target).data())
    $.ajax({
        url: '/note',
        data: {id: id},
        success: function(dataFrom) {
            
            that.setState({data: dataFrom});
            var table = $("#changePage").DataTable({
                "language": {
                    "lengthMenu": "每页 _MENU_条记录",
                    "zeroRecords": "没有找到记录",
                    "info": "第 _PAGE_ 页(总共 _PAGES_ 页)",
                    "infoEmpty": "无记录",
                    "infoFilltered": "(从 _MAX_ 条记录过滤)"
                },
                ordering: false
            });
            //$("#register").hide();
            //$("#sucRegister").css("display", "block");
        },
        error: function(data) {
            console.log("error");
        }
    });
}*/

var NoteDisplay = React.createClass({displayName: "NoteDisplay",
    modify: function () {
        ReactDOM.render(React.createElement(ModifyNote, {note: this.props.note}), document.getElementById("layout-content"));
    },
    render: function() {
        var that = this;
        return (
            React.createElement("div", {className: "container"}, 
                React.createElement("div", {className: "panel panel-default"}, 
                    React.createElement("div", {className: "panel-heading"}, "标题"), 
                    React.createElement("div", {className: "panel-body"}, this.props.note.title)
                ), 

                React.createElement("div", {className: "panel panel-default"}, 
                    React.createElement("pre", {className: "panel-heading"}, "内容"), 
                    React.createElement("pre", {className: "panel-body noteContent"}, this.props.note.content)
                ), 
                React.createElement("button", {onClick: that.modify, className: "btn btn-default"}, "修改"), 
                React.createElement("button", {"ng-click": "delete()", className: "btn btn-default"}, "Delete")
            )
        )
    }
})

var ModifyNote = React.createClass({displayName: "ModifyNote",
    change: function() {
        
    },
    sub: function() {
        var that = this;
        $.ajax({
            url: '/editNote',
            type: "POST",
            data: {
                id: that.props.note.id,
                title: $("#title").val(),
                content: $("#content").val()
            },
            success: function(dataFrom) {
                console.log("su")
                window.location = "/";
            },
            error: function(data) {
                console.log("error");
            }
        });
    },
    render: function() {
        var that = this;
        return (
            React.createElement("div", {className: "container"}, 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {htmlFor: "title"}, "标题"), " ", React.createElement("input", {type: "text", className: "form-control", 
                        id: "title", defaultValue: this.props.note.title, name: "title", placeholder: "标题"})
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {htmlFor: "content"}, "内容"), 
                    React.createElement("textarea", {type: "password", className: "form-control", id: "content", 
                        name: "content", defaultValue: this.props.note.content, placeholder: "内容"})
                ), 
                React.createElement("button", {type: "submit", className: "btn btn-default", onClick: this.sub}, "提交修改")
            )
        )
    }
})

var TablesData = React.createClass({displayName: "TablesData",
    getInitialState: function() {
        return {data: []}
    },
    display: function(event) {

        var id = event.target.getAttribute("data");
        
        $.ajax({
            url: '/getNote',
            type: "POST",
            data: {id: id},
            success: function(dataFrom) {
                ReactDOM.render(React.createElement(NoteDisplay, {note: dataFrom}), document.getElementById("layout-content"));
                /*that.setState({data: dataFrom});
                var table = $("#changePage").DataTable({
                    "language": {
                        "lengthMenu": "每页 _MENU_条记录",
                        "zeroRecords": "没有找到记录",
                        "info": "第 _PAGE_ 页(总共 _PAGES_ 页)",
                        "infoEmpty": "无记录",
                        "infoFilltered": "(从 _MAX_ 条记录过滤)"
                    },
                    ordering: false
                });*/
                //$("#register").hide();
                //$("#sucRegister").css("display", "block");
            },
            error: function(data) {
                console.log("error");
            }
        });
    },
    componentWillMount: function() {
        var that = this;
        $.ajax({
            url: '/list',
            
            success: function(dataFrom) {
                
                that.setState({data: dataFrom});
                var table = $("#changePage").DataTable({
                    "language": {
                        "lengthMenu": "每页 _MENU_条记录",
                        "zeroRecords": "没有找到记录",
                        "info": "第 _PAGE_ 页(总共 _PAGES_ 页)",
                        "infoEmpty": "无记录",
                        "infoFilltered": "(从 _MAX_ 条记录过滤)"
                    },
                    ordering: false
                });
                //$("#register").hide();
                //$("#sucRegister").css("display", "block");
            },
            error: function(data) {
                console.log("error");
            }
        });
    },
    render: function() {
        var that = this;
        var TrList = this.state.data.map(function(list, index) {
            return (
                React.createElement("tr", {key: index}, 
                  React.createElement("td", {className: "showTitle nowrap"}, React.createElement("a", {onClick: that.display, data: list.id, style: {cursor: "pointer"}}, list.title)), 
                  React.createElement("td", {className: "showContent nowrap"}, list.content), 
                  React.createElement("td", null, list.time)
                )
            ) 
        });
    
        return (
            React.createElement("div", {className: "container"}, 
                React.createElement("table", {className: "table", id: "changePage"}, 
                  React.createElement("thead", null, 
                    React.createElement("tr", null, 
                      React.createElement("th", null, "标题"), 
                      React.createElement("th", null, "内容"), 
                      React.createElement("th", null, "时间")
                    )
                  ), 
                  React.createElement("tbody", null, 
                    TrList
                  )
                )
            )
        );
        
    }
})

ReactDOM.render(React.createElement(TablesData, null), document.getElementById("layout-content"));