// components/VerifyEmail.jsx
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState('Verifying...');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:5000/api/users/verify-email?token=${token}`)
        .then((response) => {
          setMessage(response.data.message || 'Email verified successfully!');
        })
        .catch((error) => {
          setMessage(error.response?.data?.message || 'Verification failed.');
        });
    } else {
      setMessage('Token is missing.');
    }
  }, [token]);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center">{message}</h1>
    </div>
  );
};

export default VerifyEmail;
