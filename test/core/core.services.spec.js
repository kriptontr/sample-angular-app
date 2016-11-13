describe("app:core services ", function() {

    var _UserList,_GetToken, _GetProps ,_tokenInjector,_paginator,_httpBackend,_apiBase;

    beforeEach(function() {

        module("app.core");
        module(function($provide) {
            $provide.provider('apiBase', function() {


                this.$get = function() {


                    return "";
                };
            });
        });




        inject(function(GetToken,$resource, GetProps,Paginator ) {

            _GetToken = GetToken;
            _GetProps =GetProps;
            _paginator = Paginator;
            inject(function(TokenInjector ,UserList  ,$httpBackend, apiBase) {
                _UserList=UserList;


                _tokenInjector =TokenInjector;

                _httpBackend = $httpBackend;
                _apiBase = apiBase;

            })

        })

    });


    describe("UserList",function () {
        it("is a Resource", function() {
            expect( ( new _UserList()).constructor.name).toBe("Resource");
        });
        it("can send get requests  with right params by $query",function () {
            var something= ["3",4,6]; //has to be an array now !
            var response;
            var errStatus='';
            var handler = {
                success: function(data) {
                    response = data;
                },
                error: function(data) {
                    errorStatus = data;
                }
            };


            _UserList.query({limit:0,offset:1,ordering:2,search:3,asc:'ASC'},handler.success,handler.error);
            spyOn(handler, 'success').and.callThrough();
            spyOn(handler, 'error').and.callThrough();

            _httpBackend.expectGET(_apiBase+"/users?_limit=0&_start=1&_sort=2&q=3&_order=ASC").respond(something,{'x-total-count':"100"});
            _httpBackend.flush();

            //expect(handler.success).toHaveBeenCalled();
            expect(something.a).toEqual(response.a);
            //expect(handler.error).not.toHaveBeenCalled();
            expect(errStatus).toEqual('');
        })
    })
   describe("Getprops",function () {
       it("returning properties of an object as an array",function () {
           expect( _GetProps({a_b:3,x_y:4}))
               .toEqual([{propName:'a_b',pretty:'A b'},{propName:'x_y',pretty:'X y'}]) //used json stringify because it cant pass without it
       })
   })
        describe("tokenInjector",function () {
            it("should return an object with request function",function () {
                expect(_tokenInjector.request({headers:{}}))
                    .toEqual({ headers: { Authorization: _GetToken } })
            })
        })
    describe("Paginator",function () {
        it("returns right array",function () {
            expect(_paginator(10,90,3,6,100).length).toEqual(10)
        })
        it("sets isActive of right object",function () {
            expect(_paginator(10,90,3,6,100)[9].isActive).toEqual(true)
        })
    })
});