module.exports = function override(config, env) {
  // Remove esline
  config.module.rules.splice(1, 1);

  config = require("react-app-rewire-hot-loader")(config, env);
  config = require("react-app-rewire-postcss")(config, true);
  return config;
};
