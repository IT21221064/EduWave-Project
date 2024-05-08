import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UploadCourse.css'; // Import CSS file

const UploadCourse = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [owner, setOwner] = useState(""); 
  const [file, setFile] = useState(null);
  const [videolink, setVideolink] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [errors, setErrors] = useState({}); // State to hold form validation errors

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
    const validationErrors = validateForm(); // Perform form validation
    if (Object.keys(validationErrors).length === 0) {
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
    } else {
      setErrors(validationErrors); // Set validation errors state
    }
  };

  // Function to validate form fields
  const validateForm = () => {
    let errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!description.trim()) {
      errors.description = "Description is required";
    }
    if (!price) {
      errors.price = "Price is required";
    } else if (isNaN(price) || price <= 0) {
      errors.price = "Price must be a valid positive number";
    }
    if (!videolink.trim()) {
      errors.videolink = "Video link is required";
    }
    if (!file) {
      errors.file = "Course preview image is required";
    }
    return errors;
  };

  return (
    <div className="course-upload-container">
      <form className="course-upload-form" onSubmit={handleSubmit}>
        <h3>Upload Course</h3>
        <div className="course-form-group">
          <label>Course ID :</label>
          <input  
            type="text"
            name="id"
            placeholder="ID"
            value={id}
            onChange={() => {}} // Disable input for ID
          
            disabled
          />
          {errors.id && <span className="error">{errors.id}</span>}
        </div>
        <div className="course-form-group">
          <label>Course Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter course name"
            value={name}
            onChange={handleInputChange}
           
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="course-form-group">
          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Enter course description"
            value={description}
            onChange={handleInputChange}
            
          ></textarea>
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <div className="course-form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            placeholder="Enter course price"
            value={price}
            onChange={handleInputChange}
           
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>
        <div className="course-form-group">
          <label>Course Preview:</label>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleFileChange}
            
          />
          {errors.file && <span className="error">{errors.file}</span>}
        </div>
        <div className="course-form-group">
          <label>Video Link:</label>
          <input
            type="text"
            name="videolink"
            placeholder="Enter video link"
            value={videolink}
            onChange={handleInputChange}
            
          />
          {errors.videolink && <span className="error">{errors.videolink}</span>}
        </div>
        <button className='course-button' type="submit">Upload</button> 
      </form>
      <div className="course-image-preview">
        {file ? (
          <img src={file} alt="Course preview" />
        ) : (
          <p>Course image upload preview will appear here!</p>
        )}
      </div>
    </div>
  );
};

export default UploadCourse;
