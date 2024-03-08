module.exports = {
    reactStrictMode: true,
    env: {
      API: process.env.API,
    },
    redirects: () => {
      return [
        {
          source: '/',
          destination: '/userarea/home',
          permanent: true,
        },
      ];
    }
  }