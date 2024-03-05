// utils/initCors.js
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Adjust based on your needs
  origin: true, // Reflect the request origin, or set specific origins
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error if something goes wrong
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function initCors(req, res) {
  await runMiddleware(req, res, cors);
}
