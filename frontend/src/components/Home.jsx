import React, { useEffect, useMemo, useState } from 'react';
import Search from './Search';
import Navbar from './Navbar';
import Prompts from './prompts/Prompts';
import axios from 'axios';
import SkeletonPromptcard from './SkeletonPromptcard';

const Home = () => {
  const URL = import.meta.env.VITE_API;
  const [prompts, setPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const api = useMemo(() => axios.create({
    baseURL: URL,
  }), []);

  useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true);
      try {
        const response = await api.get('/prompts');
        setPrompts(response.data);
        setFilteredPrompts(response.data);
      } catch (error) {
        console.error('Error fetching prompts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, [api]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.trim().toLowerCase();

    if (lowercasedQuery) {
      const filtered = prompts.filter(prompt =>
        (Array.isArray(prompt.tags) && prompt.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery))) ||
        (prompt.email && prompt.email.toLowerCase().includes(lowercasedQuery))
      );
      setFilteredPrompts(filtered);
    } else {
      setFilteredPrompts(prompts);
    }
  }, [searchQuery, prompts]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Navbar />
      <div>
        <div className='mt-16'>
          <h1 className='text-black font-extrabold text-center text-6xl'>
            Discover & Share
          </h1>
          <h1 className="text-6xl text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-orange-400 to-orange-500">
            Prompts
          </h1>
          <p className='text-gray-600 mt-6 text-xl text-center'>
            PromptLib is an open-source prompting tool for modern world to
          </p>
          <p className='text-gray-600 text-xl text-center'>
            discover, create and share creative prompts
          </p>
        </div>
        <div className='flex align-middle justify-center mt-12'>
          <Search onSearch={handleSearch} />
        </div>
        <div className="container mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-10">
              {Array(6).fill().map((_, index) => (
                <SkeletonPromptcard key={index} />
              ))}
            </div>
          ) : (
            <Prompts prompts={filteredPrompts} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
