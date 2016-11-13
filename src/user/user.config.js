/**
 * Created by kript on 27/10/2016.
 */
(function () {
    angular.module('app.user').config(userConfig);
    function  userConfig($stateProvider) {
        var  userState ={
            name:"main.user",
            url:"/user",
            template:"<div ui-view> </div>",

        }
        $stateProvider.state(userState);

    }
})();