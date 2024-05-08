import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    username: '',
    pw: ''
});

const { Name, email, username, pw } = formData;
const navigate = useNavigate();

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      const response = await fetch('http://localhost:4000/api/Tutor', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              Name: formData.Name,
              email: formData.email,
              username: formData.username,
              pw: formData.pw
          })
      });

      if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || 'Failed to register learner');
      }

      const data = await response.json();
      console.log('Learner registered successfully:', data);
      navigate('/slogin');
  } catch (error) {
      console.error('Error registering learner:', error.message);
  }
};



return (
    <div>
        <h2>Register as a Learner</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="Name" value={Name} onChange={handleChange} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={handleChange} />
            </div>
            <div>
                <label>Username:</label>
                <input type="text" name="username" value={username} onChange={handleChange} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="pw" value={pw} onChange={handleChange} />
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
);
}

export default SignupPage;
