var TopDiv = React.createClass({displayName: "TopDiv",
  render: function() {
    return (React.createElement("div", {className: "top_div"}))
  }
})

var Animal = React.createClass({displayName: "Animal",
  render: function() {
    return (
    React.createElement("div", {className: "animal-div"}, 
      React.createElement("div", {className: "tou"}), 
      React.createElement("div", {className: "initial_left_hand", id: "left_hand"}), 
      React.createElement("div", {className: "initial_right_hand", id: "right_hand"})
    ))
  }
})

var Username = React.createClass({displayName: "Username",
  render: function() {
    return (
    React.createElement("p", {className: "username-field", id: "username-field"}, 
      React.createElement("span", {className: "u_logo"}), 
      React.createElement("input", {className: "ipt", type: "text", placeholder: "用户名 / 邮箱", name: "username", id: "username"})
    ))
  }
})

var Password = React.createClass({displayName: "Password",
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
    React.createElement("p", {className: "position-relative", id: "password-field"}, 
      React.createElement("span", {className: "p_logo"}), 
      React.createElement("input", {className: "ipt", id: "password", type: "password", placeholder: "请输入密码", name: "password"})
    ))
  }
})

var ErrWarn = React.createClass({displayName: "ErrWarn",
  render: function() {
    return (
      React.createElement("p", {className: "errorWarn"}, "用户名或密码错误，请重新输入")
    )
  }
})

var Forget = React.createClass({displayName: "Forget",
  render: function() {
    return (
      React.createElement("div", {className: "forget"}, 
        React.createElement("div", {style: {margin: "0px 5px 5px 5px"}}, 
          React.createElement("span", {style: {float: "left", marginLeft: "25px"}}, 
            React.createElement("input", {type: "checkbox"}), 
            React.createElement("a", {style: {color: "rgb(204, 204, 204)"}, href: "#"}, "记住密码")
          ), 
          React.createElement("span", {style: {float: "right", marginRight: "25px"}}, 
           React.createElement("button", {type: "button", className: "btn registerButton", "data-toggle": "modal", "data-target": "#register"}, "注册")
          ), 
          React.createElement("p", {style: {width: "100%"}, id: "signin-field"}, 
            React.createElement("input", {type: "submit", id: "signin", value: "登录", className: "btn btn-default logincolor"})
          )
        )
      )
    )
  }
})

var Wrap = React.createClass({displayName: "Wrap",
  render: function() {
    return(
      React.createElement("div", {className: "wrap", onkeydown: "keyLogin()"}, 
        React.createElement(Animal, null), 
        React.createElement(Username, null), 
        React.createElement(Password, null), 
        React.createElement(ErrWarn, null), 
        React.createElement(Forget, null)
      )
    )
  }
})

var Register = React.createClass({displayName: "Register",
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
      React.createElement("div", {id: "register", className: "modal fade", tabIndex: "-1"}, 
        React.createElement("div", {className: "modal-dialog"}, 
          React.createElement("div", {className: "modal-content"}, 
            React.createElement("div", {className: "modal-header"}, 
              React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
              React.createElement("h3", {id: "myModalLabel", className: "userLogin"}, "用户注册")
            ), 
            React.createElement("div", {className: "modal-body"}, 
                React.createElement("ul", null, 
              React.createElement("li", {id: "user"}, "邮箱：", React.createElement("input", {type: "email", onBlur: this.isRegist, className: "input-in", id: "userNameRe"}), " ", React.createElement("div", {className: "valid-icon icon-ok", id: "valid-icon-email"})), 
              React.createElement("li", {id: "pwd"}, "密码：", React.createElement("input", {type: "password", className: "input-in", id: "passwordRe"}), " ", React.createElement("div", {className: "valid-icon icon-ok", id: "valid-icon-pass"})), 
              React.createElement("li", {id: "pwdSure"}, "确认密码：", React.createElement("input", {type: "password", className: "input-in", id: "passwordSure"}), " ", React.createElement("div", {className: "valid-icon icon-ok", id: "valid-icon-passSure"})), 
              React.createElement("li", {id: "warn"}, "两次密码输入不一致，请重新输入"), 
              React.createElement("li", {id: "sucRegister"}, "注册成功")
            )
            ), 
            React.createElement("div", {className: "modal-footer"}, 
              React.createElement("input", {type: "button", className: "btn btn-primary login", onClick: this.regist, disabled: true, id: "registerButton", value: "注册"}), 
              React.createElement("button", {className: "btn login", "data-dismiss": "modal", "aria-hidden": "true"}, "取消")
            )
          )
        )
    )
    )
  }
})




