// import logo from './logo.svg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';

import FormComponent from './components/Form';
import React, { useState, useEffect } from 'react';
import axios from 'axios';



// import './App.css';





function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/suppliers-data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  console.log("printing data", data);
  return (
    <Stack className="col-md-5 mx-auto my-auto">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <FormComponent csvData={data} />)}
    </Stack>
  );
}

export default App;
