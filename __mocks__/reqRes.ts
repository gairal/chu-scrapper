import { Request, Response } from 'firebase-functions';

const baseHeaders = { origin: 'http://localhost:3000' };

class Res {
  private headers: Record<string, string> = baseHeaders;

  public getHeader(key: string): string {
    return this.headers[key];
  }

  public setHeader(key: string, value: string): void {
    this.headers[key] = value;
  }

  public send = jest.fn().mockReturnThis();

  public type = jest.fn().mockReturnThis();
}

type ReqOpts = { headers?: any };
const initReq = (opts: ReqOpts = {}) => {
  const { headers = {} } = opts;
  return { headers: { ...baseHeaders, ...headers } };
};
export const mockReq = (opts?: ReqOpts): Request => {
  const req = initReq(opts);
  return req as Request;
};

export const mockRes = (): Response => {
  const res = new Res();
  return (res as unknown) as Response;
};
