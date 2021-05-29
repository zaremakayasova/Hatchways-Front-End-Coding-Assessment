import React, { useEffect, useState } from 'react';
import './App.css';

import Student from './Components/student-component/student-component';
import SearchBar from './Components/search-bar.component/searchbar-component';

const App = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearch] = useState('');

  useEffect(() => {
    getStudents();
  }, [students]);

  const getStudents = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`);
    const data = await response.json();
    setStudents(data.students);
  };

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || student.lastName.toLowerCase().includes(searchQuery.toLowerCase()));


  return (
    <div className='App'>
      <SearchBar placeholder='Search by name' handleChange={handleChange} searchQuery={searchQuery} />
      {
        filteredStudents.map(student => (
          <Student key={student.id} student={student} />
        ))
      }
    </div>
  );
};

export default App;
