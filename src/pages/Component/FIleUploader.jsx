import React, { useState } from 'react';

const FileUploader = () => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    // Perform any further processing or upload logic here
  };

  return (
    <div
      className={`file-uploader ${dragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {file ? (
        <div>
          <p>File uploaded: {file.name}</p>
          <p>File size: {file.size} bytes</p>
        </div>
      ) : (
        <p>Drag and drop a file here</p>
      )}
    </div>
  );
};

export default FileUploader;