angular.module('app.pager',[])
    .directive('pager',function(){
        return {
            restrict: 'EA',
            scope:{
                pager:'='
            },
            template:'<ul class="pagination" ng-show="pager.pages.length>0"><li><a ng-click="pager.prevPage()">&laquo;</a></li><li ng-repeat="page in pager.pages" ng-class="{\'active\':pager.page==page}" ><a ng-click="pager.goPage(page)">{{page}}</a></li><li><a ng-click="pager.nextPage()">&raquo;</a></li></ul>'
        }
    })