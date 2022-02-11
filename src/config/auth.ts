export default {
  jwt: {
    secret: process.env.APP_SECRET || '02f490af264171b8976c72dd5da82291',
    expiresIn: '999d',
  },
};
