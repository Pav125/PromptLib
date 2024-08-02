import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './Navbar';
import Prompts from './prompts/Prompts';
import axios from 'axios';

const Profile = () => {
  const URL = import.meta.env.VITE_API;
  const [prompts, setPrompts] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  const api = useMemo(() => axios.create({
    baseURL: URL,
  }), [URL]);

  useEffect(() => {
    const fetchUserEmail = () => {
      const email = localStorage.getItem('email');
      if (email) {
        setUserEmail(email);
      }
    };

    const fetchPrompts = async () => {
      if (userEmail) {
        try {
          const response = await api.get('/prompts/user-prompts', {
            params: { email: userEmail }
          });
          setPrompts(response.data);
        } catch (error) {
          console.error('Failed to fetch user prompts:', error);
        }
      }
    };

    fetchUserEmail();
    fetchPrompts();
  }, [api, userEmail]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className='text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text pb-4 bg-gradient-to-r from-blue-500 to-cyan-500'>
          My Profile
        </h1>
        <p className='text-lg md:text-xl text-gray-500 mb-8'>
          Welcome to your personalized profile page
        </p>
        <div>
          <Prompts prompts={prompts} />
        </div>
      </div>
    </>
  );
}

export default Profile;
