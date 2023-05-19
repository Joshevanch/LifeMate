const express = require("express");
const db = require("./src/config/config");
const app = express();
const bp = require("body-parser");
const lifemateRoute = require("./src/Routes/Routes");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use("/lifemate", lifemateRoute);

app.listen(8080 || process.env.port, () => {
  console.log("Port berhasil dijalankan");
});
