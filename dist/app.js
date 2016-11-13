!function(){angular.module("app.core",["ngCookies","ngResource"])}(),function(){function userListService($resource,apiBase){var ret=$resource(apiBase+"/users/:id?_limit=:limit&_start=:offset&_sort=:ordering&q=:search&_order=:asc",{limit:"@limit",offset:"@offset",ordering:"@ordering",search:"@search",asc:"@asc",id:"@id"},{query:{method:"GET",isArray:!1,transformResponse:function(data,headers){return response={},angular.isArray(data)||(response.results=JSON.parse(data)),response.count=parseInt(headers()["x-total-count"]),response}},patch:{method:"PATCH"}});return ret}function getToken($cookies){var token=$cookies.get("Authorization");return token||($cookies.put("Authorization","someTokenStrComeHere"),token=$cookies.get("Authorization")),token}function getProps(){return function(object){var ret=[];for(property in object)ret.push({propName:property,pretty:property.replace(/_/g," ").capitalizeFirstLetter()});return ret}}function tokenInjector(GetToken){var injector={request:function(config){return config.headers.Authorization=GetToken,config}};return injector}function paginator(){var ret=function(limit,offset,ordering,search,total){for(var pages=[],count=0;count<total;count+=limit)pages.push({limit:limit,offset:count,ordering:ordering,search:search,isActive:offset==count});return pages};return ret}angular.module("app.core").factory("UserList",userListService),angular.module("app.core").factory("GetToken",getToken),angular.module("app.core").factory("GetProps",getProps),angular.module("app.core").factory("TokenInjector",["GetToken",tokenInjector]),angular.module("app.core").factory("Paginator",[paginator])}(),function(){String.prototype.capitalizeFirstLetter=function(){return this.charAt(0).toUpperCase()+this.slice(1)}}(),function(){angular.module("app.user.userEditor",["app.core","ui.router"])}(),function(){function userEditorConfig($stateProvider){var userEditorState={name:"main.user.userEditor",url:"/edit/:id",templateUrl:"./user/userEditor/userEditor.html",controller:"UserEditorController",controllerAs:"vm"};$stateProvider.state(userEditorState)}angular.module("app.user.userEditor").config(userEditorConfig)}(),function(){function userEditController(UserEdit,$stateParams,$state){var vm=this;isNaN($stateParams.id)||UserEdit.getbyId($stateParams.id).then(function(userResponse){vm.user=userResponse}),vm.save=function(){alert(JSON.stringify(vm.user))},vm.save=function(user){UserEdit.save(user).then(function(data){$state.go("main.user.userList")},function(err){console.log(err)})}}angular.module("app.user.userEditor").controller("UserEditorController",["UserEdit","$stateParams","$state",userEditController])}(),function(){function userEdit(UserList,$q){return{getbyId:function(id){var deferred=$q.defer();return UserList.query({id:id},function(data){deferred.resolve(data.results)},function(err){deferred.reject(err)}),deferred.promise},save:function(user){var deferred=$q.defer(),res=new UserList(user);return isNaN(user.id)?res.$save(function(data){deferred.resolve(data.results)},function(err){deferred.reject(err)}):res.$patch(function(data){deferred.resolve(data.results)},function(err){deferred.reject(err)}),deferred.promise}}}angular.module("app.user.userEditor").factory("UserEdit",["UserList","$q",userEdit])}(),function(){angular.module("app.user.userList",["app.core","ui.router"])}(),function(){function userListConfig($stateProvider){var userlistState={name:"main.user.userList",url:"/list",templateUrl:"./user/userlist/userList.html",controller:"UserListController",controllerAs:"vm"};$stateProvider.state(userlistState)}angular.module("app.user.userList").config(userListConfig)}(),function(){function usertListController(GetUsers,GetProps,DelUser){function getUsers(page){page||(page={}),GetUsers(page.limit||vm.limit,page.offset||vm.offset,page.ordering||vm.ordering,page.search||vm.search,vm.asc).then(function(userData){vm.users=userData.data,vm.pages=userData.pages,vm.fields=GetProps(userData.data[0])})}var vm=this;vm.limit=10,vm.limitSelect="10",vm.offset=0,vm.ordering="id",vm.search="",vm.asc=!0,getUsers(),vm.changeSort=function(sortObj){vm.ordering==sortObj?vm.asc=!vm.asc:vm.ordering=sortObj,getUsers({offset:0})},vm.setSearch=function(){vm.search=vm.searchTxt,getUsers({offset:0})},vm.setPage=function(pagn){getUsers({offset:pagn.offset})},vm.setLimit=function(){vm.limit=parseInt(vm.limitSelect),getUsers({offset:0})},vm.deleteUser=function(userid){DelUser(userid).then(function(){getUsers()})}}angular.module("app.user.userList").controller("UserListController",["GetUsers","GetProps","DelUser",usertListController])}(),function(){function getUsers(UserList,$q,Paginator){function ret(limit,offset,ordering,search,isAsc){var deferred=$q.defer(),ascText=isAsc===!1?"DESC":"ASC";return UserList.query({limit:limit,offset:offset,ordering:ordering,search:search,asc:ascText},function(data){var pages=Paginator(limit,offset,ordering,search,data.count);deferred.resolve({data:data.results,pages:pages})},function(err){deferred.reject(err)}),deferred.promise}return ret}function delUser(UserList,$q){function ret(id){var deferred=$q.defer();return UserList.remove({id:id},function(data){deferred.resolve(data)},function(err){deferred.reject(err)}),deferred.promise}return ret}angular.module("app.user.userList").factory("GetUsers",["UserList","$q","Paginator",getUsers]),angular.module("app.user.userList").factory("DelUser",["UserList","$q",delUser])}(),function(){angular.module("app.user",["app.core","ui.router","app.user.userList","app.user.userEditor"])}(),function(){function userConfig($stateProvider){var userState={name:"main.user",url:"/user",template:"<div ui-view> </div>"};$stateProvider.state(userState)}angular.module("app.user").config(userConfig)}(),function(){angular.module("app",["app.core","ui.router","app.user"])}(),angular.element(document).ready(function(){angular.bootstrap(document,["app"])}),function(){function appConfig($stateProvider,$urlRouterProvider,$httpProvider,TokenInjector){var mainState={name:"main",url:"/app",template:"<div ui-view>   </div>"};$stateProvider.state(mainState),$urlRouterProvider.otherwise("/app"),$httpProvider.interceptors.push("TokenInjector")}angular.module("app").config(["$stateProvider","$urlRouterProvider","$httpProvider",appConfig])}(),angular.module("app").constant("apiBase","http://localhost:25000");