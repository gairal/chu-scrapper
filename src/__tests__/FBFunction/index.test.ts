import { Request, Response } from 'firebase-functions';
import FBFunction from '../../FBFunction';
import { mockReq, mockRes } from '../../../__mocks__/reqRes';

class Test extends FBFunction<string> {
  public request() {
    return Promise.resolve('DONE');
  }
}

describe('FBFunction', () => {
  let func: Test;
  let req: Request;
  let res: Response;
  beforeEach(() => {
    func = new Test();
    req = mockReq();
    res = mockRes();
  });

  it('exposes an onRequest method', () => {
    expect(func.onRequest).toBeDefined();
  });

  describe('onRequest', () => {
    it('exposes an onRequest method', async () => {
      await func.onRequest(req, res);
      expect(res.send).toHaveBeenCalled();
    });
  });
});
