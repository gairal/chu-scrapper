
import { ServerResponse } from 'http';

import * as fastify from 'fastify'; // eslint-disable-line import/no-extraneous-dependencies
import * as admin from 'firebase-admin';

import functions from './functions';

admin.initializeApp();

const request = (onRequest: any) => (
  req: fastify.FastifyRequest, res: fastify.FastifyReply<ServerResponse>,
) => {
  (res as any).setHeader = res.res.setHeader.bind(res.res);
  return onRequest(req, res);
};
const fast = fastify()
  .get('/auth', request(functions.auth))
  .get('/rickshaw-stop', request(functions.rickshawStop));

fast.listen(8080).catch((err) => {
  fast.log.error(err);
  process.exit(1);
});
