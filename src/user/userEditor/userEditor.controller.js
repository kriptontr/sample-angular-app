/**
 * Created by kript on 27/10/2016.
 */
(function () {
angular.module('app.user.userEditor').controller('UserEditorController',['UserEdit','$stateParams','$state',userEditController])
    function userEditController(UserEdit, $stateParams,$state) {
     var vm = this;
        if( !isNaN( $stateParams.id)){
            UserEdit.getbyId($stateParams.id)
                .then(function SetValues(userResponse) {
                vm.user = userResponse;
            });
        }
        vm.save = function () {
            alert(JSON.stringify(vm.user))
        }


        vm.save = function (user) {
            UserEdit.save(user).then(
                function (data) {
                    $state.go("main.user.userList")
                },
                function (err) {
                    console.log(err);
                }


            )
        }
    }
})();