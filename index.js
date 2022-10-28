const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors({ credentials: true, origin: "*" }));

app.get("/", (req, res) => {
    res.status(200).json({
        slackUsername: "codeHashira",
        backend: true,
        age: 32,
        bio: "Hello! I am a Backend Developer",
    });
});

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
