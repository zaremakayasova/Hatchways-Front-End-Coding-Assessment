import React, { useState } from 'react';
import { TiPlus, TiMinus } from "react-icons/ti";
import SearchBar from '../search-bar.component/searchbar-component';
import './student.styles.css';


const Student = ({ student: { firstName, lastName, city, company, email, skill, pic, grades } }) => {

    const [gradesList, setGrades] = useState(false);
    const [query, setQuery] = useState('');
    const [tagNames, setTagName] = useState([]);
    const [searchQuery, setSearch] = useState('');

    const showGrades = () => {
        setGrades(!gradesList);
    };

    const handleChange = e => {
        setQuery(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        tagNames.push(query);
        setTagName(tagNames);
        setQuery([]);
    };

    const handleSearch = e => {
        setSearch(e.target.value);
    };

    const filteredTags = tagNames.filter(tagN =>
        tagN.toLowerCase().includes(searchQuery.toLowerCase()));

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
                            {
                                filteredTags.map(tag => (
                                    <div className='tag-container'>
                                        <span className='student-tag' >{tag}</span>
                                    </div>

                                ))
                            }
                            <form onSubmit={handleSubmit}>
                                <input className='student-input' type="text" value={query} onChange={handleChange} placeholder='Add a tag' />
                            </form>
                        </div>
                        : null
                }
            </div>

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