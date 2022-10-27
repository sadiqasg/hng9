const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// your code

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
