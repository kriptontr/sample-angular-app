/**
 * Created by kript on 15/10/2016.
 */
(function () {
   angular.module('app.user.userList').controller('UserListController',['GetUsers','GetProps','DelUser', usertListController]);
    function usertListController(GetUsers,GetProps,DelUser) {

       var vm = this;
        vm.limit = 10;
        vm.limitSelect = "10";
        vm.offset =0;
        vm.ordering ="id";
        vm.search = "";
        vm.asc = true;
        // /ascendin or not (desc)
        function getUsers(page) {
            if(!page)
                page = {};
            GetUsers(page.limit || vm.limit, page.offset || vm.offset,page.ordering || vm.ordering,page.search || vm.search,vm.asc).then(function (userData) {
                vm.users = userData.data;
                vm.pages = userData.pages;
                vm.fields = GetProps(userData.data[0]);
            })
        }

        getUsers();
        
        vm.changeSort = function (sortObj) {
            if(vm.ordering == sortObj)
            { vm.asc = (!vm.asc)}
            else
            {   vm.ordering = sortObj;}

            getUsers({offset:0})
        };
        vm.setSearch = function () {
           vm.search =  vm.searchTxt;
            getUsers({offset:0})
        };
      vm.setPage = function (pagn) {
          getUsers({offset:pagn.offset})
      };
        vm.setLimit = function () {
          vm.limit =   parseInt(   vm.limitSelect);
            getUsers({offset:0})
        };
        vm.deleteUser = function (userid) {
            DelUser(userid).then(function () {
                getUsers()
            })
        }
    }
})();