import { Request, Response } from 'firebase-functions';

import mockAxios from '../../__mocks__/axios';
import { mockReq, mockRes } from '../mocks/reqRes';
import funcs from '../../src/functions';
import { rickshawStop } from '../fixtures';

describe('FB/RickshawStop', () => {
  let func: (req: Request, res: Response<any>) => Promise<void>;
  let req: Request;
  let res: Response;
  beforeEach(() => {
    func = funcs.rickshawStop;
    req = mockReq({ headers: { authorization: 'Bearer NAH' } });
    res = mockRes();
  });

  afterEach(mockAxios.reset)

  describe('onRequest', () => {
    it('expects to send back events', async () => {
      mockAxios.get.mockResolvedValue({data: rickshawStop});
      await func(req, res);

      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
        count:15,
        status:'ok'
      }));

      const [result] = (res.send as any).mock.calls[0];
      expect(result.count).toBe(15);
      expect(result.events.length).toBe(15);
    });
  });

  it('return an error if the call to the site failed', async () => {
    mockAxios.get.mockRejectedValue({ status:  404 });
    await func(req, res);

    expect(res.send).toHaveBeenCalledWith({
      "authorized": true, "message": "failed RickshawStop scrap", "status": 500}
    );
  });
});
