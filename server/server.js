const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require('cors');

const app = express();
const PORT = 3001

const structuredData = require("./process-csv")


// console.log(structuredData)
app.use(cors())
app.use(bodyParser.json());

app.get('/suppliers-data', (req, res) => {
    try {
        const csvData = structuredData();
        res.json({ data: csvData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
