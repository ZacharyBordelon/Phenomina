import React, { useEffect, useState } from 'react';
import { createRoot } from "react-dom/client";
import axios from 'axios';
const App = () => {
    const [ reports, setReports ] = useState([]);
    const [ title, setTitle ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ password, setPassword ] = useState('');
    useEffect(()=>{
        try{
            const getReports = async () =>{
                const response = await axios.get('/api/reports')
                console.log(response.data.reports);
                setReports(response.data.reports);
            }

        } catch(err){
            console.log(err);
        }
        
        getReports();
    },[])
    const onChange = (event) => {
        if(event.target.name === 'title'){
            setTitle(event.target.value);
        } else if (event.target.name === 'location') {
            setLocation(event.target.value);
        } else if (event.target.value === 'description') {
            setDescription(event.target.value);
         } else if (event.target.name === 'password') {
                setPassword(event.target.value);
            }
        }
    

   const createReport = async(event) =>{
    event.preventDefault();
    try {
        const response = await axios.post('/api/reports', {
            title,
            location,
            description,
            password
        });
        setReports([...reports, response.data]);
    } catch(err){
    console.log(err);
    }
   } 

 return (

    <>
        <h1>Phenomena</h1>
        <ul>
            {
                reports.map((report)=>{
                    return <li>{report.title}</li>
                })
            }
        </ul>

        <form onSubmit={createReport}>
            <input value={ title } onChange={ onChange } name="title"></input>
            <input value={ location } onChange={ onChange } name='location'></input>
            <input value={ description } onChange={ onChange } name='description'></input>
            <input value={ password } onChange={ onChange } name='password'></input>
            <button >Create Report</button>
        </form>
    </>

)};



const root = document.getElementById('app')
createRoot(root)
