// eslint-disable-next-line import/prefer-default-export

class HttpsError extends Error {}

export const config = jest.fn().mockReturnValue('true');
export const https = {
  HttpsError,
};
