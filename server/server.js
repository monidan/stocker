const fastify = require('fastify')({ logger: true });
const routes = require('./routes/index');

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