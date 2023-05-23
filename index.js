const express = require("express");
const mongoose = require("mongoose");
const UserNames = require("./model");

const app = express();
app.use(express.json());

const MONGO_URL =
  "mongodb+srv://iwillhack:iwillhack@basic-rest-1.io6khyx.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to DB.....");
  })
  .catch((error) => {
    consolr.log("Mongoose db connection Error", error);
  });

app.get("/", (req, res) => {
  res.send("Working");
});

app.get("/allnames", async (req, res) => {
  try {
    const newData = await UserNames.find();
    return res.json(newData);
  } catch (error) {
    console.log("get all names Error", error);
  }
});

app.post("/addname", async (req, res) => {
  const { name } = req.body;
  try {
    const newData = new UserNames({ name });
    await newData.save();
    return res.send(await UserNames.find());
  } catch (error) {
    console.log("addding name error", error);
  }
});

app.get("/search/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const newData = await UserNames.findById(id);
    return res.send(newData);
  } catch (error) {
    console.log("search by id error", error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    res.send(await UserNames.findByIdAndDelete(id));
  } catch (error) {
    console.log("delete error", error);
  }
});

app.listen(8080, () => {
  console.log("server lisning on port 8080");
});
