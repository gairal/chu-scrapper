import 'dotenv/config';
import * as functions from 'firebase-functions';
import * as winston from 'winston';


const fbConfig = functions.config();

export const config = {
  authorizedEmails: [
    'peperdro@gmail.com',
    'unkrich.kristine@gmail.com',
    'frank@autofi.io',
  ],
  disableAuth: !!process.env.DISABLE_AUTH,
  reddit: fbConfig.reddit
    ? {
      clientId: fbConfig.reddit.client_id,
      clientSecret: fbConfig.reddit.client_secret,
      deviceId: fbConfig.reddit.device_id,
    }
    : {
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      deviceId: process.env.REDDIT_DEVICE_ID,
    },
  sheet: fbConfig.sheet
    ? {
      apiKey: fbConfig.sheet.key,
      email: fbConfig.sheet.email,
      privateKey: fbConfig.sheet.private_key,
    }
    : {
      apiKey: process.env.SHEET_KEY,
      email: process.env.SHEET_SERVICE_ACCOUNT_EMAIL,
      privateKey: process.env.SHEET_SERVICE_ACCOUNT_PRIVATE_KEY,
    },
  twitter: fbConfig.twitter
    ? {
      consumerKey: fbConfig.twitter.consumer_key,
      consumerSecret: fbConfig.twitter.consumer_secret,
    }
    : {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    },
};

export const logger = winston.createLogger({
  level: fbConfig.logLevel || process.env.LOG_LEVEL || 'info',
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});
