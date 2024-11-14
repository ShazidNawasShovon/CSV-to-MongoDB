import './App.css';
import CsvUploader from './components/CsvUploader';
import FileUpload from './components/FileUpload';
import FileUploadCSV from './components/FileUploadCSV';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      {/* <FileUpload /> */}
      {/* <FileUploadCSV /> */}
      <CsvUploader/>
      <ToastContainer />
    </div>
  );
}

export default App;
