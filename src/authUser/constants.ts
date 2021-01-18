const secretJWT: string = process.env.SECRET_JWT;
const clientGoogle: string = process.env.GOOGLE_CLIENT;
const clientSecretGoogle: string = process.env.GOOGLE_CLIENT_SECRET;

export const jwtConstants = {
  secret: secretJWT,
};

export const googleContants = {
  client: clientGoogle,
  secret: clientSecretGoogle,
};
