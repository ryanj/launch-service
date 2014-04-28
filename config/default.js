module.exports = {
  port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
  ip: process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
  host_name: process.env.OPENSHIFT_APP_DNS || 'localhost',
  app_name: process.env.OPENSHIFT_APP_NAME || 'restify'
}
