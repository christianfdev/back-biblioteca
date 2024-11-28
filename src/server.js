import Fastify from 'fastify';
import cors from '@fastify/cors';
import authRoutes from './routes/authRoutes.js';

const fastify = Fastify( {
    logger: true
});

fastify.register(cors, {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
  });


fastify.register(authRoutes);

fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
if (err) {
    fastify.log.error(err);
    process.exit(1);
}
});

