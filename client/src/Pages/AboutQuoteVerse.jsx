import React from 'react';
import Galaxy from '../components/Galaxy ';
import BlurText from '../components/BlurText';

const AboutQuoteVerse = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Galaxy 
        mouseRepulsion={false}
        mouseInteraction={false}
        density={1.5}
        glowIntensity={0.25}
        saturation={0.9}
        hueShift={180}
      />

      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90vw',
          maxWidth: '800px',
          zIndex: 2,
          color: '#fff',
          fontFamily: "'Montserrat', 'Poppins', sans-serif",
          textAlign: 'center',
        }}
      >
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: 700,
          marginBottom: '24px',
          letterSpacing: '0.05em',
          textShadow: '0 4px 32px #000',
          marginLeft: '175px', 
        }}>
          <BlurText text="About QuoteVerse" delay={75} animateBy="words" direction="top" />
        </h1>

        <p style={{
          fontSize: '1.15rem',
          opacity: 0.9,
          lineHeight: '1.8',
          padding: '0 16px',
          textShadow: '0 2px 12px #000',
        }}>
          QuoteVerse is a full-stack, animated and interactive web experience — designed to elevate how users discover, collect, and explore powerful quotes. Featuring user profiles, smart recommendations, category filtering, and rich visual effects like 3D backgrounds and animated text, this platform merges clean MERN architecture with compelling UI/UX.
        </p>

        <div style={{
          marginTop: '40px',
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap',
        }}>
          <a 
            href="https://github.com/chatteli-sami/QuoteVerse" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              padding: '10px 22px',
              borderRadius: '12px',
              background: 'linear-gradient(90deg,#00bcd4,#2196f3)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1.1rem',
              textDecoration: 'none',
              boxShadow: '0 2px 12px #00bcd4',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            GitHub
          </a>

          <a 
            href="https://www.linkedin.com/in/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              padding: '10px 22px',
              borderRadius: '12px',
              background: 'linear-gradient(90deg,#2196f3,#3f51b5)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1.1rem',
              textDecoration: 'none',
              boxShadow: '0 2px 12px #2196f3',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            LinkedIn
          </a>

          <a 
            href="https://twitter.com/yourhandle" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              padding: '10px 22px',
              borderRadius: '12px',
              background: 'linear-gradient(90deg,#1da1f2,#0d47a1)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1.1rem',
              textDecoration: 'none',
              boxShadow: '0 2px 12px #1da1f2',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Twitter
          </a>
        </div>

        <button
          onClick={() => window.location.href = '/'}
          style={{
            marginTop: '32px',
            padding: '10px 24px',
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: '12px',
            background: 'linear-gradient(90deg,#00c9a7,#3cd3ad)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 12px #00c9a7',
            transition: 'transform 0.2s ease-in-out',
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
};

export default AboutQuoteVerse;
