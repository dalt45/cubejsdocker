const secretJWT: string = process.env.SECRET_JWT_ADMIN;
const clientGoogle: string = process.env.GOOGLE_CLIENT_ADMIN;
const clientSecretGoogle: string = process.env.GOOGLE_CLIENT_SECRET_ADMIN;

export const jwtConstants = {
  secret: secretJWT,
};


export const googleContants = {
  client: clientGoogle,
  secret: clientSecretGoogle,
};
