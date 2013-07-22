var Template = {
    usedIPs: [],
    urls: ["asdf", "google", "blue", "black", "yellow", "pancake", "yahoo", "github", "hackers", "unite", "spotify"], // should be imported from long list
    features: ["rdm", "ports", "twitter", "facebook", "whois", "ftp", "pages", "database"],
    pages: ["about", "contact", "home", "login", "registration", "terms", "privacy", "subscribe", "account"],
    domains: ["com", "net", "org", "io", "us", "me"],
    site: function(){
        return {
            ip: null,
            url: null,
            features: {}
        };
    },
    twitter: function(){
        return {
            xss: null,
            password: null,
            connections: null,
            session: null
        };
    },
    facebook: function(){
        return {
            fanpage: null,
            profile: null,
            xss: null,
            password: null,
            session: null
        };
    },
    whois: function(){
        return {
            contact: null,
            admin: null,
            login: null
        };
    },
    database: function(){
        return {
            users: null,
            tables: null,
            injection: null
        }
    }
};