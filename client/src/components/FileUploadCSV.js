import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "react-dropdown/style.css";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Avatar } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { toast } from "react-toastify";

const theme = createTheme();

export default function FileUploadCSV() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer_1, setAnswer_1] = useState("");
  const [answer_2, setAnswer_2] = useState("");
  const [answer_3, setAnswer_3] = useState("");
  const [answer_4, setAnswer_4] = useState("");
  const [studentAnswer, setStudentAnswer] = useState("");
  const [headers, setHeaders] = useState([]);
  const [success, setSuccess] = useState(false);

  const fileReader = new FileReader();

  const changeHandler = (event) => {
    if (event.target.files[0] && event.target.files[0].type !== "text/csv") {
      alert("Please upload .CSV files");
      return;
    }
    setSelectedFile(event.target.files[0]);
    event.target.files[0] && setIsFilePicked(true);

    if (event.target.files[0]) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        const headers = csvOutput.slice(0, csvOutput.indexOf("\n")).split(",");
        setHeaders(headers);
        console.log("op", headers);
      };

      fileReader.readAsText(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("🚀 ~ handleSubmit ~ data:", data);
  };

  const handleSubmission = () => {
    if (!isFilePicked) return;
  
    const formData = new FormData();
    formData.append("File", selectedFile);
  
    // Ensure these variables (question, answer_1, etc.) are defined in your component's scope
    const sendObject = {
      [question]: "question",
      [answer_1]: "answer_1",
      [answer_2]: "answer_2",
      [answer_3]: "answer_3",
      [answer_4]: "answer_4",
      [studentAnswer]: "student_answer",
    };
  
    formData.append("LLMMapping", JSON.stringify(sendObject));
  
    fetch("http://localhost:3500/questions/create", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json()) // Correctly handle the JSON parsing
      .then((result) => {
        setSuccess(true); // Assuming `setSuccess` is a state updater function
        toast.success("Uploaded successfully",result.message);
        console.log(result); // Log the result if needed
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
                    <input type="file" hidden onChange={changeHandler} />
                  </Button>
                ) : (
                  <Button variant="contained" component="label">
                    Upload File
                    <input type="file" hidden onChange={changeHandler} />
                  </Button>
                )}
              </Grid>
            </Grid>
            
            {isFilePicked ? (
              <>
                <hr />
                <Typography component="h3" variant="h8">
                  Map the csv headers
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="question-select-label">
                        Question
                      </InputLabel>
                      <Select
                        labelId="question-select-label"
                        id="question-simple-select"
                        value={question}
                        label="Question"
                        onChange={(e) => setQuestion(e.target.value)}
                      >
                        {headers.map((header, index) => (
                          <MenuItem value={header}>{header}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="answer_1-select-label">
                        Answer_1
                      </InputLabel>
                      <Select
                        labelId="answer_1-select-label"
                        id="answer_1-simple-select"
                        value={answer_1}
                        label="Question"
                        onChange={(e) => setAnswer_1(e.target.value)}
                      >
                        {headers.map((header, index) => (
                          <MenuItem value={header}>{header}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="answer_2-select-label">
                        Answer 2
                      </InputLabel>
                      <Select
                        labelId="answer_2-select-label"
                        id="answer_2-simple-select"
                        value={answer_2}
                        label="Answer 2"
                        onChange={(e) => setAnswer_2(e.target.value)}
                      >
                        {headers.map((header, index) => (
                          <MenuItem value={header}>{header}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="answer_3-select-label">
                        Answer 3
                      </InputLabel>
                      <Select
                        labelId="answer_3-select-label"
                        id="answer_3-simple-select"
                        value={answer_3}
                        label="Answer 3"
                        onChange={(e) => setAnswer_3(e.target.value)}
                      >
                        {headers.map((header, index) => (
                          <MenuItem value={header}>{header}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="answer_4-select-label">
                        Answer 4
                      </InputLabel>
                      <Select
                        labelId="answer_4-select-label"
                        id="answer_4-simple-select"
                        value={answer_4}
                        label="Answer 4"
                        onChange={(e) => setAnswer_4(e.target.value)}
                      >
                        {headers.map((header, index) => (
                          <MenuItem value={header}>{header}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="answer-select-label">Student Answer</InputLabel>
                      <Select
                        labelId="answer-select-label"
                        id="answer-simple-select"
                        value={studentAnswer}
                        label="Student Answer"
                        onChange={(e) => setStudentAnswer(e.target.value)}
                      >
                        {headers.map((header, index) => (
                          <MenuItem value={header}>{header}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmission}
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
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
