/**
 * Created by kript on 27/10/2016.
 */
(function () {
    angular.module('app.user.userEditor').config(userEditorConfig);
    function  userEditorConfig($stateProvider) {
        var  userEditorState={
            name:"main.user.userEditor",
            url:"/edit/:id",
            templateUrl:"./user/userEditor/userEditor.html",
            controller:"UserEditorController",
            controllerAs:"vm"
        }
        $stateProvider.state(userEditorState);

    }
})();