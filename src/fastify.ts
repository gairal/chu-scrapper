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
) => {
  try {
    const fun = new FunctionType();
    const auth = config.disableAuth
      ? null
      : await FBFunction.validateFirebaseIdToken(req.headers.authorization);
    return await fun.request(auth, params);
  } catch (err) {
    return err;
  }
};

const fast = fastify()
  .get('/auth', async (request) => route(request, Auth))
  .get('/rickshawstop', async (request) => route(request, RickshawStop, request.query as { q: string }));

fast.listen(8080).catch((err) => {
  fast.log.error(err);
  process.exit(1);
});
