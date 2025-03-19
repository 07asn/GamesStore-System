import React, { useState } from 'react';
import ParticleBackground from '../components/ui/ParticleBackground';
import FeatureList from '../components/login/FeatureCard';
import LoginForm from '../components/login/LoginForm';
import ActionLinks from '../components/login/ActionLinks';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#2A2A2A] overflow-hidden relative">
      <ParticleBackground />

      <main className="relative z-10 flex-grow flex items-center justify-center px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 w-full max-w-6xl">
          {/* Left Side - Features */}
          <div className="hidden md:block md:col-span-2 space-y-8">
            <h1 className="text-4xl font-bold mb-3">
              <span className="text-[#2A2A2A]">Gaming </span>
              <span className="text-[#DFBF00]">Reimagined</span>
            </h1>
            <p className="text-[#818181] text-lg leading-relaxed">
              The ultimate gaming platform designed with players in mind. Join our community of millions today.
            </p>

            <FeatureList />
            <ActionLinks />
          </div>

          {/* Right Side - Form Card */}
          <div className="col-span-1 md:col-span-3">
            <LoginForm
              loading={loading}
              formState={formState}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
