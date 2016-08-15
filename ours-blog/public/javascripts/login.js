$(function(){
	/*//初始化
	function init(){
		var username = getCookieValue("usernameCookie");
		$("#userName").val(username);
		var password = getCookieValue("pwdCookie");
		$("#password").val(password);
	}
	init();
	function getCookieValue(name){
		var name = escape(name);
		// 读cookie属性，这将返回文档的所有cookie
		var allcookies = document.cookies;
		console.log(allcookies);
		// 查找名为name的cookie的开始位置
		name+="=";
		var pos = allcookies.indexOf(name);
		if(pos!=-1){//如果pos值为-1则说明搜索"version="失败
			var start = pos+name.length;
			var end = allcookies.indexOf(";",start);// 从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
			if (end == -1)
		        end = allcookies.length; // 如果end值为-1说明cookie列表里只有一个cookie
		        var value = allcookies.substring(start, end); //提取cookie的值
		        return unescape(value); // 对它解码
		    } else{
		    	return ""; // 搜索失败，返回空字符串
		    }
		        
		}*/
	//得到焦点
	$("#password").focus(function(){
		$("#left_hand").animate({
			left: "150",
			top: " -38"
		},{step: function(){
			if(parseInt($("#left_hand").css("left"))>140){
				$("#left_hand").attr("class","left_hand");
			}
		}}, 2000);
		$("#right_hand").animate({
			right: "-64",
			top: "-38px"
		},{step: function(){
			if(parseInt($("#right_hand").css("right"))> -70){
				$("#right_hand").attr("class","right_hand");
			}
		}}, 2000);
	});
	//失去焦点
	$("#password").blur(function(){
		$("#left_hand").attr("class","initial_left_hand");
		$("#left_hand").attr("style","left:100px;top:-12px;");
		$("#right_hand").attr("class","initial_right_hand");
		$("#right_hand").attr("style","right:-112px;top:-12px");
	});
	var pwd = document.getElementById("passwordRe");
	var pwdSure = document.getElementById("passwordSure");
	//确认密码
	pwdSure.onblur = function(){
		if(this.value!=pwd.value){
			$("#warn").css("display","block");
			$("#registerButton").attr("disabled","disabled");
		}else{
			$("#warn").css("display","none");
			$("#registerButton").removeAttr("disabled");
	}
 }
	//注册
	register = function(){
			var userName  = document.getElementById("userNameRe").value;
			var pwd  = document.getElementById("passwordRe").value;
			var pwdSure = document.getElementById("passwordSure").value;
		if(pwdSure==pwd && userName.length!=0 && pwd.length!=0){
			$.ajax({
				url:'/addUser',
				type:'post',
				data:{
					username:userName,
					password:pwd
				},
				success:function(data){
					//$("#register").hide();
					$("#sucRegister").css("display","block");
					window.location.href="/secure/login";
				},
				error:function(data){
					console.log("error");
				}
			});
		}
		
}/*
	//登录
	login = function(){
		var userName = document.getElementById("userName").value;
		var pwd = document.getElementById("password").value;
		$.ajax({
			url:'/checkLogin',
			type:'post',
			data:{
				username:userName,
				password:pwd
			},
			success:function(data){
				if(data.checked=="1"){
					$(".errorWarn").css("display","none");
					window.location.href="/#/list";

				}else{
					$(".errorWarn").css("display","block");
					//alert("登录失败");
				}
				
			},
			error:function(data){
				console.log("error");
			}
		});

	}
	*/
	//回车响应事件
	 keyLogin = function(){
		if(event.keyCode==13){//回车键的键值为13
			$("#login").click();
		} 
	}	
		
		
		
		
		
	
});