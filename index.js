var Hapi = require('hapi');
 
var server = new Hapi.Server();
 
server.connection({
    host: 'localhost',
    port: 8000
});
 
// Declare plugins
var plugins = [
    { register: require('./routes/animals.js') }
];
 
// Register plugins, and start the server if none of them fail
server.register(plugins, function (err) {
    if (err) { throw err; }
 
    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});