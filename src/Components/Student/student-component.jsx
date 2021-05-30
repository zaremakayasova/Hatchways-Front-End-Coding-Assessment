import React, { useState } from 'react';
import { TiPlus, TiMinus } from "react-icons/ti";
import SearchBar from '../Search-Bar/search-bar.component';
import './student.styles.css';


const Student = ({ student: { firstName, lastName, city, company, email, skill, pic, grades } }) => {

    const [gradesList, setGrades] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const [tagNames, setTagName] = useState([]);
    const [searchQuery, setSearch] = useState('');

    const showGrades = () => {
        setGrades(!gradesList);
    };

    // Handle tag adding input 
    const handleChange = e => {
        setTagInput(e.target.value);
    };

    // Handle tag submit
    const handleSubmit = e => {
        e.preventDefault();
        tagNames.push(tagInput);
        setTagName(tagNames);
        setTagInput([]);
    };

    // Handle tag search input
    const handleSearch = e => {
        setSearch(e.target.value);
    };

    // Filter students' tags based on tag search input
    const filteredTags = tagNames.filter(tagName =>
        tagName.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className='student'>
            <img className='student-image' src={pic} alt='student-logo' />
            <div className='student-content'>
                <h1 className='student-title'>{firstName} {lastName}</h1>
                <SearchBar placeholder='Search by tag' handleChange={handleSearch} searchQuery={searchQuery} searchTagbar />
                <p>City: {city}</p>
                <p>Company: {company}</p>
                <p>Email: {email} </p>
                <p>Skill: {skill} </p>
                <p>Average: {
                    grades.map(num => parseInt(num, 10)).reduce((total, currentNum) => total + currentNum) / grades.length
                } % </p>
                {
                    gradesList ?

                        <div>
                            {
                                grades.map(grade => (
                                    <p>Test {grades.indexOf(grade) + 1}: {grade}% </p>
                                ))
                            }
                            {/* Render tags based on the results of filtered array */}
                            {
                                filteredTags.map(tag => (
                                    <div className='tag-container'>
                                        <span className='student-tag' >{tag}</span>
                                    </div>

                                ))
                            }
                            <form onSubmit={handleSubmit}>
                                <SearchBar placeholder='Add a tag' handleChange={handleChange} searchQuery={tagInput} searchTagbar />
                            </form>
                        </div>
                        : null
                }
            </div>
            {/* Click expand button, Toggle plus icon and show student's expandable list view */}
            <button className='student-button' type='button' onClick={showGrades}>
                {
                    gradesList ?

                        <TiMinus size='2.5em' color='gray' />
                        :
                        <TiPlus size='2.5em' color='gray' />
                }
            </button>
        </div>
    );
};

export default Student;