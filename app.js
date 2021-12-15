const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const exhbs = require("express-handlebars")

// Set view engine to express handlebars
app.engine("hbs", exhbs.engine({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", "hbs")

app.get("/", (req, res) => {
  res.render("index")
})

app.listen(port, () => {
  console.log(`App is running on ${port}`)
})
