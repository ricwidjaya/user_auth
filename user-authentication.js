const users = require("./user.json")

const userAuth = {
  checkAccount(account) {
    const user = users.find((user) => user.email === account)
    return user
  },

  checkPassword(user, password) {
    return user.password === password
  }
}

module.exports = userAuth
