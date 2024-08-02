import React, { useEffect, useMemo, useState } from 'react';
import Search from './Search';
import Navbar from './Navbar';
import Prompts from './prompts/Prompts';
import axios from 'axios';

const Home = () => {
  const URL = import.meta.env.VITE_API;
  const [prompts, setPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const api = useMemo(() => axios.create({
    baseURL: URL,
  }), []);

  useEffect(() => {
    const fetchPrompts = async() => {
      const response = await api.get('/prompts');
      setPrompts(response.data);
      setFilteredPrompts(response.data);
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
        <div>
          <Prompts prompts={filteredPrompts} />
        </div>
      </div>
    </>
  );
};

export default Home;
