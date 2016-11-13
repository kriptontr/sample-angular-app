/**
 * Created by kript on 15/10/2016.
 */
(function () {

    angular.module('app.core').factory('UserList',userListService)
    function userListService($resource,apiBase ) {

        var ret = $resource(apiBase + '/users/:id?_limit=:limit&_start=:offset&_sort=:ordering&q=:search&_order=:asc',
            {
                limit:'@limit',
                offset:'@offset',
                ordering:'@ordering',
                search:'@search',
                asc:'@asc',

                id:'@id',

            },
            {
                'query': 	{method: 'GET', isArray: false,
                    transformResponse: function(data, headers){
                        response = {}
                        if(!angular.isArray(data))
                        response.results = JSON.parse(data);
                        // response.headers = headers();
                        response.count =  parseInt( headers()['x-total-count']);
                        return response;
                    }},

                'patch':  {method:'PATCH'}
            });
        return   ret;
    }
    angular.module('app.core').factory('GetToken',getToken)
    function getToken($cookies) {
        var token = $cookies.get('Authorization');
        if(!token){ // i know this makes no sense. That lines should be replaced with login logic
            $cookies.put('Authorization','someTokenStrComeHere')
            token = $cookies.get('Authorization');
        }
        return token;
    }

    angular.module('app.core').factory('GetProps',getProps);
    function getProps() {
        return function (object) {
            var ret = [];
            for (property in object){
                ret.push({propName:property, pretty:property.replace(/_/g , ' ').capitalizeFirstLetter()})

            }
            return ret;
        }

    }
    angular.module('app.core').factory('TokenInjector',['GetToken',tokenInjector])
    function tokenInjector(GetToken) {

        var injector = {
            request:function (config) {
                config.headers['Authorization'] = GetToken;
                return config;
            }


        };
        return injector;
    }
    angular.module('app.core').factory('Paginator',[ paginator])
    function paginator( ) {
       var ret = function (limit,offset,ordering,search, total) {
           var pages = [];
           for(var count =0; count<total ; count=count+limit){
               pages.push({
                   limit:limit,
                   offset:count,
                   ordering:ordering,
                   search:search,
                   isActive:offset==count
               })
           }
           return pages;
       };
       return ret;
    }
})();

(function () {
    String.prototype.capitalizeFirstLetter = function() {
        return (this.charAt(0).toUpperCase() + this.slice(1));
    }
})();