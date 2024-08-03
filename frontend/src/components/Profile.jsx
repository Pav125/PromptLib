import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './Navbar';
import Prompts from './prompts/Prompts';
import axios from 'axios';
import SkeletonPromptcard from './SkeletonPromptcard';

const Profile = () => {
  const URL = import.meta.env.VITE_API;
  const [prompts, setPrompts] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

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
        setLoading(true);
        try {
          const response = await api.get('/prompts/user-prompts', {
            params: { email: userEmail }
          });
          setPrompts(response.data);
        } catch (error) {
          console.error('Failed to fetch user prompts:', error);
        } finally {
          setLoading(false);
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
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-10">
              {Array(6).fill().map((_, index) => (
                <SkeletonPromptcard key={index} />
              ))}
            </div>
          ) : (
            <Prompts prompts={prompts} />
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
