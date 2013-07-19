// Site Content Templates (static)
var Template = {
    usedIPs: [],
    urls: ["asdf", "google", "blue", "black", "yellow", "pancake", "yahoo"], // should be imported from long list
    features: ["rdm", "ports", "twitter", "facebook", "whois", "ftp", "pages", "database"],
    pages: ["about", "contact", "home", "login", "registration", "terms", "privacy", "subscribe", "account"],
    domains: ["com", "net", "org", "io", "us", "me"],
    site: {
        url: null,
        ip: null,
        features: {}
    },
    twitter: {
        xss: null,
        password: null,
        connections: null,
        session: null
    },
    facebook: {
        fanpage: null,
        profile: null,
        xss: null,
        password: null,
        session: null
    },
    whois: {
        contact: null,
        admin: null,
        login: null
    }
};

// Site Content Generator
var Generator = {
    ports: function(){},
    pages: function(){},
    ftp: function(){},
    rdm: function(){},
    database: function(){},
    ip: function(){
        var ip = Math.floor((Math.random()*998)+1) +
            "." + Math.floor((Math.random()*998)+1) +
            "." + Math.floor((Math.random()*998)+1) +
            "." + Math.floor((Math.random()*998)+1);

        if(Template.usedIPs.search(ip))
            ip = Generator.ip();
        else
            Template.usedIPs[Template.usedIPs.length] = ip;

        return ip;
    },
    url: function(){
        var n = Math.floor((Math.random() * Template.urls.length) + 1);
        var url = "www." + Template.urls[n] + Template.domains[Math.floor((Math.random() * Template.domains.length) + 1)];
        delete Template.urls[n];

        return url;
    },
    features: function(){
        var types = Template.features,
            featureSet = {},
            i;

        for (i = 0; i < Math.floor((Math.random() * Template.features.length) + 1); i++){
            var current = types[Math.floor((Math.random() * Template.features.length) + 1)];
            var v;

            if(Template[current])
                v = Template[current];
            else if (Generator[current])
                v = Generator[current];

            featureSet[current] = v;
            delete types[current];
        }

        return featureSet;
    },
    site: function(){
        var s = Template.site;
        s.ip = Generator.ip();
        s.url = Generator.url();
        s.features = Generator.features();
        // randomize all feature values (bool)
    }
};

// sites = gensite * urls.length
// add emails to sites after master creation