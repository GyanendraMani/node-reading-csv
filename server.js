const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3001







app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
