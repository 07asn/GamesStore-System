import React, { useEffect } from 'react';

const ParticleBackground = () => {
  useEffect(() => {
    const setupParticles = () => {
      const particleContainer = document.getElementById('particle-container');
      if (!particleContainer) return;

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        if (Math.random() > 0.5) {
          particle.style.backgroundColor = 'rgba(223, 191, 0, 0.3)';
        } else {
          particle.style.backgroundColor = 'rgba(100, 100, 100, 0.3)';
        }
        particleContainer.appendChild(particle);
      }
    };

    setupParticles();
  }, []);

  return <div id="particle-container" className="absolute inset-0 z-0"></div>;
};

export default ParticleBackground;

