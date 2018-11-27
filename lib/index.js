var _require = require("daggy"),
    taggedSum = _require.taggedSum;

var TAG = "@@tag";
var VALUES = "@@values";
var TYPE = "@@type";

var findFields = function findFields(keys) {
  return keys.length === 1 && keys[0] === "is" ? [] : keys;
};

var stringifyDaggy = function stringifyDaggy(daggy) {
  var values = daggy[VALUES];
  return "DAGGY_" + JSON.stringify({
    fields: findFields(Object.keys(daggy)),
    typeName: daggy.constructor[TYPE],
    tag: daggy[TAG],
    values: values && values.length > 0 ? values : null
  });
};

var replacer = function replacer(key, value) {
  if (!value || !value[TAG]) return value;
  return stringifyDaggy(value);
};

var parseDaggyStr = function parseDaggyStr(daggyStr) {
  var _taggedSum;

  var _JSON$parse = JSON.parse(daggyStr),
      fields = _JSON$parse.fields,
      typeName = _JSON$parse.typeName,
      tag = _JSON$parse.tag,
      values = _JSON$parse.values;

  var newDaggy = taggedSum(typeName, (_taggedSum = {}, _taggedSum[tag] = fields, _taggedSum));
  return values ? newDaggy[tag].apply(newDaggy, values) : newDaggy[tag];
};

var reviser = function reviser(key, value) {
  return value && typeof value === "string" && value.startsWith("DAGGY_") ? parseDaggyStr(value.substr(6)) : value;
};

exports.stringify = function (obj) {
  if (!obj || !(obj[TAG] || typeof obj === "object")) {
    throw new TypeError("Arg given is not a daggy nor an object, receive: " + typeof obj);
  }

  if (obj[TAG]) return stringifyDaggy(obj);
  return JSON.stringify(obj, replacer);
};

exports.parse = function (str) {
  if (!str || typeof str !== "string") return str;
  if (str.startsWith("DAGGY_")) return parseDaggyStr(str.substr(6));
  return JSON.parse(str, reviser);
};