import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Galaxy from '../components/Galaxy ';
import BlurText from '../components/BlurText';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [likeLoading, setLikeLoading] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/quotes')
      .then(res => setQuotes(res.data.quotes || []))
      .catch(() => setError('Failed to load quotes'));
  }, []);

  const handleLike = async (id) => {
    setLikeLoading(l => ({ ...l, [id]: true }));
    try {
      await axios.post(`http://localhost:8000/quotes/${id}/like`, {}, { withCredentials: true });
      // Optionally, re-fetch quotes or update local state
      const res = await axios.get('http://localhost:8000/quotes');
      setQuotes(res.data.quotes || []);
    } catch {
      setError('Failed to like quote');
    }
    setLikeLoading(l => ({ ...l, [id]: false }));
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Navbar */}
      <nav
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '95%',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
          opacity: 100,
          zIndex: 10,
        }}
      >
        {/* Left: Icon and Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', justifyContent: 'center', marginLeft: '00px' }}>
          <span style={{ fontSize: '2.2rem', color: '#fff', marginTop:'-4px' }}>★</span>
          <span style={{
            fontFamily: "'Montserrat', 'Poppins', sans-serif",
            fontSize: '2.2rem',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.06em',
          }}>
            QuotesVerse
          </span>
        </div>
        {/* Right: Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px'}}>
          <span
            style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 500, cursor: 'pointer' }}
            onClick={() => navigate('/search')}
          >
            🔍︎ Search
          </span>
          <span
            style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 500, cursor: 'pointer' }}
            onClick={() => navigate('/profile')}
          >
            👤 Profile
          </span>
          <button
            onClick={() => navigate('/add-quote')}
            style={{
              padding: '8px 24px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(90deg,#00bcd4,#2196f3)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1.1rem',
              cursor: 'pointer',
              fontFamily: "'Montserrat', 'Poppins', sans-serif",
              boxShadow: '0 2px 12px #00bcd4',
            }}
          >
            + Add Quote
          </button>
        </div>
      </nav>
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
          left: '36%',
          transform: 'translateX(-50%)',
          width: '90vw',
          maxWidth: '900px',
          zIndex: 2,
        }}
      >
        <h1 style={{
          fontFamily: "'Montserrat', 'Poppins', sans-serif",
          fontSize: '3rem',
          fontWeight: 700,
          color: '#fff',
          marginBottom: '32px',
          letterSpacing: '0.05em',
          textShadow: '0 4px 32px #000',
          textAlign: 'center'
        }}>
          <BlurText text="All Quotes" delay={75} animateBy="words" direction="top" />
        </h1>
        {error && <div style={{ color: '#ff5252', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          alignItems: 'center',
        }}>
          {quotes.length === 0 && (
            <div style={{ color: '#e0e0e0', fontSize: '1.2rem' }}>No quotes found.</div>
          )}
          {quotes.map(q => (
            <div
              key={q._id}
              onClick={() => navigate(`/quote/${q._id}`)}
              style={{
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '18px',
                boxShadow: '0 2px 16px #00bcd4',
                padding: '28px 32px',
                width: '100%',
                maxWidth: '700px',
                color: '#fff',
                fontFamily: "'Montserrat', 'Poppins', sans-serif",
                position: 'relative',
                cursor: 'pointer', // Make it clear it's clickable
                transition: 'box-shadow 0.2s',
              }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '12px' }}>
                "{q.text}"
              </div>
              <div style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '18px' }}>
                — {q.author || 'Unknown'}
              </div>
              <button
                onClick={e => {
                  e.stopPropagation(); // Prevent navigation when liking
                  handleLike(q._id);
                }}
                disabled={likeLoading[q._id]}
                style={{
                  padding: '10px 32px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(90deg,#00bcd4,#2196f3)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  fontFamily: "'Montserrat', 'Poppins', sans-serif",
                  boxShadow: '0 2px 16px #00bcd4',
                  marginTop: '8px',
                  transition: 'opacity 0.2s',
                  opacity: likeLoading[q._id] ? 0.6 : 1,
                }}
              >
                {q.likes?.length || 0} {q.likes?.includes(/* userId */) ? 'Liked' : 'Like'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;