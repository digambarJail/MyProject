require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDB = require("./utils/db");
const cors = require('cors');

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST, PUT, PATCH, DELETE, ADD",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", router);

const port = 3000;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on ${port}`);
    });
})

.catch((err)=>{
    console.log("Db not connected",err)
})