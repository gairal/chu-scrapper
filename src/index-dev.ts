import { fastify, FastifyInstance, RouteHandlerMethod } from 'fastify';
import * as admin from 'firebase-admin';

import functions from './functions';

admin.initializeApp();

const fast: FastifyInstance = fastify();

fast.addHook('onRequest', (_request, reply, next) => {
  (reply as any).setHeader = (reply as any).res.setHeader.bind(
    (reply as any).res
  );
  next();
});

fast
  .get('/auth', (functions.auth as unknown) as RouteHandlerMethod)
  .get(
    '/rickshaw-stop',
    (functions.rickshawStop as unknown) as RouteHandlerMethod
  );

fast
  .listen(8080)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('STARTED', 8080);
  })
  .catch((err) => {
    fast.log.error(err);
    process.exit(1);
  });
