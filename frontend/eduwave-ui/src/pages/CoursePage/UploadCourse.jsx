import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadCourse = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [owner, setOwner] = useState(""); 
  const [file, setFile] = useState(null);
  const [videolink, setVideolink] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    // Fetch owner from localStorage
    const ownerFromLocalStorage = localStorage.getItem('username');
    if (ownerFromLocalStorage) {
      setOwner(ownerFromLocalStorage);
    }
  }, []); // Run once when the component mounts

  useEffect(() => {
    generateUniqueId();
  }, []); // Run once when the component mounts

  const generateUniqueId = async () => {
    try {
      // Fetch existing course IDs from the database
      const response = await axios.get('http://localhost:5002/api/course');
      const existingIds = response.data.map(course => course.id);

      // Generate a random 4-digit number for the course ID
      let newId;
      do {
        newId = Math.floor(1000 + Math.random() * 9000).toString();
      } while (existingIds.includes(newId)); // Repeat until a unique ID is generated

      setId(newId);
    } catch (error) {
      console.error('Error generating unique ID:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'price':
        setPrice(parseFloat(value)); 
        break;
      case 'owner':
        setOwner(value);
        break;
      case 'videolink':
        setVideolink(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFile(reader.result);
      };
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAvailable(false);
    try {
      const response = await axios.post('http://localhost:5002/api/course', { id, name, description, price, isAvailable, owner, videolink, file }, {
        timeout: 100000 
      });

      console.log(response); // Handle response data as needed

      // Optionally, reset the form fields after successful submission
      setName('');
      setDescription('');
      setPrice('');
      setOwner('');
      setFile(null);
      setVideolink('');

      // Generate a new unique ID for the next course
      generateUniqueId();
    } catch (error) {
      console.error('Error adding course:', error);
      // Handle error state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Upload Course</h3>
      <input
        type="text"
        name="id"
        placeholder="ID"
        value={id}
        onChange={() => {}} // Disable input for ID
        required
        disabled
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={description}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={price}
        onChange={handleInputChange}
        required
      />
      <input
        type="file"
        name="file"
        accept="image/*"
        onChange={handleFileChange}
        required
      />
      <input
        type="text"
        name="owner"
        placeholder="Owner"
        value={owner}
        onChange={handleInputChange}
        required
        disabled
      />
      <input
        type="text"
        name="videolink"
        placeholder="Videolink"
        value={videolink}
        onChange={handleInputChange}
        required
      />
      {file ? (
        <>
          <img src={file} alt="Course preview" />
        </>
      ) : (
        <p>Course image upload preview will appear here!</p>
      )}
      <button type="submit">Upload</button> 
    </form>
  );
};

export default UploadCourse;
