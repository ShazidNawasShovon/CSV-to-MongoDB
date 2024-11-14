const express = require('express');
// const userRoutes = require('./routes/userRoutes');
const LLMRoutes = require('./routes/LLMRoutes');
const csvRoutes = require('./routes/csvRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const upload = require('express-fileupload');

// MongoDB connection URL

// const DBURL = 'mongodb+srv://shazid1512929:nawas@sns.niaqa.mongodb.net/LLM-Database?retryWrites=true&w=majority&appName=SNS';
const DBURL = 'mongodb+srv://zannatunvasha:vasha58305@data.i55bj.mongodb.net/Dataframe?retryWrites=true&w=majority&appName=Data';


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(upload());

// Set strictQuery to true or false depending on your preference
mongoose.set('strictQuery', true);

mongoose.connect(DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  
  const PORT = process.env.PORT || 3500;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} and DBURL is: ${DBURL}`);
  });
}).catch(error => console.error('Error connecting to MongoDB:', error));

/* Routes */

app.use('/api', csvRoutes); // Use the CSV routes

app.use('/questions', LLMRoutes);

// app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('hello world');
});




