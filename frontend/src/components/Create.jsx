import React, { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
  const [prompt, setPrompt] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API;
  const api = useMemo(() => axios.create({
    baseURL: URL,
  }), [URL]);

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPrompt = { prompt, tags };
    const email = localStorage.getItem('email');
    if(email){
      if (prompt !== '') {
        try {
          const response = await api.post('/prompts/create', {
            prompt: newPrompt.prompt,
            tags: newPrompt.tags,
            email: email
          });
          if (response.status === 201) {
            navigate('/');
          }
        } catch (error) {
          console.error('Error creating prompt:', error);
        }
      } else {
        alert('Please enter a prompt');
      }
    }else{
      alert('Please login first')
      navigate('/')
    }
  };

  return (
    <>
      <Navbar inCreatePage='true' />
      <div className="container my-16 mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text">
          Create Post
        </h1>
        <p className="text-gray-500 mb-8 text-lg md:text-xl mt-4">
          Create and share amazing prompts with the world, and let your imagination run wild.
        </p>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-9">
            <label htmlFor="prompt" className="block text-gray-700 text-lg font-semibold mb-2">
              Your Prompt
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Write your prompt here..."
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="4"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="tag" className="block text-gray-700 text-lg font-semibold mb-2">
              Tag (#webdevelopment, #idea, #web3)
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="tag"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="#tag"
                className="flex-grow px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap mt-2">
              {tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm mr-2 mb-2 flex items-center">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 focus:outline-none"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 text-gray-600 rounded-full hover:bg-gray-100 focus:outline-none mr-2"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
