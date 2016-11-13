/**
 * Created by kript on 17/10/2016.
 */
describe("app:userList services", function() {

   var   getUsers,httpBackend ;
    beforeEach(function() {


        module("app.userList");
        module(function($provide) {
            $provide.provider('apiBase', function() {


                this.$get = function() {


                    return "";
                };
            });
        });
        inject(function (GetUsers,$injector) {
            getUsers = GetUsers;

            httpBackend = $injector.get('$httpBackend');

        })


    });
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });






        it(" provides data right way",function () {

            var resultData  ;

            var response = [{"id":96,"email":"OQBx5@asd.com","first_name":"DOgrb","last_name":"f8PAn","user_type":"Victim","location":"","job_title":"","department":"","office_number":"","mobile_phone":"","education_level":"","birthday":"","ernolment_date":""},{"id":95,"email":"QNdcq@asd.com","first_name":"sX6N4","last_name":"lA21b","user_type":"Victim","location":"","job_title":"","department":"","office_number":"","mobile_phone":"","education_level":"","birthday":"","ernolment_date":""}]
            var handler = {
                success: function(data) {
                    resultData = data;

                },
                error: function() {

                }
            };
            // spyOn(handler, 'success').and.callThrough();
            // spyOn(handler, 'error').and.callThrough();

            httpBackend.expectGET("/users?_limit=2&_start=4&_sort=id&q=&_order=ASC").respond(200,response,{'x-total-count':"100"});

            getUsers(2,4,"id","").then(handler.success);
            httpBackend.flush();
            // expect(handler.success).toHaveBeenCalled();
            expect(resultData.pages[2].isActive).toEqual(true);
            expect(resultData.pages.length).toEqual(50);
            // expect(handler.error).not.toHaveBeenCalled();



        })

})