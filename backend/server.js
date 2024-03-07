require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDB = require("./utils/db");

app.use(express.json());

app.use("/api/auth", router);

const port = 3000;
// const DB = 'mongodb+srv://ddjail2004:1Swamiji@cluster0.xeq6720.mongodb.net/mernstack?retryWrites=true&w=majority&appName=Cluster0'
// mongoose.connect(DB).then(() => {
//     console.log("Success");
// });

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on ${port}`);
    });
})

.catch((err)=>{
    console.log("Db not connected",err)
})