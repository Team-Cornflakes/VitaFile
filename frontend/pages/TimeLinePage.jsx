import React from 'react';
import UploadCard from "../components/UploadCard.jsx";
import Header from '../components/Header'; // Adjust the path as per your file structure
import Sidebar from '../components/Sidebar'; // Adjust the path as per your file structure
import '../src/App.css';

export default function MyComponent() {
    return (
        <>
            <Header/>
            <UploadCard />
            <Sidebar /> 
        </>
    );
}