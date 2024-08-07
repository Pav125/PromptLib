import React, { useState, useEffect, useMemo } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import icon from '../assets/icon.png';
import { Menu } from 'lucide-react'; // Import the Menu icon

const Navbar = ({ inCreatePage }) => {
  const [isLogged, setLog] = useState(false);
  const [isLoading, setLoad] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_API;

  const api = useMemo(() => axios.create({
    baseURL: URL,
  }), [URL]);

  // Function to fetch user info from Google's API
  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { email, name, picture } = response.data;
      localStorage.setItem('email', email);
      localStorage.setItem('name', name);
      localStorage.setItem('picture', picture);
      localStorage.setItem('userData', JSON.stringify(response.data));
      setUserInfo(response.data);
      setLog(true);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      navigate('/')
    }
  };

  // Check local storage for token and fetch user info if it exists
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchUserInfo(token);
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Save the access token to local storage
        localStorage.setItem('access_token', tokenResponse.access_token);
        // Fetch user information
        await fetchUserInfo(tokenResponse.access_token);
        const response = await api.post('/auth/signin', {
          email: localStorage.getItem('email'),
          name: localStorage.getItem('name'),
          picture: localStorage.getItem('picture')
        });
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        setLoad(false);
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
      setLoad(false);
    }
  });

  const logout = () => {
    googleLogout();
    navigate('/')
    localStorage.removeItem('access_token');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('picture');
    localStorage.removeItem('userData');
    setLog(false);
    setUserInfo(null);
    setIsModalOpen(false); // Close the modal
  };
  return (
    <nav className="p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to='/' className="flex items-center">
            <img src={icon} alt="Icon" className="w-8 h-8 mr-2" />
            <div className="text-black text-lg font-bold">PromptLib</div>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-black focus:outline-none"
          >
            <Menu size={24} />
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {renderNavItems()}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {renderNavItems()}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={logout}
      />
    </nav>
  );

  function renderNavItems() {
    return (
      <>
        {!isLogged ? (
          <button
            onClick={() => { login(); setLoad(true); }}
            disabled={isLoading}
            className={`w-full md:w-auto text-white bg-black border-2 border-black hover:bg-white hover:text-black hover:border-black transition-colors duration-300 ease-in-out text-center rounded-full px-5 py-1 font-medium ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        ) : (
          <>
            {!inCreatePage && (
              <>
                <button
                  onClick={() => navigate('/create')}
                  className="w-full md:w-auto text-white bg-black border-2 border-black hover:bg-gray-100 hover:text-black hover:border-black transition-colors duration-300 ease-in-out text-center rounded-full px-5 py-1 font-medium"
                >
                  Create Post
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full md:w-auto text-black border-2 border-black hover:bg-black hover:text-white hover:border-black transition-colors duration-300 ease-in-out text-center rounded-full px-5 py-1 font-medium"
                >
                  Sign Out
                </button>
              </>
            )}
            {userInfo?.picture && (
              <Link to='/profile' className="flex justify-center md:justify-start">
                <img
                  src={userInfo.picture}
                  alt="User Profile"
                  className="w-9 h-9 rounded-full"
                />
              </Link>
            )}
          </>
        )}
      </>
    );
  }
};

export default Navbar;