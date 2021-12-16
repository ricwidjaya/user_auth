const { urlencoded } = require("express")
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const exhbs = require("express-handlebars")
const session = require("express-session")
const userAuth = require("./user-authentication")

// Set view engine to express handlebars
app.engine("hbs", exhbs.engine({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", "hbs")

app.use(express.static("public"))
app.use(urlencoded({ extended: true }))
app.use(
  session({
    secret: "I like Jasmine and it's a secret",
    resave: false,
    saveUninitialized: true
  })
)

app.get("/", (req, res) => {
  if (req.session.login) {
    return res.send(`<h1>You have logged in</h1>`)
  }
  console.log(req.session)
  res.render("index")
})

app.post("/", (req, res) => {
  const { account, password } = req.body
  const user = userAuth.checkAccount(account)

  if (user) {
    if (userAuth.checkPassword(user, password)) {
      req.session.login = true
      console.log(req.sessionID)
      user.sessionID = req.sessionID
      console.log(user)
      res.send(`<h1>Hello, ${user.firstName}</h1>`)
    } else {
      res.send("Please Check Your Password.")
    }
  } else {
    res.send("Account doesn't exist")
  }
})

app.listen(port, () => {
  console.log(`App is running on ${port}`)
})
