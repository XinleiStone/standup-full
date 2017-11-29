
/*var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});

var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

ReactDOM.render(
  <CommentBox data={data} />,
  document.getElementById('w')
);*/

var CommentBox = React.createClass({
    render: function() {
        return ( 
            <div>
                <TopDiv />
                <Wrap />
                <Register />
            </div>
            
        );
    }
});

ReactDOM.render(<CommentBox />, document.forms[0]);
//ReactDOM.render(<Animal />, document.getElementsByClassName("wrap")[0]);

