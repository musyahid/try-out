const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

const passport = require("passport");




const routerUser = require('./src/routes/user')
const routerProduct = require('./src/routes/product')
const routerProductIn = require('./src/routes/product_in')
const routerProductOut = require('./src/routes/product_out')
  const routerPrintProduct = require('./src/routes/print')
const routeLogin = require('./src/routes/login')

//tess

//end


app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());



app.use('/api/v1/user', passport.authenticate("jwt", { session: false }), routerUser)
app.use('/api/v1/product', passport.authenticate("jwt", { session: false }),  routerProduct)
app.use('/api/v1/in', passport.authenticate("jwt", { session: false }), routerProductIn)
app.use('/api/v1/out', passport.authenticate("jwt", { session: false }), routerProductOut)
app.use('/api/v1/print', passport.authenticate("jwt", { session: false }), routerPrintProduct)
app.use('/login', routeLogin)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


