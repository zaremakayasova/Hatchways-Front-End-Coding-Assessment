import React, { useEffect, useState } from 'react';
import './App.css';

import Student from './Components/Student/student-component';
import SearchBar from './Components/Search-Bar/search-bar.component';

const App = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearch] = useState('');

  useEffect(() => {
    getStudents();
  }, [students]);

  //Fetch students array from API
  const getStudents = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`);
    const data = await response.json();
    setStudents(data.students);
  };

  const handleChange = e => {
    setSearch(e.target.value);
  };

  // Filter students based on name and lastname search input
  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || student.lastName.toLowerCase().includes(searchQuery.toLowerCase()));


  return (
    <div className='App'>
      <SearchBar placeholder='Search by name' handleChange={handleChange} searchQuery={searchQuery} />
       {/* Render students based on the results of filtered array */}
      {
        filteredStudents.map(student => (
          <Student key={student.id} student={student} />
        ))
      }
    </div>
  );
};

export default App;
