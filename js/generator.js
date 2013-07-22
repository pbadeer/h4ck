var Generator = {
    ports: function(){
        var amount = Math.floor((Math.random()*20)+1);
        var portSet = {};
        for (var i = 0; i < amount; i++){
            portSet[Math.floor((Math.random()*9998)+1)] = null;
        }
        return portSet;
    },
    pages: function(){
        var amount = Math.floor((Math.random() * Template.pages.length));
        var pages = Template.pages;
        var pageSet = {};
        for (var i = 0; i < amount; i++){
            pageSet[pages[i]] = null;
            var index = pages.indexOf(pages[i]);
            pages.splice(index, 1);
        }
        return pageSet;
    },
    ftp: function(){},
    rdm: function(){},
    email: function(){},
    vulnerabilities: function(features){
        return features;
    },
    ip: function(){
        var ip = Math.floor((Math.random()*998)+1) +
            "." + Math.floor((Math.random()*998)+1) +
            "." + Math.floor((Math.random()*998)+1) +
            "." + Math.floor((Math.random()*998)+1);

        if(Template.usedIPs.indexOf(ip) != -1)
            ip = Generator.ip();
        else
            Template.usedIPs[Template.usedIPs.length] = ip;

        return ip;
    },
    url: function(){
        var n = Math.floor(Math.random() * Template.urls.length);
        var r = Template.urls[n] + "." + Template.domains[Math.floor(Math.random() * Template.domains.length)];

        var index = Template.urls.indexOf(Template.urls[n]);
        Template.urls.splice(index, 1);

        return r;
    },
    features: function(){
        var types = Template.features,
            featureSet = {},
            i;

        for (i = 1; i < Math.floor(Math.random() * Template.features.length); i++){
            var current = types[Math.floor(Math.random() * Template.features.length)];
            var feature;

            if(Template.hasOwnProperty(current)){
                if (typeof Template[current] == 'function')
                    feature = new Template[current];
                else
                    feature = Template[current];
            }
            else if (Generator.hasOwnProperty(current))
                feature = Generator[current];

            featureSet[current] = feature;

            var index = types.indexOf(types[current]);
            types.splice(index, 1);
        }

        return featureSet;
    },
    sites: function(){
        var sites = {};
        var amount = Template.urls.length;

        for (var i = 0; i < amount; i++) {
            var s = new Template.site;
            s.ip = Generator.ip();
            s.url = Generator.url();
            s.features = Generator.vulnerabilities(Generator.features());

            sites[i] = s;
        }

        return sites;
    }
};


