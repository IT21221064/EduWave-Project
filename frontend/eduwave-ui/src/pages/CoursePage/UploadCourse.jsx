import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

const UploadCourse = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [owner, setOwner] = useState(""); 
  const [file, setFile] = useState(null);
  const [videolink, setVideolink] = useState("");
  const [isAvailable, setIsAvailable] = useState(false); // State for the uploaded file

  useEffect(() => {
    // Fetch owner from localStorage
    const ownerFromLocalStorage = localStorage.getItem('username');
    if (ownerFromLocalStorage) {
      setOwner(ownerFromLocalStorage);
    }
  }, []); // Run once when the component mounts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'id':
        setId(value);
        break;
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
      setId('');
      setName('');
      setDescription('');
      setPrice('');
      setOwner('');
      setFile(null);
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
        onChange={handleInputChange}
        required
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
        disabled // Disable the owner input field since it's fetched from localStorage
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
          <img src={file} alt="error!" />
        </>
      ) : (
        <p>Course image upload preview will appear here!</p>
      )}
      <button type="submit">Upload</button> 
    </form>
  );
};

export default UploadCourse;
