// Options can be passed to plugins on registration
exports.register = function(server, options, next) {
    // This is our storage of animals
    var animals = [
    {
        name: 'Cat',
        sound: 'meow!'
    },
    {
        name: 'Dog',
        sound: 'woof!'
    }
    ];

    server.route([
        {
            method: 'GET',
            path: '/animals',
            handler: function (request, reply) {
                // Return all of our animals
                reply(animals);
            }
        },
        {
            method: 'POST',
            path: '/animals',
            handler: function (request, reply) {
                // Get an animal
                var animal = request.payload.animal;
                // Now we're storing the animal
                var key = animals.push(animal);
                reply({key: key - 1, animal: animal});
            }
        }
    ]);
 
    // Callback, completes the registration process
    next();
}
 
// Required for all plugins
// If this were a npm module, one could do this:
// exports.register.attributes = require('package.json')
exports.register.attributes = {
    name: 'animals-route', // Must be unique
    version: '1.0.0'
};