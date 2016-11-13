/**
 * Created by kript on 14/10/2016.
 */
(function () {

    angular.module('app.user.userList').config(userListConfig);
    function  userListConfig($stateProvider) {
        var  userlistState={
            name:"main.user.userList",
            url:"/list",
            templateUrl:"./user/userlist/userList.html",
            controller:"UserListController",
            controllerAs:"vm"
        }
        $stateProvider.state(userlistState);

    }
})();
