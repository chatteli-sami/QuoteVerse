import React from 'react'
import Galaxy from '../components/Galaxy '
import BlurText from '../components/BlurText';
import StarBorder from '../components/StarBorder';
import { useNavigate } from 'react-router-dom';

const FirstPage = () => {
    const navigate = useNavigate();

    const handleAnimationComplete = () => {
        console.log('Animation completed!');
    };

    const handleGetStarted = () => {
        navigate('/dashboard');
    };

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Navbar */}
            <nav
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '72px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 48px',
                    opacity: 100, // fully transparent
                    zIndex: 10,
                }}
            >
                {/* Left: Icon and Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px', justifyContent: 'center' }}>
                    <span style={{ fontSize: '2.2rem', color: '#fff', marginTop:'-4px' }}>★</span>
                    <span style={{
                        fontFamily: "'Montserrat', 'Poppins', sans-serif",
                        fontSize: '2.2rem',
                        fontWeight: 700,
                        color: '#fff',
                        letterSpacing: '0.06em',
                    }}>
                        QuoteVerse
                    </span>
                </div>
                {/* Right: Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
                    <a href="/" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 500 }}>Home</a>
                    <a href="#about" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 500 }}>About</a>
                    <a href="#service" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 500 }}>Service</a>
                </div>
            </nav>
            {/* Main Content */}
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
                    left: '49%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    width: '100%',
                    zIndex: 2,
                }}
            >
                <h1
                  style={{
                    fontFamily: "'Montserrat', 'Poppins', sans-serif",
                    fontSize: '5rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '32px',
                    marginLeft: '530px',
                    letterSpacing: '0.05em',
                    textShadow: '0 4px 32px #000',
                  }}
                >
                  <BlurText
                    text="QuoteVerse"
                    delay={75}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                  />
                </h1>
                <p style={{
                    marginTop: '-50px',
                    color: '#e0e0e0',
                    fontSize: '1.4rem',
                    fontWeight: 400,
                    letterSpacing: '0.03em',
                    textShadow: '0 2px 16px #000',
                    fontFamily: "'Montserrat', 'Poppins', sans-serif",
                }}>
                    Where words become worlds.<br />
                    <span style={{ opacity: 0.8 }}>
                      Something extraordinary is about to unfold.<br />
                      Are you ready to unlock the universe of inspiration?
                    </span>
                </p>

                <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
                  <StarBorder
                    as="button"
                    className="custom-class"
                    color="white"
                    speed="3.5s"
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </StarBorder>
                </div>
            </div>
        </div>
    )
}

export default FirstPage