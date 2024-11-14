const CsvData = require('../model/CsvData');

exports.uploadCsvData = async (req, res) => {
  try {
    const csvData = req.body; // JSON data received from the frontend

    // Filter out documents that already exist in MongoDB
    const filteredData = [];
    for (let item of csvData) {
      // Ensure every item includes `createdAt`, `updatedAt`, and `deletedAt` fields
      const newItem = {
        ...item,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const exists = await CsvData.exists(newItem);
      if (!exists) {
        filteredData.push(newItem);
      }
    }

    if (filteredData.length > 0) {
      await CsvData.insertMany(filteredData); // Insert the filtered JSON data into MongoDB
      res.status(200).json({ message: 'CSV data uploaded successfully' });
    } else {
      res.status(200).json({ message: 'No new data to upload' });
    }
  } catch (error) {
    console.error('Error inserting CSV data:', error);
    res.status(500).send('Failed to upload CSV data');
  }
};
