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
    $scope.attackedSites = [2, 1, 3, 5];
    $scope.controlledSites = [4, 2, 1];
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

    $scope.sites = Sites;

    $scope.commands = {
        execute: function(input){
            if(input == "help")
                return "execute [item]";
            else if(!input)
                return "no item to execute";
            else
                return "executed " + input;
        }
    };
    $scope.reverse = function(array) {
        return [].concat(array).reverse();
    };
    $scope.pad = function(number) {
        return (number < 10 ? '0' : '') + number;
    }
    $scope.addMessage = function(message) {
        var d = new Date;
        var time = $scope.pad(d.getHours()) + ":" + $scope.pad(d.getMinutes()) + ":" + $scope.pad(d.getSeconds());

        $scope.messages[$scope.messages.length] = {
            content: message,
            time: time
        }
    };
    $scope.sendCommand = function() {
        var i = $scope.input.split(' ');

        $scope.addMessage($scope.computer + ":" + $scope.folder + " " + $scope.user + "$ " + $scope.input);

        if(!$scope.commands[i[0]])
            $scope.addMessage("\"" + i[0] + "\" command not found");
        if($scope.commands[i[0]] && !i[1])
            $scope.addMessage($scope.commands[i[0]]());
        if($scope.commands[i[0]] && i[1])
            $scope.addMessage($scope.commands[i[0]](i[1]));

        $scope.input = '';
    }
}