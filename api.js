const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const userRouter = require("./router/userRouter");

// pre-defined
app.use(express.json());

app.use("/api/users", userRouter);
// app.use("/api/post", postRouter);

// localhost:3000/api/users
app.listen(3000, function() {
    console.log("Server is listening at port 3000");
})