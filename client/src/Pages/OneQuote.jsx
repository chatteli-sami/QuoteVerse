import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Galaxy from '../components/Galaxy ';
import BlurText from '../components/BlurText';
import { useParams, useNavigate } from 'react-router-dom';

const OneQuote = () => {
  const { id } = useParams();
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState('');
  const [favLoading, setFavLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/quotes/${id}`)
      .then(res => setQuote(res.data.quote || res.data))
      .catch(() => setError('Failed to load quote'));
  }, [id]);

  const handleAddFavorite = async () => {
    setFavLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post(`http://localhost:8000/user/favorite-quote/add/${id}`, {}, { withCredentials: true });
      setSuccess('Added to favorites!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add to favorites');
    }
    setFavLoading(false);
  };

  const handleRemoveFavorite = async () => {
    setRemoveLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post(`http://localhost:8000/user/favorite-quote/remove/${id}`, {}, { withCredentials: true });
      setSuccess('Removed from favorites!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove from favorites');
    }
    setRemoveLoading(false);
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
              padding: '28px 32px',
              maxWidth: '500px',
              margin: '0 auto',
              color: '#fff',
              fontFamily: "'Montserrat', 'Poppins', sans-serif",
              position: 'relative',
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
            <div style={{ display: 'flex', gap: '18px', justifyContent: 'center', marginTop: '18px' }}>
              <button
                onClick={handleAddFavorite}
                disabled={favLoading}
                style={{
                  padding: '10px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(90deg,#00bcd4,#2196f3)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  fontFamily: "'Montserrat', 'Poppins', sans-serif",
                  boxShadow: '0 2px 16px #00bcd4',
                  opacity: favLoading ? 0.6 : 1,
                }}
              >
                Add to Favorites
              </button>
              <button
                onClick={handleRemoveFavorite}
                disabled={removeLoading}
                style={{
                  padding: '10px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(90deg,#ff5252,#ff9800)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  fontFamily: "'Montserrat', 'Poppins', sans-serif",
                  boxShadow: '0 2px 16px #ff5252',
                  opacity: removeLoading ? 0.6 : 1,
                }}
              >
                Remove from Favorites
              </button>
              {/* Edit Quote Button */}
              <button
                onClick={() => navigate(`/update-quote/${quote._id}`)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(90deg,#2196f3,#00bcd4)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  fontFamily: "'Montserrat', 'Poppins', sans-serif",
                  boxShadow: '0 2px 16px #2196f3',
                }}
              >
                Edit Quote
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