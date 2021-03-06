const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter");

// to send static resources to client 
app.use(express.static("view"))
app.use(express.static(path.join(__dirname, "public")));

// pre-defined
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/post", postRouter);

// localhost:3000/api/users
app.listen(4000, function() {
    console.log("Express Server is listening at port 4000");
})