const { urlencoded } = require("express")
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const exhbs = require("express-handlebars")
const cookieParser = require("cookie-parser")
const userAuth = require("./user-authentication")

// Set view engine to express handlebars
app.engine("hbs", exhbs.engine({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", "hbs")

app.use(express.static("public"))
app.use(urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req, res) => {
  console.log(req.cookies)
  res.render("index")
})

app.post("/", (req, res) => {
  const { account, password } = req.body
  const user = userAuth.checkAccount(account)

  if (user) {
    if (userAuth.checkPassword(user, password)) {
      res.cookie("login", "true")
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
