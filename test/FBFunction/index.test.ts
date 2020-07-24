import { Request, Response } from 'firebase-functions';

import FBFunction from '../../src/FBFunction';
import { mockReq, mockRes } from '../mocks/reqRes';

const requestResult = 'DONE';
class Test extends FBFunction<string> {
  public request() {
    return Promise.resolve(requestResult);
  }
}

describe('FBFunction', () => {
  let func: Test;
  let req: Request;
  let res: Response;
  beforeEach(() => {
    func = new Test();
    req = mockReq({ headers: { authorization: 'Bearer NAH' } });
    res = mockRes();
  });

  it('exposes an onRequest method', () => {
    expect(func.onRequest).toBeDefined();
  });

  describe('onRequest', () => {
    it('expects to call send', async () => {
      await func.onRequest(req, res);
      expect(res.send).toHaveBeenCalledWith(requestResult);
    });

    it('sends a error on exception with a status', async () => {
      const error = Error('ERROR');
      (error as any).status = 420;
      func.request = jest.fn().mockRejectedValue(error);
      await func.onRequest(req, res);
      expect(res.send).toHaveBeenCalledWith({
        authorized: true,
        message: error.message,
        status: 420,
      });
    });
  });
});
