const rewireReactHotLoader = require("react-app-rewire-hot-loader");

module.exports = function override(config, env) {
  // Remove esline
  config.module.rules.splice(1, 1);
  
  config = rewireReactHotLoader(config, env);
  return config;
};
