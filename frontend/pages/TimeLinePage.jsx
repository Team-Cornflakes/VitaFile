import React from 'react';
import UploadCard from "../components/UploadCard.jsx";
import Header from '../components/Header'; // Adjust the path as per your file structure
import Sidebar from '../components/Sidebar'; // Adjust the path as per your file structure
import '../src/App.css';
import './TimeLinePage.css';

export default function MyComponent() {
    return (
        <div className="container">
             <Header/>
            <div className="Parent1">
                <UploadCard />
                <Sidebar /> 
            </div>
        </div>
    );
}