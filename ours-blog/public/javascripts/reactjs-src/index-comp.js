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

var NoteDisplay = React.createClass({
    modify: function () {
        ReactDOM.render(<ModifyNote note={this.props.note} />, document.getElementById("layout-content"));
    },
    render: function() {
        var that = this;
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">标题</div>
                    <div className="panel-body">{this.props.note.title}</div>
                </div>

                <div className="panel panel-default">
                    <pre className="panel-heading">内容</pre>
                    <pre className="panel-body noteContent">{this.props.note.content}</pre>
                </div>
                <button onClick={that.modify} className="btn btn-default">修改</button>
                <button ng-click="delete()" className="btn btn-default">Delete</button>
            </div>
        )
    }
})

var ModifyNote = React.createClass({
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
            <div className="container">
                <div className="form-group">
                    <label htmlFor="title">标题</label> <input type="text" className="form-control"
                        id="title" defaultValue={this.props.note.title} name="title" placeholder="标题" />
                </div>
                <div className="form-group">
                    <label htmlFor="content">内容</label>
                    <textarea type="password" className="form-control" id="content"
                        name="content" defaultValue={this.props.note.content} placeholder="内容"></textarea>
                </div>
                <button type="submit" className="btn btn-default" onClick={this.sub}>提交修改</button>
            </div>
        )
    }
})

var TablesData = React.createClass({
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
                ReactDOM.render(<NoteDisplay note={dataFrom} />, document.getElementById("layout-content"));
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
                <tr key={index}>
                  <td className="showTitle nowrap"><a onClick={that.display} data={list.id} style={{cursor: "pointer"}}>{list.title}</a></td>
                  <td className="showContent nowrap">{list.content}</td>
                  <td>{list.time}</td>
                </tr>
            ) 
        });
    
        return (
            <div className="container">
                <table className="table" id="changePage">
                  <thead>
                    <tr>
                      <th>标题</th>
                      <th>内容</th>
                      <th>时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TrList}
                  </tbody>
                </table>
            </div>
        );
        
    }
})

ReactDOM.render(<TablesData />, document.getElementById("layout-content"));