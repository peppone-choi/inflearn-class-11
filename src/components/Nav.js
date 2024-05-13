import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleInstance } from '../api/axios';

const Nav = () => {
  const [loginInfo, setLoginInfo] = useState({});
  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get('access_token');
  const [profileClicked, setProfileClicked] = useState(false);
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken && !loginInfo.email) {
      googleInstance
        .get('/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setLoginInfo(res.data);
          localStorage.setItem('loginInfo', JSON.stringify(res.data));
          navigate('/');
        });
    } else if (localStorage.getItem('loginInfo')) {
      setLoginInfo(JSON.parse(localStorage.getItem('loginInfo')));
    } else {
      setLoginInfo({});
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
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

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div
      data-testid="test-nav"
      className={`${scroll && 'bg-black'} sticky top-0 flex items-center justify-between w-full h-20`}
    >
      <button type="button" onClick={() => handleLogoClick()} className="ml-4 h-14">
        <img
          alt="포켓몬 로고"
          className="h-14"
          src="https://assets.pokemon.com/assets/cms2-en-uk/img/misc/gus/buttons/logo-pokemon-79x45.png"
        />
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

      <button type="button" onClick={handleProfileClicked} className={`${!loginInfo.email && 'hidden'}`}>
        <img
          alt="avatar"
          className="mr-4 border-2 rounded-full shadow-sm w-14 h-14 size-14 hover:shadow-lg"
          src={
            loginInfo.picture ||
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
          }
        />
      </button>

      <div
        className={`${!profileClicked && 'hidden'} flex flex-col items-center justify-center absolute right-0 top-20`}
      >
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
