angular.module("h4ck", []);

function h4ck($scope){
    $scope.connected = {
        url: "gateway",
        ip: "192.168.0.1",
        folder: "home",
        user: "ghost"
    };
    $scope.notifications = [];
    $scope.discoveredSites = [];
    $scope.controlledSites = [];
    $scope.messages = [];
    $scope.sites = {};

    $scope.commands = {
        execute: function(input){
            if(input == "help")
                return "execute [item]";
            else if(!input)
                return "no item to execute";
            else
                return "executed " + input;
        },
        help: function(){
            var m = "Commands available: ";
            for (c in $scope.commands){
                m += "-" + c + " ";
            }
            return m;
        },
        connect: function(input){
            if(input == "help"){
                return "connect [item]";
            }
            else if (!input){
                return "nothing to connect to";
            }
            else if (input){
                if($scope.findSite(input)){
                    var site = $scope.findSite(input);
                    $scope.connected = {
                        url: site.url,
                        ip: site.ip,
                        folder: "/",
                        user: "guest"
                    };
                    $scope.discoveredSites[$scope.discoveredSites.length] = {
                        url: site.url,
                        ip: site.ip
                    };
                    return "connected to " + site.ip;
                }
                else {
                    return input + " does not exist";
                }
            }
        },
        scan: function(input){
            if(input == "help"){
                return "scan [item (optional, left blank will scan current location)]";
            }
            else if (!input){
                return $scope.listFeatures($scope.connected.url);
            }
            else if (input){
                if($scope.findSite(input))
                    return $scope.listFeatures(input);
                else
                    return input + " does not exist";
            }
        }
    };
    $scope.reverse = function(array) {
        return [].concat(array).reverse();
    };
    $scope.pad = function(number) {
        return (number < 10 ? '0' : '') + number;
    };
    $scope.listFeatures = function(site){
        site = $scope.findSite(site);
        var featureList = "";
        for (f in site.features){
            featureList += f + " ";
        }
        return "features: " + featureList;
    }
    $scope.findSite = function(val) {
        var obj = $scope.sites;
        var attr = "url";
        for (var i = 0; i < Object.keys(obj).length; i++) {
            if (obj[i][attr] === val) {
                return obj[i];
            }
        }
    };
    $scope.addMessage = function(message) {
        var d = new Date;
        var time = $scope.pad(d.getHours()) + ":" + $scope.pad(d.getMinutes()) + ":" + $scope.pad(d.getSeconds());

        $scope.messages[$scope.messages.length] = {
            content: message,
            time: time
        };
    };
    $scope.addNotification = function(message, type) {
        var d = new Date;
        var time = $scope.pad(d.getHours()) + ":" + $scope.pad(d.getMinutes()) + ":" + $scope.pad(d.getSeconds());

        $scope.notifications[$scope.notifications.length] = {
            content: message,
            type: type,
            time: time
        };
    };
    $scope.sendCommand = function() {
        var i = $scope.input.split(' ');

        $scope.addMessage($scope.connected.url + " (" + $scope.connected.ip + "):" + $scope.connected.folder + " " + $scope.connected.user + "$ " + $scope.input);

        if(!$scope.commands[i[0]])
            $scope.addMessage("\"" + i[0] + "\" command not found");
        if($scope.commands[i[0]] && !i[1])
            $scope.addMessage($scope.commands[i[0]]());
        if($scope.commands[i[0]] && i[1])
            $scope.addMessage($scope.commands[i[0]](i[1]));

        $scope.input = '';
    };
    $scope.saveData = function(item){
        if(item){
            localStorage["h4ck_" + item] = JSON.stringify($scope[item]);
        }
        else {
            localStorage["h4ck_connected"] = JSON.stringify($scope.connected);
            localStorage["h4ck_sites"] = JSON.stringify($scope.sites);
            localStorage["h4ck_notifications"] = JSON.stringify($scope.notifications);
            localStorage["h4ck_messages"] = JSON.stringify($scope.messages);
            localStorage["h4ck_discoveredSites"] = JSON.stringify($scope.discoveredSites);
            localStorage["h4ck_controlledSites"] = JSON.stringify($scope.controlledSites);
        }
        localStorage["h4ck"] = "true";
    };
    $scope.loadData = function(){
        if(localStorage["h4ck"] === "true"){
            $scope.connected = JSON.parse(localStorage["h4ck_connected"]);
            $scope.sites = JSON.parse(localStorage["h4ck_sites"]);
            $scope.notifications = JSON.parse(localStorage["h4ck_notifications"]);
            $scope.messages = JSON.parse(localStorage["h4ck_messages"]);
            $scope.discoveredSites = JSON.parse(localStorage["h4ck_discoveredSites"]);
            $scope.controlledSites = JSON.parse(localStorage["h4ck_controlledSites"]);
            return true;
        }
        else
            return false;
    };
    $scope.init = function(){
        if($scope.loadData() === false){
            $scope.sites = Generator.sites();
            $scope.addMessage("w31c0m3 70 h4ck");
        }
        $scope.saveData();
    };

    $scope.$watch('connected', function(){
        $scope.saveData("connected");
    }, true);
    $scope.$watch('sites', function(){
        $scope.saveData("sites");
    }, true);
    $scope.$watch('notifications', function(){
        $scope.saveData("notifications");
    }, true);
    $scope.$watch('messages', function(){
        $scope.saveData("messages");
    }, true);
    $scope.$watch('discoveredSites', function(){
        $scope.saveData("discoveredSites");
    }, true);
    $scope.$watch('controlledSites', function(){
        $scope.saveData("controlledSites");
    }, true);

    $scope.init();
}