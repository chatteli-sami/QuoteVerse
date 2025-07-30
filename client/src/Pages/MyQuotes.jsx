import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Galaxy from '../components/Galaxy ';
import BlurText from '../components/BlurText';
import { useNavigate } from 'react-router-dom';

const MyQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/check-auth', { withCredentials: true })
      .then(res => {
        const id = res.data.user?._id || res.data._id;
        setUserId(id);
        if (id) {
          axios.get(`http://localhost:8000/quotes/user/${id}`, { withCredentials: true })
            .then(res2 => setQuotes(res2.data.quotes || []))
            .catch(() => setError('Failed to load your quotes'));
        }
      })
      .catch(() => setError('Not authenticated'));
  }, []);

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
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90vw',
          maxWidth: '700px',
          zIndex: 2,
        }}
      >
        <h1 style={{
          fontFamily: "'Montserrat', 'Poppins', sans-serif",
          fontSize: '2.5rem',
          fontWeight: 700,
          color: '#fff',
          marginBottom: '32px',
          letterSpacing: '0.05em',
          textShadow: '0 4px 32px #000',
          textAlign: 'center'
        }}>
          <BlurText text="My Quotes" delay={75} animateBy="words" direction="top" />
        </h1>
        {error && <div style={{ color: '#ff5252', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          alignItems: 'center',
        }}>
          {quotes.length === 0 && !error && (
            <div style={{ color: '#e0e0e0', fontSize: '1.2rem' }}>You have not added any quotes yet.</div>
          )}
          {quotes.map(q => (
            <div
              key={q._id}
              onClick={() => navigate(`/quote/${q._id}`)}
              style={{
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '18px',
                boxShadow: '0 2px 16px #00bcd4',
                padding: '20px 24px',
                width: '100%',
                color: '#fff',
                fontFamily: "'Montserrat', 'Poppins', sans-serif",
                position: 'relative',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
              }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>
                "{q.text}"
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.8 }}>
                — {q.author || 'Unknown'}
              </div>
              <div style={{ fontSize: '0.95rem', color: '#00bcd4', marginTop: '6px' }}>
                Category: {q.category}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '32px' }}>
          <span
            style={{
              color: '#00bcd4',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontWeight: 600,
              fontFamily: "'Montserrat', 'Poppins', sans-serif",
              opacity: 0.85,
            }}
            onClick={() => navigate('/profile')}
          >
            ← Back to Profile
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyQuotes