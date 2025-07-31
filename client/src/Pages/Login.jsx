import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Galaxy from '../components/Galaxy ';
import BlurText from '../components/BlurText';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
    setSuccess('');
  }, [form.email, form.password]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('http://localhost:8000/api/login', form, { withCredentials: true });
      setSuccess('Login successful!');
      navigate('/dashboard');
      // Redirect or handle login here
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
            fontSize: '4rem',
            marginLeft:'42%',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '32px',
            letterSpacing: '0.05em',
            textShadow: '0 4px 32px #000',
          }}
        >
          <BlurText text="Sign In" delay={75} animateBy="words" direction="top" />
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
            gap: '22px',
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              padding: '14px',
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
              padding: '14px',
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
            Login
          </button>
          {error && <div style={{ color: '#ff5252', marginTop: '8px', fontWeight: 500 }}>{error}</div>}
          {success && <div style={{ color: '#4caf50', marginTop: '8px', fontWeight: 500 }}>{success}</div>}
        </form>
        {/* Sign Up Link */}
        <div style={{ marginTop: '18px' }}>
          <span style={{ color: '#e0e0e0', fontSize: '1rem' }}>
            Don't have an account?{' '}
            <span
              style={{ color: '#00bcd4', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
              onClick={() => navigate('/signup')}
            >
              Sign Up
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
            marginTop:'-150px',
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

export default Login;