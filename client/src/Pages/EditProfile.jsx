import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Galaxy from '../components/Galaxy ';
import BlurText from '../components/BlurText';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    profileImageUrl: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/check-auth', { withCredentials: true })
      .then(res => {
        const id = res.data.user?._id || res.data._id;
        setUserId(id);
        if (id) {
          axios.get(`http://localhost:8000/user/${id}`, { withCredentials: true })
            .then(res2 => {
              const user = res2.data.user || res2.data;
              setForm({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                profileImageUrl: user.profileImageUrl || ''
              });
            })
            .catch(() => setError('Failed to load user details'));
        }
      })
      .catch(() => setError('Not authenticated'));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.firstName.trim() || !form.lastName.trim() || !form.profileImageUrl.trim()) {
      setError('All fields are required.');
      return;
    }
    try {
      await axios.put(`http://localhost:8000/user/update/${userId}`, form, { withCredentials: true });
      setSuccess('Profile updated successfully!');
      setTimeout(() => navigate('/profile'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
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
          top: '40%',
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
            fontSize: '3rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '32px',
            letterSpacing: '0.05em',
            textShadow: '0 4px 32px #000',
          }}
        >
          <BlurText text="Edit Profile" delay={75} animateBy="words" direction="top" />
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
            boxShadow: '0 4px 32px #00bcd4',
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
            type="text"
            name="profileImageUrl"
            placeholder="Profile Image URL"
            value={form.profileImageUrl}
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
            Update Profile
          </button>
          {error && <div style={{ color: '#ff5252', marginTop: '8px', fontWeight: 500 }}>{error}</div>}
          {success && <div style={{ color: '#4caf50', marginTop: '8px', fontWeight: 500 }}>{success}</div>}
        </form>
        <div style={{ marginTop: '18px' }}>
          <span
            style={{ color: '#00bcd4', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
            onClick={() => navigate('/profile')}
          >
            ← Back to Profile
            </span>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;