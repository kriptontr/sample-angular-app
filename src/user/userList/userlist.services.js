/**
 * Created by kript on 15/10/2016.
 */
(function () {
   angular.module('app.user.userList').factory('GetUsers',['UserList','$q','Paginator',getUsers])
    function getUsers(UserList,$q, Paginator) {
        function ret(limit,offset,ordering,search,isAsc) {
            var deferred = $q.defer();
            var ascText = (isAsc === false? 'DESC' : 'ASC');
            UserList.query({limit:limit,offset:offset,ordering:ordering,search:search,asc:ascText},function (data) {
               var pages = Paginator(limit,offset,ordering,search,data.count);
                deferred.resolve( {data:data.results,pages:pages});
            },function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        return ret;
    }

    angular.module('app.user.userList').factory('DelUser',['UserList','$q',delUser])
    function delUser(UserList,$q) {
        function ret(id) {
            var deferred = $q.defer();
            UserList.remove({id:id},function (data) {

                deferred.resolve( data);
            },function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        return ret;
    }


})();