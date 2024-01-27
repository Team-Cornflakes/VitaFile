// LeftSection.js
import React from 'react'
import './DocumentViewer.css'
const LeftSection = ({ pdfUrl }) => {
  return (
    <div className="tleft-section">
      <iframe
        className="tpdf-document"
        src={pdfUrl}
        title="PDF Document"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default LeftSection;
