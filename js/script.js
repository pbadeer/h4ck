angular.module("h4ck", []);

function h4ck($scope){
    $scope.computer = "macbookair";
    $scope.user = "pbadeer";
    $scope.folder = "usr";
    $scope.notifications = {
        1: {
            content: "www.asdf.com has been recovered",
            type: "warning"
        },
        2: {
            content: "botnet on www.querty.com was detected",
            type: "info"
        },
        3: {
            content: "a hacker has obtained your site www.pacman.com",
            type: "error"
        },
        4: {
            content: "a hacker has failed to obtain www.qq.com",
            type: "success"
        }
    };
    $scope.attackedSites = [
        "www.asdf.com",
        "www.querty.com",
        "www.google.com",
        "www.pacman.com",
        "www.sony.com"
    ];
    $scope.controlledSites = [
        "www.querty.com",
        "www.pancakes.com",
        "www.supercompany.com",
        "www.qq.com"
    ];
    $scope.messages = [
        {
            content: "*** w31c0m3 70 7h3 w0r1d 0f h4ck ***",
            time: "18:24:01"
        },
        {
            content: "logged in as " + $scope.user,
            time: "18:24:11"
        }
    ];

    $scope.reverse = function(array) {
        return [].concat(array).reverse();
    };
    $scope.pad = function(number) {
        return (number < 10 ? '0' : '') + number;
    }
    $scope.addMessage = function() {
        if($scope.input) {
            var d = new Date;
            var time = $scope.pad(d.getHours()) + ":" + $scope.pad(d.getMinutes()) + ":" + $scope.pad(d.getSeconds());

            $scope.messages[$scope.messages.length] = {
                content: $scope.input,
                time: time
            }

            $scope.input = "";
        }
    };
}

