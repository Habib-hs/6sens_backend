const env = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

const app = require("./app");

// environment variable/constant
env.config({ path: "./config.env" });

const DB = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.jbdclir.mongodb.net/6sense?retryWrites=true&w=majority`;

//mongodb conection

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    //useCreateIndex: true
  })
  .then((con) => {
    console.log("DB connection successful ");
  });

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
