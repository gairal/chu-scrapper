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

const initReq = () => ({ headers: baseHeaders });

export const mockReq = (): Request => {
  const req = initReq();
  return req as Request;
};

export const mockRes = (): Response => {
  const res = new Res();
  return (res as unknown) as Response;
};
