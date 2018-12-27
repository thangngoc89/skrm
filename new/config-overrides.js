const rewireReactHotLoader = require("react-app-rewire-hot-loader");

module.exports = function override(config, env) {
  // Remove esline
  config.module.rules.splice(1, 1);

  console.log(JSON.stringify(config.module.rules[1].oneOf, null, 2));

  config = rewireReactHotLoader(config, env);
  return config;
};
