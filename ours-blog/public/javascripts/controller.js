var app = angular.module('app',['ui.router','ui.bootstrap']);
app.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});
//login
app.controller('addUserCtrl',['$scope','$http','$state',function($scope,$http,$state){
	$scope.register = function(){
		var userName = document.getElementById("userNameRe").value;
		var pwd = document.getElementById("passwordRe").value;
		$.ajax({
			url:'/addUser',
			type:'post',
			data:{
				username: userName,
				password:pwd
			},
			success: function(data){
				console.log(data);
				$("#register").hide();
				//$(".modal-backdrop.in").css("opacity","0");
				$state.go('list');
			},
			error: function(data){
				$state.go('list');
			}
		});
	};
}]);
/*app.controller('loginCtrl',['$scope','$state','$http',function($scope,$state,$http){
	$scope.login = function(){
		var userName = document.getElementById("userName").value;
		var pwd = document.getElementById("password").value;
		$.ajax({
			url:'/login',
			type:'post',
			data:{
				username:userName,
				password:pwd
			},
			success:function(data){
				console.log(data)
				if(data.checked=="1"){
					$("#login").hide();
					$(".modal-backdrop.in").css("opacity","0");
					$state.go('list');
				}else{
					alert("登录失败");
				}
				
			},
			error:function(data){
				$state.go('list');
				console.log("error");
			}
		});
		
	}
}]);*/
app.controller('appController',['$scope','$http','$state',function($scope,$http,$state){
	$scope.list=[];
	$http.get('/list')
	.success(function(data){
			$scope.list=data.map(toMills);
			//$scope.list=data;
			$('input[type="search"]').css({"position":"absolute","margin-left":"-100px","margin-top":"-100px"});
	});
	function toMills(note){
		note.time=Date.parse(new Date(note.time));
		return note;
	};
	$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
	    //下面是在table render完成后执行的js
		var table = $('#changePage').DataTable({
			"language":{
				"lengthMenu":"每页 _MENU_条记录",
				"zeroRecords":"没有找到记录",
				"info":"第 _PAGE_ 页(总共 _PAGES_ 页)",
				"infoEmpty":"无记录",
				"infoFilltered":"(从 _MAX_ 条记录过滤)"
			},
			ordering:false
		});
	});
	//login
	
	
}]);


app.controller('noteCtrl',['$scope','$http','$state','$stateParams',function($scope,$http,$state,$stateParams){
	$http.get('/note',{
		params:{
			id:$stateParams.id
		}
	}).success(function(data){
		$scope.note=data;
	});
	$scope.delete = function(){
		$http.get('delete',{
			params:{
				id:$stateParams.id
			}
		}).success(function(data){
			console.log(data);
			$state.go('list');
		});
	}
	
}]);
app.controller('modifyCtrl',['$scope','$http','$state','$stateParams',function($scope,$http,$state,$stateParams){
	$http.get('/note',{
		params:{
			id:$stateParams.id
		}
	}).success(function(data){
		$scope.note = data;
	});
	
	$scope.submit = function(){
		$.ajax({
			url:'/modify',
			type:'post',
			data:{
				id: $stateParams.id,
				title: $('#title').val(),
				content:$('#content').val()
			},
			success: function(data){
				$state.go('list');
			},
			error: function(data){
				$state.go('list');
			}
		});
	};
}]);

app.controller('addNoteCtrl',['$scope','$state',function($scope,$state){
	$scope.noteTitle='';
	$scope.noteContent='';
	$scope.addNote = function(){
		$.ajax({
			url:'/addNote',
			type:'post',
			data:{
				title: $('#title').val(),
				content:$('#content').val()
			},
			success: function(data){
				$state.go('list');
			},
			error: function(data){
				$state.go('list');
			}
		});
	};
}]);

//登出
app.controller('logoutCtrl',['$scope','$state',function($scope,$state){
	$.ajax({
		url:'secure/logout',
		type:'get',
		success:function(data){
			window.location.href="secure/login";
		}
	});
}]);
















