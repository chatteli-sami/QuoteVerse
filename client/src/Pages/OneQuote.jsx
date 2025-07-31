import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Galaxy from '../components/Galaxy ';
import BlurText from '../components/BlurText';
import { useParams, useNavigate } from 'react-router-dom';

const OneQuote = () => {
  const { id } = useParams();
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/quotes/${id}`)
      .then(res => setQuote(res.data.quote || res.data))
      .catch(() => setError('Failed to load quote'));
  }, [id]);

  const handleFavorite = () => {
    axios.patch(`http://localhost:8000/api/quotes/${id}/favorite`)
      .then(() => {
        alert('Quote marked as favorite!');
        setIsFavorited(true);
      })
      .catch(err => {
        console.error('Failed to favorite Quote:', err);
        alert('Favorite action failed.');
      });
  };

  const handleDeleteQuote = async () => {
    if (!window.confirm('Are you sure you want to delete this quote?')) return;
    setDeleteLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.delete(`http://localhost:8000/api/quotes/${id}`, { withCredentials: true });
      setSuccess('Quote deleted successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete quote');
    }
    setDeleteLoading(false);
  };

  return (
    <div style={{ width: '100vw', height: '150vh', position: 'relative', overflow: 'auto' }}>
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
            marginLeft:'600px',
            marginBottom: '32px',
            letterSpacing: '0.05em',
            textShadow: '0 4px 32px #000',
          }}
        >
          <BlurText text="Quote Details" delay={75} animateBy="words" direction="top" />
        </h1>
        {error && <div style={{ color: '#ff5252', marginBottom: '16px', fontWeight: 500 }}>{error}</div>}
        {success && <div style={{ color: '#4caf50', marginBottom: '16px', fontWeight: 500 }}>{success}</div>}
        {quote && (
          <div
            style={{
              background: 'rgba(0,0,0,0.7)',
              borderRadius: '18px',
              boxShadow: '0 2px 16px #00bcd4',
              padding: '40px 48px',
              maxWidth: '680px',
              margin: '0 auto',
              color: '#fff',
              fontFamily: "'Montserrat', 'Poppins', sans-serif",
              position: 'relative',
              lineHeight: '1.6',
            }}
          >
            <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '12px' }}>
              "{quote.text}"
            </div>
            <div style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '8px' }}>
              — {quote.author || 'Unknown'}
            </div>
            <div style={{ fontSize: '1rem', marginBottom: '8px', color: '#00bcd4' }}>
              Category: {quote.category}
            </div>
            {quote.imgUrl && (
              <img
                src={quote.imgUrl}
                alt="Quote"
                style={{
                  maxWidth: '100%',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  boxShadow: '0 2px 12px #00bcd4',
                }}
              />
            )}
            <div style={{ display: 'flex', gap: '18px', justifyContent: 'center', marginTop: '18px', flexWrap: 'wrap' }}>
              <button
                onClick={handleFavorite}
                disabled={isFavorited}
                style={{
  padding: '8px 16px',
  borderRadius: '10px',
  border: 'none',
  background: isFavorited ? '#555' : '#007BFF', // adjust per button
  color: '#fff',
  fontWeight: 600,
  fontSize: '0.95rem',
  cursor: 'pointer',
  fontFamily: "'Montserrat', 'Poppins', sans-serif",
  boxShadow: '0 2px 10px #00bcd4',
}}
              >
                {isFavorited ? '❤️ Favorited' : '💙 Favorite This Quote'}
              </button>
              <button
                onClick={() => navigate(`/update-quote/${quote._id}`)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(90deg,#2196f3,#00bcd4)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  fontFamily: "'Montserrat', 'Poppins', sans-serif",
                  boxShadow: '0 2px 10px #2196f3',
                }}
              >
                Edit Quote
              </button>
              <button
                onClick={handleDeleteQuote}
                disabled={deleteLoading}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(90deg,#f44336,#e91e63)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  fontFamily: "'Montserrat', 'Poppins', sans-serif",
                  boxShadow: '0 2px 10px #f44336',
                  opacity: deleteLoading ? 0.6 : 1,
                }}
              >
                Delete Quote
              </button>
            </div>
          </div>
        )}
        <div style={{ marginTop: '18px' }}>
          <span
            style={{ color: '#00bcd4', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
            onClick={() => navigate('/dashboard')}
          >
            ← Back to Dashboard
          </span>
        </div>
      </div>
    </div>
  );
};

export default OneQuote;
