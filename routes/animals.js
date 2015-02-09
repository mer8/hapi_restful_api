
var Hapi = require('hapi');
var Joi = require('joi');

// Options can be passed to plugins on registration
exports.register = function(server, options, next) {
    // This is our storage of animals
    var animals = [
    {
        name: 'Cat'
    ,   sound: 'meow!'
    }
,   {
        name: 'Dog'
    ,   sound: 'woof!'
    }
    ];


// Declaring routes here
    server.route([
        {
            method: 'GET'
        ,   path: '/animals'
        ,   handler: function (request, reply) {
                // Return all of our animals
                reply(animals);
            }
        }
        ,   // Let's GET a random animal
        {
            method: 'GET'
        ,   path: '/random'
        ,   handler: function (request, reply) {
                var id = Math.floor(Math.random() * animals.length);
                reply(animals[id]);
            }
        },
        {
            method: 'POST'
        ,   path: '/animals'
        ,   config: {
                handler: function(request, reply) {
                    var newAnimal = {
                        name: request.payload.name
                    ,   sound: request.payload.sound
                    };
                    animals.push(newAnimal);
                    reply(newAnimal);
                }
            ,   validate: {
                    payload: {
                        name: Joi.string().required()
                    ,   sound: Joi.string().required()
                    }
                }
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