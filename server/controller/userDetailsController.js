const userDetails = require("../model/userDetailsModel");
const {processCSV, getHeaders} = require("../services/csvToJson");
const { Readable } = require("stream");

createUserDetails = async (req, res) => {
  try {
    const file = req.files;
    const bodyData = req.body;

    var details = file.File.data.toString();

    const headers = getHeaders(details);

    const readable = Readable.from([details]);

    readable.on("data", (chunk) => {
      console.log(chunk); // will be called once with `"input string"`

      var userArray = processCSV(headers, chunk);
      console.log(JSON.parse(bodyData.userMapping));

      var inputs = JSON.parse(bodyData.userMapping);

      const filteredDetails = [];

      userArray.forEach((element) => {
        var tempObject = {};
        Object.keys(element).forEach((elementKey) => {
          if (elementKey in inputs) {
            tempObject[inputs[elementKey]] = element[elementKey];
          }
        });
        filteredDetails.push(tempObject);
      });

      console.log("filter", filteredDetails);

      userDetails
        .insertMany(filteredDetails, { ordered: false })
        .then((result) => {
          console.log("sucess", result);
          res.send("Inserted sucessfully");
        })
        .catch((err) => {
          console.error(err);
          res.send("Problem occured while uploading the file");
        });
    });
  } catch (error) {
    res.send("ERROR");
  }
};

module.exports = {
  createUserDetails
};
