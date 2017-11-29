app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/list");
	$stateProvider
    .state('list', {
        url: "/list",
        controller:'appController',
        templateUrl: "/public/tpls/list.html"
    })
    .state('note', {
        url: "/note/:id",
        controller:'noteCtrl',
        templateUrl: "/public/tpls/note.html"
    })
    .state('modify',{
    	url:'/modify/:id',
    	controller:'modifyCtrl',
    	templateUrl:'public/tpls/modify.html'
    })
    .state('addNote',{
    	url:'/addnote',
    	controller:'addNoteCtrl',
    	templateUrl: 'public/tpls/add-note.html'
    })
 /*   .state('login',{
    	url:'/login',
    	controller:'loginCtrl'
    })*/
    .state('logout',{
    	url:'/logout',
    	controller:'logoutCtrl'
    })
    
});