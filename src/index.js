const { taggedSum } = require('daggy')

const TAG = '@@tag'
const VALUES = '@@values'
const TYPE = '@@type'

const findFields = keys => (keys.length === 1 && keys[0] === 'is' ? [] : keys)

const stringifyDaggy = daggy => {
  const values = daggy[VALUES]
  return `DAGGY_${JSON.stringify({
    fields: findFields(Object.keys(daggy)),
    typeName: daggy.constructor[TYPE],
    tag: daggy[TAG],
    values: values && values.length > 0 ? stringify(values) : null,
  })}`
}

const replacer = (key, value) => {
  if (!value || !value[TAG]) return value
  return stringifyDaggy(value)
}

const parseDaggyStr = daggyStr => {
  const { fields, typeName, tag, values } = JSON.parse(daggyStr)
  const newDaggy = taggedSum(typeName, { [tag]: fields })
  return values ? newDaggy[tag](...parse(values)) : newDaggy[tag]
}
const reviser = (key, value) =>
  value && (typeof value === 'string' && value.startsWith('DAGGY_'))
    ? parseDaggyStr(value.substr(6))
    : value

const stringify = obj => {
  if (obj === null) return 'null'
  if (obj === undefined) return obj
  if (obj === '') return '""'
  if (obj[TAG]) return stringifyDaggy(obj)
  return JSON.stringify(obj, replacer)
}

const parse = str => {
  if (!str || typeof str !== 'string') return str
  if (str.startsWith('DAGGY_')) return parseDaggyStr(str.substr(6))
  return JSON.parse(str, reviser)
}

exports.stringify = stringify
exports.parse = parse
