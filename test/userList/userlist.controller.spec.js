/**
 * Created by kript on 17/10/2016.
 */
describe("app:userList controller", function () {

    var UserListController;
    beforeEach(function () {
        module("app.userList");
        module(function($provide) {
            $provide.provider('apiBase', function() {


                this.$get = function() {


                    return "";
                };
            });
        }); //apiBaseProvider

        inject(function ($controller,GetUsers,GetProps) {
            UserListController = $controller('UserListController', {
             vm: UserListController,
                GetUsers: GetUsers,
                GetProps:GetProps
            });

        })


    });


    it("interaction functions declared", function () {
        expect(angular.isFunction(UserListController.changeSort)).toBe(true)
        expect(angular.isFunction(UserListController.setSearch)).toBe(true)
        expect(angular.isFunction(UserListController.setPage)).toBe(true)
        expect(angular.isFunction(UserListController.setLimit)).toBe(true)


    })

})