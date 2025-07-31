import React, { useState } from 'react';
import axios from 'axios';
import Galaxy from '../components/Galaxy ';
import BlurText from '../components/BlurText';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async e => {
  e.preventDefault();
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    setError('Please enter a valid search term.');
    return;
  }

  setError('');
  setResults([]);

  try {
    const res = await axios.post(`http://localhost:8000/api/quotes/search?search=${encodeURIComponent(trimmedQuery)}`);

    if (res.data.quotes?.length > 0) {
      setResults(res.data.quotes);
    } else {
      setError(res.data.message || 'No quotes found.');
    }
  } catch (err) {
    const msg = err?.response?.data?.message || 'Failed to search quotes.';
    console.error('[Search.jsx Error]', msg);
    setError(msg);
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
          marginLeft:'200px',
          letterSpacing: '0.05em',
          textShadow: '0 4px 32px #000',
          textAlign: 'center'
        }}>
          <BlurText text="Search Quotes" delay={75} animateBy="words" direction="top" />
        </h1>
        <form
          onSubmit={handleSearch}
          style={{
            display: 'flex',
            gap: '18px',
            justifyContent: 'center',
            marginBottom: '32px',
          }}
        >
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type to search quotes..."
            style={{
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '1.1rem',
              fontFamily: "'Montserrat', 'Poppins', sans-serif",
              background: '#222',
              color: '#fff',
              outline: 'none',
              width: '60%',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '14px 32px',
              borderRadius: '14px',
              border: 'none',
              background: 'linear-gradient(90deg,#00bcd4,#2196f3)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.2rem',
              cursor: 'pointer',
              fontFamily: "'Montserrat', 'Poppins', sans-serif",
              boxShadow: '0 2px 16px #00bcd4',
            }}
          >
            Search
          </button>
        </form>
        {error && <div style={{ color: '#ff5252', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          alignItems: 'center',
        }}>
          {results.length === 0 && !error && (
            <div style={{ color: '#e0e0e0', fontSize: '1.2rem' }}>No results found.</div>
          )}
          {results.map(q => (
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
            </div>
          ))}
        </div>
      </div>
      {/* Back to Dashboard Link */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        <span
          style={{
            color: '#00bcd4',
            fontSize: '1.1rem',
            cursor: 'pointer',
            textDecoration: 'underline',
            fontWeight: 600,
            fontFamily: "'Montserrat', 'Poppins', sans-serif",
            opacity: 0.85,
          }}
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </span>
      </div>
    </div>
  );
};

export default Search;