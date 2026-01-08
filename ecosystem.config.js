module.exports = {
  apps: [
    {
      name: 'inquiro-api',
      script: 'dist/main.js',
      exec_mode: 'cluster', // Enables load balancing
    },
  ],
};
