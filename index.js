var Hapi = require('hapi');
 
var server = new Hapi.Server();
 
server.connection({
    host: 'localhost',
    port: 8000
});
 
// This is where we delcare our plugins
var plugins = [
    { register: require('./routes/animals.js') }
];
 

server.register(plugins, function (err) {
    if (err) { throw err; }
 
    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});