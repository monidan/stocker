const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

const routes = require('./routes/index');

fastify.register(cors, {
    // options
});

routes.forEach(route => fastify.register(route, { prefix: '/api' }));

const start = async () => {
    try {
        await fastify.listen({ port: 3001 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();