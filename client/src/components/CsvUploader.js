import React, { useState } from 'react';
import Papa from 'papaparse';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "react-dropdown/style.css";
import { Avatar } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { toast } from "react-toastify";

const theme = createTheme();

function CsvUploader() {
  const [csvData, setCsvData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type !== "text/csv") {
      toast.error("Please upload .CSV files");
      return;
    }

    setSelectedFile(file);
    setIsFilePicked(!!file);

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const uniqueData = removeDuplicates(result.data);
        setCsvData(uniqueData); // Convert CSV to JSON and remove duplicates
        console.log("🚀 ~ handleFileUpload ~ uniqueData:", uniqueData)
      },
    });
  };

  const removeDuplicates = (data) => {
    const uniqueData = [];
    const seen = new Set();

    data.forEach((row) => {
      const rowString = JSON.stringify(row);
      if (!seen.has(rowString)) {
        seen.add(rowString);
        uniqueData.push(row);
      }
    });

    return uniqueData;
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission from refreshing the page
    if (csvData) {
      try {
        const response = await fetch('http://localhost:3500/api/upload-csv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(csvData),
        });

        if (response.ok) {
          const result = await response.json();
          setSuccess(true);
          toast.success(result.message);
          console.log(result); // Log the result if needed
        } else {
          toast.error('Failed to upload CSV data',response.message);
        }
      } catch (error) {
        console.error('Error uploading CSV data:', error);
        toast.error('Error uploading CSV data');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: '100%'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            CSV to MongoDB
          </Typography>
          <Box
            padding={3}
            border={1}
            borderColor={'#000'}
            borderRadius={5}
            width={'60%'}
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sm={8}>
                <Typography component="h2" variant="h6">
                  Upload CSV file
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}>
                {isFilePicked ? (
                  <Button variant="contained" component="label" color="success">
                    File Uploaded
                    <input type="file" hidden accept=".csv" onChange={handleFileUpload} />
                  </Button>
                ) : (
                  <Button variant="contained" component="label">
                    Upload File
                    <input type="file" hidden accept=".csv" onChange={handleFileUpload} />
                  </Button>
                )}
              </Grid>
            </Grid>
            
            {isFilePicked && (
              <>
                <hr />
                <Typography component="h3" variant="h6">
                  Click to Send Data to Server.
                </Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!csvData}
                >
                  SUBMIT
                </Button>
                {success ? (
                  <Typography component="h1" variant="h6">
                    Uploaded successfully
                  </Typography>
                ) : (
                  <>
                    <Typography component="h1" variant="h6">
                      Filename: {selectedFile.name}
                    </Typography>
                    <Typography component="h1" variant="h6">
                      Filetype: {selectedFile.type}
                    </Typography>
                    <Typography component="h1" variant="h6">
                      Size in bytes: {selectedFile.size}
                    </Typography>
                  </>
                )}
              </>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CsvUploader;
