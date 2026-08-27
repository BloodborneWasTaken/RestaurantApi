import express from "express";
import config from "config"
import foodRouter from "./src/router/food.js"
const app = express();

app.use(express.json());

const port = config.get("port")

app.use("/" , foodRouter)




app.listen(port, () => {
  console.log(`the app is sucsessfuly running on port ${port}`);
});