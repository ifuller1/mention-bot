"use strict"

function checkEnvironmentForConfig(config:Object) : Object {
  let mentionBotEnvConfig;

  try {
    mentionBotEnvConfig = JSON.parse(process.env.MENTION_BOT_CONFIG);
  } catch(e) {
    mentionBotEnvConfig = {};
  }

  return Object.keys(config).reduce((previousValue, key) => {
    let defaultConfigValue = config[key];

    let environmentVariable = mentionBotEnvConfig[key];
    let configElement = {};
    configElement[key] = environmentVariable === undefined ? defaultConfigValue
      : environmentVariable;

    return {...previousValue, ...configElement};
  }, {});
}

module.exports = {
  checkEnvironmentForConfig
}
