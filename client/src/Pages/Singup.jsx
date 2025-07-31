import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Galaxy from '../components/Galaxy ';
import BlurText from '../components/BlurText';
import { useNavigate } from 'react-router-dom';

const Singup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImageUrl: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
    setSuccess('');
  }, [form.firstName, form.lastName, form.email, form.password, form.confirmPassword, form.profileImageUrl]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.password || !form.confirmPassword || !form.profileImageUrl.trim()) {
      return "All fields are required.";
    }
    if (form.password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (form.password !== form.confirmPassword) {
      return "Passwords do not match.";
    }
    // Simple email regex
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      return "Invalid email address.";
    }
    return "";
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('http://localhost:8000/api/register', form, { withCredentials: true });
      setSuccess('Registration successful!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Galaxy 
        mouseRepulsion={false}
        mouseInteraction={false}
        density={1.6}
        glowIntensity={0.3}
        saturation={0.8}
        hueShift={150}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%',
          zIndex: 2,
        }}
      >
        <h1
          style={{
            fontFamily: "'Montserrat', 'Poppins', sans-serif",
            fontSize: '4rem',
            marginLeft:'42%',
            marginTop: '15px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '32px',
            letterSpacing: '0.05em',
            textShadow: '0 4px 32px #000',
          }}
        >
          <BlurText text="Sign Up" delay={75} animateBy="words" direction="top" />
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{
            background: 'rgba(0,0,0,0.7)',
            borderRadius: '24px',
            padding: '40px 32px',
            maxWidth: '340px',
            margin: '0 auto',
            marginTop: '-30px',
            boxShadow: '0 4px 32px #000',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
            style={{
              padding: '12px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '1.1rem',
              fontFamily: "'Montserrat', 'Poppins', sans-serif",
              background: '#222',
              color: '#fff',
              outline: 'none',
            }}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
            style={{
              padding: '12px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '1.1rem',
              fontFamily: "'Montserrat', 'Poppins', sans-serif",
              background: '#222',
              color: '#fff',
              outline: 'none',
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              padding: '12px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '1.1rem',
              fontFamily: "'Montserrat', 'Poppins', sans-serif",
              background: '#222',
              color: '#fff',
              outline: 'none',
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              padding: '12px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '1.1rem',
              fontFamily: "'Montserrat', 'Poppins', sans-serif",
              background: '#222',
              color: '#fff',
              outline: 'none',
            }}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            style={{
              padding: '12px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '1.1rem',
              fontFamily: "'Montserrat', 'Poppins', sans-serif",
              background: '#222',
              color: '#fff',
              outline: 'none',
            }}
          />
          <input
            type="text"
            name="profileImageUrl"
            placeholder="Profile Image URL"
            value={form.profileImageUrl}
            onChange={handleChange}
            style={{
              padding: '12px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '1.1rem',
              fontFamily: "'Montserrat', 'Poppins', sans-serif",
              background: '#222',
              color: '#fff',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '14px',
              borderRadius: '14px',
              border: 'none',
              background: 'linear-gradient(90deg,#00bcd4,#2196f3)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.2rem',
              cursor: 'pointer',
              fontFamily: "'Montserrat', 'Poppins', sans-serif",
              boxShadow: '0 2px 16px #00bcd4',
              marginTop: '8px',
            }}
          >
            Register
          </button>
          {error && <div style={{ color: '#ff5252', marginTop: '8px', fontWeight: 500 }}>{error}</div>}
          {success && <div style={{ color: '#4caf50', marginTop: '8px', fontWeight: 500 }}>{success}</div>}
        </form>
        {/* Sign In Link */}
        <div style={{ marginTop: '50px' }}>
          <span style={{ color: '#e0e0e0', fontSize: '1rem' }}>
            Already have an account?{' '}
            <span
              style={{ color: '#00bcd4', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
              onClick={() => navigate('/signin')}
            >
              Sign In
            </span>
          </span>
        </div>
      </div>
      {/* Bottom Home Link */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        <span
          style={{
            color: '#fff',
            fontSize: '1.1rem',
            cursor: 'pointer',
            textDecoration: 'underline',
            fontWeight: 600,
            fontFamily: "'Montserrat', 'Poppins', sans-serif",
            opacity: 0.8,
          }}
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </span>
      </div>
    </div>
  );
};

export default Singup;