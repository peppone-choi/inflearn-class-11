import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googleInstance from '../api/axios';

const Nav = () => {
  const [loginInfo, setLoginInfo] = useState({});
  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get('access_token');
  const [profileClicked, setProfileClicked] = useState(false);
  const navigate = useNavigate();
  useState(() => {
    if (accessToken && !loginInfo.email) {
      googleInstance.get('/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        setLoginInfo(res.data);
        localStorage.setItem('loginInfo', JSON.stringify(res.data));
        navigate('/');
      });
    } else if (localStorage.getItem('loginInfo')) {
      setLoginInfo(JSON.parse(localStorage.getItem('loginInfo')));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loginInfo');
    setLoginInfo({});
    setProfileClicked(false);
    navigate('/');
  };

  const handleProfileClicked = () => {
    setProfileClicked(!profileClicked);
  };

  return (
    <div data-testid="test-nav" className="fixed top-0 z-50 flex items-center justify-between w-full h-28">
      <button
        type="button"
        className="ml-4 h-14"
      >
        <img alt="포켓몬 로고" className="h-14" src="https://imguscdn.gamespress.com/cdn/files/PokemonAmerica/2019/07/09125735-7b00e266-d991-41da-9267-843e49ce62a7/Pokemon_Logo.jpg?w=240&mode=max&otf=y&quality=90&format=jpg&bgcolor=white&ex=2024-07-01+03%3A00%3A00&sky=caba7d25fcb155e91575db755e0eb78d70378256f82924d971f8982c74e4a388" />
      </button>
      <button
        type="button"
        onClick={() => {
          window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
        }}
        className={`${loginInfo.email && 'hidden'} mr-4 font-bold border-2 rounded-full shadow-sm size-14 bg-gradient-to-br border-sky-800 text-sky-800 from-yellow-500 to-yellow-50`}
      >
        Login
      </button>

      <button
        type="button"
        className={`${!loginInfo.email && 'hidden'} bg-center bg-cover mr-4 border-2 rounded-full shadow-sm size-14 hover:shadow-lg`}
        style={{ backgroundImage: `url(${loginInfo.picture || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'})` }}
        onClick={handleProfileClicked}
      >
        {' '}
      </button>

      <div className={`${!profileClicked && 'hidden'} flex flex-col items-center justify-center absolute right-0 top-20`}>
        <button
          type="button"
          onClick={() => {
            handleLogout();
          }}
          className={`${!profileClicked && 'hidden'} w-16 h-8 mr-4 font-bold border-2 shadow-sm opacity-55 bg-gradient-to-br border-sky-800 text-sky-800 from-yellow-500 to-yellow-50`}
        >
          Logout
        </button>
      </div>
    </div>

  );
};

export default Nav;
