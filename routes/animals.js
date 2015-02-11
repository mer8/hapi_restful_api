var Joi = require('joi');


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
    ,   {
            name: 'Frog'
        ,   sound: 'squish!'
        }
    ,   {
            name: 'Squirrel'
        ,   sound: 'munch munch munch!'
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
        ,   path: '/animals/random'
        ,   handler: function (request, reply) {
                var id = Math.floor(Math.random() * animals.length);
                reply(animals[id]);
            }
        }
    ,   {
            method: 'POST'
        ,   path: '/animals'
        ,   config: {
                handler: function(request, reply) {
                    var newAnimal = request.payload.animal;
                    animals.push(newAnimal);
                    reply(newAnimal);
                }
            ,   validate: {
                    payload: {
                        animal: {
                          name: Joi.string().required()
                      ,   sound: Joi.string().required()
                        }
                    }
                }
            }
        }
    ,   {
            method: 'DELETE'
        ,   path: '/animals/{id}'
        ,   handler: function(request, reply) {
                if (animals.length <= request.params.id) {
                    return reply('No animal found!!').code(404);
            }
            animals.splice(request.params.id, 1);
            reply(true);
            }
        }
    ]);
 

    next();
}
 

exports.register.attributes = {
    name: 'animals-route', 
    version: '1.0.0'
};