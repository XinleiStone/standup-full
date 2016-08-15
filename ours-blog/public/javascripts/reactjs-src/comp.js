var TopDiv = React.createClass({
  render: function() {
    return (<div className="top_div"></div>)
  }
})

var Animal = React.createClass({
  render: function() {
    return (
    <div className="animal-div">
      <div className="tou"></div>
      <div className="initial_left_hand" id="left_hand"></div>
      <div className="initial_right_hand" id="right_hand"></div>
    </div>)
  }
})

var Username = React.createClass({
  render: function() {
    return (
    <p className="username-field" id="username-field">
      <span className="u_logo"></span>
      <input className="ipt" type="text" placeholder="用户名 / 邮箱" name="username" id="username" />
    </p>)
  }
})

var Password = React.createClass({
  componentDidMount: function() {
    $("#password").focus(function() {
      $("#left_hand").animate({
        left: "150",
        top: " -38"
      }, {
        step: function() {
          if (parseInt($("#left_hand").css("left")) > 140) {
            $("#left_hand").attr("class", "left_hand");
          }
        }
      }, 2000);
      $("#right_hand").animate({
        right: "-64",
        top: "-38px"
      }, {
        step: function() {
          if (parseInt($("#right_hand").css("right")) > -70) {
            $("#right_hand").attr("class", "right_hand");
          }
        }
      }, 2000);
    })

    $("#password").blur(function(){
      $("#left_hand").attr("class","initial_left_hand");
      $("#left_hand").attr("style","left:100px;top:-12px;");
      $("#right_hand").attr("class","initial_right_hand");
      $("#right_hand").attr("style","right:-112px;top:-12px");
    });
  },
  render: function() {
    return (
    <p className="position-relative" id="password-field">
      <span className="p_logo"></span>
      <input className="ipt" id="password" type="password" placeholder="请输入密码" name="password" />
    </p>)
  }
})

var ErrWarn = React.createClass({
  render: function() {
    return (
      <p className="errorWarn">用户名或密码错误，请重新输入</p>
    )
  }
})

var Forget = React.createClass({
  render: function() {
    return (
      <div className="forget">
        <div style={{margin: "0px 5px 5px 5px"}}>
          <span style={{float: "left", marginLeft: "25px"}}>
            <input type="checkbox" />
            <a style={{color: "rgb(204, 204, 204)"}} href="#">记住密码</a>
          </span> 
          <span style={{float: "right", marginRight: "25px"}}>
           <button type="button" className="btn registerButton" data-toggle="modal" data-target="#register">注册</button>
          </span>
          <p style={{width: "100%"}} id="signin-field">
            <input type="submit" id="signin" value="登录" className="btn btn-default logincolor" />
          </p>       
        </div>
      </div>
    )
  }
})

var Wrap = React.createClass({
  render: function() {
    return(
      <div className="wrap" onkeydown="keyLogin()">
        <Animal />
        <Username />
        <Password />
        <ErrWarn />
        <Forget />
      </div>
    )
  }
})

var Register = React.createClass({
  isRegist: function() {
    var email = document.getElementById("userNameRe").value;
    function isEmail(str) {
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      return reg.test(str);
    }
    if (isEmail(email)) {
      $.ajax({
          url: '/Register/isRegister',
          type: 'post',
          data: {
            email: email
          },
          success: function(data) {

            if (data == "1") {
              $("#valid-icon-email").removeClass().addClass('icon-ok');
            }
            //$("#register").hide();
            //$("#sucRegister").css("display", "block");
            //window.location.href = "/secure/login";
          },
          error: function(data) {
            console.log("error");
          }
        });
    } else {
      $("#valid-icon-email").removeClass().addClass('icon-remove');
    }
    
  },
  regist: function() {
      var email = document.getElementById("userNameRe").value;
      var pwd = document.getElementById("passwordRe").value;
      var pwdSure = document.getElementById("passwordSure").value;

      if (pwdSure == pwd && email.length != 0 && pwd.length != 0) {
        $.ajax({
          url: '/addUser',
          type: 'post',
          data: {
            email: email,
            password: pwd
          },
          success: function(data) {
            if (data == "1") {
              $("#register").hide();
              window.location.href = "/secure/login";
            } else {
              alert("注册失败，请稍后再试");
            }
            //$("#register").hide();
            //$("#sucRegister").css("display", "block");
          },
          error: function(data) {
            console.log("error");
          }
        });
      }
  },
  componentDidMount: function() {
      var pwd = document.getElementById("passwordRe");
      var pwdSure = document.getElementById("passwordSure");
      //确认密码
      pwdSure.onblur = function() {
        if (this.value != pwd.value || (this.value == "" && pwd.value == "")) {
          $("#warn").css("display", "block");
          $("#registerButton").attr("disabled", "disabled");
          $("#valid-icon-passSure").removeClass('valid-icon').removeClass('icon-ok').addClass('icon-remove');
        } else {
          $("#valid-icon-passSure").removeClass('valid-icon');
          $("#warn").css("display", "none");
          $("#registerButton").removeAttr("disabled");
        }
      }

      $("#passwordRe").blur(function() {
        if ($(this).val() != "") {
          $("#valid-icon-pass").removeClass().addClass('icon-ok');
        } else {
          $("#valid-icon-pass").removeClass('valid-icon').removeClass('icon-ok').addClass('icon-remove');
        }
        
      })
  },
  render: function() {
    return (
      <div id="register" className="modal fade" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
              <h3 id="myModalLabel" className="userLogin">用户注册</h3>
            </div>
            <div className="modal-body">
                <ul>
              <li id="user">邮箱：<input type="email" onBlur={this.isRegist} className="input-in" id="userNameRe" />&nbsp;<div className="valid-icon icon-ok" id="valid-icon-email"></div></li>
              <li id="pwd">密码：<input type="password" className="input-in" id="passwordRe" />&nbsp;<div className="valid-icon icon-ok" id="valid-icon-pass"></div></li>
              <li id="pwdSure">确认密码：<input type="password" className="input-in" id="passwordSure" />&nbsp;<div className="valid-icon icon-ok" id="valid-icon-passSure"></div></li> 
              <li id="warn">两次密码输入不一致，请重新输入</li>
              <li id="sucRegister">注册成功</li>
            </ul>
            </div>
            <div className="modal-footer">
              <input type="button" className="btn btn-primary login" onClick={this.regist}  disabled id="registerButton" value="注册" />
              <button className="btn login" data-dismiss="modal" aria-hidden="true">取消</button>
            </div>
          </div>
        </div>
    </div>
    )
  }
})




