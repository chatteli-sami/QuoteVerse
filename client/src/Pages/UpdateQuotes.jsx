import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Galaxy from '../components/Galaxy ';
import BlurText from '../components/BlurText';
import { useParams, useNavigate } from 'react-router-dom';

const categories = [
  "Motivation",
  "Love",
  "Friendship",
  "Wisdom",
  "Life",
  "Success",
  "Happiness",
  "Inspiration",
  "Humor",
  "Philosophy",
  "Education",
  "Courage",
  "Hope",
  "Creativity",
  "Other"
];

const UpdateQuotes = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    text: '',
    author: '',
    category: '',
    imgUrl: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/quotes/${id}`)
      .then(res => {
        const quote = res.data.quote || res.data;
        setForm({
          text: quote.text || '',
          author: quote.author || '',
          category: quote.category || '',
          imgUrl: quote.imgUrl || ''
        });
      })
      .catch(() => setError('Failed to load quote'));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.text.trim() || !form.author.trim() || !form.category.trim()) {
      setError('Text, Author, and Category are required.');
      return;
    }
    try {
      await axios.put(`http://localhost:8000/api/quotes/${id}`, form, { withCredentials: true });
      setSuccess('Quote updated successfully!');
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update quote');
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
            marginLeft:'595px',
          }}
        >
          <BlurText text="Update Quote" delay={75} animateBy="words" direction="top" />
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{
            background: 'rgba(0,0,0,0.7)',
            borderRadius: '24px',
            padding: '40px 32px',
            maxWidth: '340px',
            margin: '0 auto',
            marginTop: '45px',
            boxShadow: '0 4px 32px #00bcd4',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <input
            type="text"
            name="text"
            placeholder="Quote Text"
            value={form.text}
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
            name="author"
            placeholder="Author"
            value={form.author}
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
          <select
            name="category"
            value={form.category}
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
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            name="imgUrl"
            placeholder="Image URL (optional)"
            value={form.imgUrl}
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
            Update
          </button>
          {error && <div style={{ color: '#ff5252', marginTop: '8px', fontWeight: 500 }}>{error}</div>}
          {success && <div style={{ color: '#4caf50', marginTop: '8px', fontWeight: 500 }}>{success}</div>}
        </form>
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

export default UpdateQuotes