const { count } = require('console');
let csvToJson = require('convert-csv-to-json');
let fs = require('fs');

const fileName = "data.csv";

const structuredData = () => {
    const data = csvToJson.formatValueByType().getJsonFromCsv(`./${fileName}`);

    const suppliers = getAllUniqueSupplier(data, "Supplier");

    const newData = getNewData(data, suppliers)


    fs.writeFile(`./newdata.json`, JSON.stringify(newData), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });

    return newData;

}



// const dataOfcsv = structuredData();








function getAllUniqueSupplier(data, key) {
    const uniqueValues = [];
    const result = [];

    for (const obj of data) {
        const value = obj[key];

        if (!uniqueValues.includes(value)) {
            uniqueValues.push(value);
            result.push(obj);
        }
    }

    return uniqueValues;
}

function getNewData(data, suppliers) {
    const strData = []

    for (const Supplier of suppliers) {
        // console.log(Supplier);

        const poList = [];
        let count = 1;

        for (const obj of data) {
            const value = obj["Supplier"];


            if (value == Supplier) {
                // const { PONumber, Description, ...obj } = obj
                poList.push({ PO_key: `PO-${count}`, PONumber: obj.PONumber, Description: obj.Description });
                // console.log(obj)
                count++;
            }
        }
        strData.push({ Supplier: Supplier, PO: poList })

    }

    return strData;
}


module.exports = structuredData;