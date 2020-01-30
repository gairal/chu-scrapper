import { IncomingMessage } from 'http';

// eslint-disable-next-line import/no-extraneous-dependencies
import * as fastify from 'fastify';
import * as admin from 'firebase-admin';

import Auth from './functions/Auth';
import RickshawStop from './functions/RickshawStop';
import FBFunction from './functions/FBFunction';
import { config } from './config';

admin.initializeApp();

const route = async (
  { req }: fastify.FastifyRequest<
  IncomingMessage,
  fastify.DefaultQuery,
  fastify.DefaultParams,
  fastify.DefaultHeaders,
  any
  >,
  FunctionType: any,
  params?: any,
  body?: any,
) => {
  try {
    const fun = new FunctionType();
    const auth = config.disableAuth
      ? null
      : await FBFunction.validateFirebaseIdToken(req.headers.authorization);
    return await fun.request(auth, params, body);
  } catch (err) {
    return err;
  }
};

const fast = fastify()
  .get('/auth', async (request) => route(request, Auth))
  .get('/rickshawstop', async (request) => route(request, RickshawStop, request.query as { q: string }));

fast.addContentTypeParser(
  'application/json',
  { parseAs: 'string' },
  (_, body, done) => {
    try {
      done(null, JSON.parse(body));
    } catch (err) {
      err.statusCode = 400;
      done(err, undefined);
    }
  },
);

fast.listen(8080).catch((err) => {
  fast.log.error(err);
  process.exit(1);
});
