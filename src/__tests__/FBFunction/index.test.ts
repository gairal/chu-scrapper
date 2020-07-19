import { Request, Response } from 'firebase-functions';
import FBFunction from '../../FBFunction';
import { mockReq, mockRes } from '../../../__mocks__/reqRes';

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
    req = mockReq();
    res = mockRes();
  });

  it('exposes an onRequest method', () => {
    expect(func.onRequest).toBeDefined();
  });

  describe('onRequest', () => {
    it('exposes an onRequest method', async () => {
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

    it('fails on exception without status', async () => {
      func.request = jest.fn().mockRejectedValue(Error('ERROR'));
      await expect(func.onRequest(req, res)).rejects.toEqual(
        Error('unavailable')
      );
    });
  });
});
