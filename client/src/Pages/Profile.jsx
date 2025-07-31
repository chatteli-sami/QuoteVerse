import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Galaxy from '../components/Galaxy ';
import BlurText from '../components/BlurText';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
      .then(res => {
        const userId = res.data.user?._id || res.data._id;
        if (userId) {
          axios.get(`http://localhost:8000/api/user/${userId}`, { withCredentials: true })
            .then(res2 => setUser(res2.data.user || res2.data))
            .catch(() => setError('Failed to load user details'));
        } else {
          setError('User not found');
        }
      })
      .catch(() => setError('Not authenticated'));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true });
      navigate('/signin');
    } catch {
      setError('Logout failed');
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
          width: '100%',
          maxWidth: '650px', // Larger card
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
            textAlign: 'center'
          }}
        >
          <BlurText text="Profile" delay={75} animateBy="words" direction="top" />
        </h1>
        {error && <div style={{ color: '#ff5252', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
        {user && (
          <div
            style={{
              background: 'rgba(0,0,0,0.75)',
              borderRadius: '32px',
              boxShadow: '0 8px 48px #00bcd4',
              padding: '48px 40px',
              color: '#fff',
              fontFamily: "'Montserrat', 'Poppins', sans-serif",
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              minHeight: '420px',
            }}
          >
            <img
              src={user.profileImageUrl}
              alt="Profile"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '24px',
                boxShadow: '0 2px 16px #00bcd4',
                border: '4px solid #00bcd4',
              }}
            />
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>
              {user.firstName} {user.lastName}
            </div>
            <div style={{ fontSize: '1.2rem', opacity: 0.85, marginBottom: '24px' }}>
              {user.email}
            </div>
            {/* Right Buttons */}
            <div style={{
              position: 'absolute',
              right: '-0px',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}>
              <button
                onClick={() => navigate('/myquotes')}
                style={{
                  padding: '10px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(90deg,#00bcd4,#2196f3)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontFamily: "'Montserrat', 'Poppins', sans-serif",
                  boxShadow: '0 1x 6px #00bcd4',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                📝 My Quotes
              </button>
            </div>
            {/* Bottom Buttons */}
            <div style={{
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
              marginTop: '48px',
            }}>
              <button
                onClick={() => navigate('/edit-profile')}
                style={{
                  padding: '10px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(90deg,#2196f3,#00bcd4)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontFamily: "'Montserrat', 'Poppins', sans-serif",
                  boxShadow: '0 2px 12px #2196f3',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                ✏️ Edit Profile
              </button>
              <button
                onClick={handleLogout}
                style={{
                  padding: '10px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(90deg,#ff5252,#ff9800)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontFamily: "'Montserrat', 'Poppins', sans-serif",
                  boxShadow: '0 2px 12px #ff5252',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                🚪 Logout
              </button>
            </div>
            {/* Back to Dashboard Link */}
            <div style={{ marginTop: '38px' }}>
              <span
                style={{
                  color: '#00bcd4',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: 600,
                  fontFamily: "'Montserrat', 'Poppins', sans-serif",
                  fontSize: '1.15rem',
                  opacity: 0.85,
                }}
                onClick={() => navigate('/dashboard')}
              >
                ← Back to Dashboard
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;