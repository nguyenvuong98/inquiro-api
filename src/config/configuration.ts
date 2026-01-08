export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    jwtSecretKey: process.env.JWT_SECRET || 'dev',
    jwtExpireTime: process.env.JWT_EXPIRE_TIME || 86400,
  },
  ai: {
    uri: process.env.AI_URI,
    userName: process.env.AI_USERNAME,
    password: process.env.AI_PWD,
  },
  saltOrRound: parseInt(process.env.SALT_OR_ROUNDS) || 10,
});
