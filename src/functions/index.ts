import Auth from './Auth';
import RickshawStop from './RickshawStop';

const auth = new Auth();
const rickshawStop = new RickshawStop();
export default {
  auth: auth.onRequest.bind(auth),
  rickshawStop: rickshawStop.onRequest.bind(rickshawStop),
};
