var util = {};

util.normalizeRealm = function (realmName) {
  return realmName.replace(' ', '-').toLowerCase();
}

module.exports = util;
