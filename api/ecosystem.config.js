module.exports = {
  apps: [
    {
      name: 'foolon-admin-api',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
