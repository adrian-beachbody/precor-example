module.exports = {
  stringifyValues(obj) {
    const newObj = {}
    for (const prop in obj) {
      newObj[prop] = JSON.stringify(obj[prop])
    }
    return newObj
  },
}
