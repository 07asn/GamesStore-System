import React from 'react';
import ParticleBackground from '../components/ui/ParticleBackground';
import GlowingOrbs from '../components/register/GlowingOrbs';
import LeftSideContent from '../components/register/LeftSideContent';
import RegisterForm from '../components/register/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 overflow-hidden relative">
      <ParticleBackground />
      <GlowingOrbs />
      <main className="relative z-10 flex-grow flex items-center justify-center px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 w-full max-w-6xl">
          <LeftSideContent />
          <RegisterForm />
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
