const LLMDetails = require("../model/LLMDetailsModel");
const { processCSV, getHeaders } = require("../services/csvToJson");
const { Readable } = require("stream");

const createLLMDetails = async (req, res) => {
  try {
    const file = req.files;
    const bodyData = req.body;

    const details = file.File.data.toString();
    const headers = getHeaders(details);

    const readable = Readable.from([details]);
    
    let data = '';

    // Using async/await within the stream handling
    readable.on("data", (chunk) => {
      data += chunk;
    });

    readable.on("end", async () => {
      try {
        // Process CSV data after the stream ends
        const userArray = processCSV(headers, data);
        const inputs = JSON.parse(bodyData.LLMMapping);

        const filteredDetails = userArray.map((element) => {
          const tempObject = {};
          Object.keys(element).forEach((elementKey) => {
            if (elementKey in inputs) {
              tempObject[inputs[elementKey]] = element[elementKey];
            }
          });
          return tempObject;
        });

        console.log("filter", filteredDetails);

        // Insert data into MongoDB and wait for the promise to resolve
        const result = await LLMDetails.insertMany(filteredDetails, { ordered: false });
        console.log("success", result);
        
        // Send a JSON response after successful insertion
        res.json({ message: "Inserted successfully", result });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Problem occurred while uploading the file", error: err.message });
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ERROR", error: error.message });
  }
};

module.exports = {
  createLLMDetails
};
