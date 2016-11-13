/**
 * Created by kript on 15/10/2016.
 */
(function () {

    angular.module('app').config(['$stateProvider', '$urlRouterProvider','$httpProvider',appConfig]);


    function appConfig($stateProvider,$urlRouterProvider,$httpProvider,TokenInjector) {
        var  mainState={
            name:"main",
            url:"/app",
            template:"<div ui-view>   </div>"

        };
        $stateProvider.state(mainState);
        $urlRouterProvider.otherwise("/app");

        $httpProvider.interceptors.push('TokenInjector');
    }
})();  angular.module('app').constant('apiBase','http://localhost:25000')