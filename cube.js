// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

const userjwt = process.env.SECRET_JWT;
const adminjwt = process.env.SECRET_JWT_ADMIN;

module.exports = {
  checkAuth: async (req, auth) => {
    jwt.verify(auth, userjwt, (err, decoded) => {
      if (err) {
        jwt.verify(auth, adminjwt, (adminErr, adminDecoded) => {
          if (adminErr) {
            throw new Error('Could not authenticate');
          } else {
            req.securityContext = {
              ...adminDecoded,
              isAdmin: true,
            };
          }
        });
        return;
      }
      if (!decoded.university) {
        throw new Error('As user youre not able to use this API');
      }
      req.securityContext = {
        ...decoded,
        isAdmin: false,
      };
      return;
    });
  },
};
