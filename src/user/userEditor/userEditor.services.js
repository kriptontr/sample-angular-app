/**
 * Created by kript on 28/10/2016.
 */
(function () {
    angular.module('app.user.userEditor').factory('UserEdit',['UserList','$q',userEdit])
    function userEdit(UserList,$q) {

        return {
            getbyId: function (id) {
                var deferred = $q.defer();
                UserList.query({id:id},function (data) {

                    deferred.resolve( data.results);
                },function (err) {
                    deferred.reject(err);
                })
                return deferred.promise;
            },

            save : function (user) {
                var deferred = $q.defer();
                var res = new UserList(user);
                if( isNaN(user.id)){
                    res.$save(function (data) {
                            deferred.resolve(data.results)
                        },
                        function (err) {
                            deferred.reject(err)
                        }
                    )
                }
                else  {
                    res.$patch(function (data) {
                            deferred.resolve(data.results)
                        },
                        function (err) {
                            deferred.reject(err)
                        }
                    )
                }

                return deferred.promise;
        }

        }



    }

})();