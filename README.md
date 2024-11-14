# csvToMongoDb
Bulk upload data to MongoDb using CSV file 

This is a react application used to upload CSV files to MongoDB with node as a backed service.
Steps:
  1. User should upload the csv file into the react application.
  2. user should map the csv headers with the documentId's ie. first_name, last_name, emailId
  3. Then click on submit button
  4. User get the sucessfull response when the file get's uploaded correctly.

While uploading the document we will restrict the duplicate entries by validating the emailId.

Streams are used while uploading the csv data into MongoDb, streams divides the large dataset into chunks and process them.
