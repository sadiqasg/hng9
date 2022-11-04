const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const { postService } = require("./services");

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        slackUsername: "codeHashira",
        backend: true,
        age: 32,
        bio: "Hello! I am a Backend Developer",
    });
});

app.post("/stage2", (req, res) => {
    try {
        postService(req, res);
    } catch (error) {
        console.log(error)
        res.status(400).json("Error");
    }
});

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
