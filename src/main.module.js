(function () {
    angular.module('app',
        [
            'app.core',
            'ui.router',
            'app.user'
        ]
    )



    })();

angular.element(document).ready(function () {
    angular.bootstrap(document,['app'])
});