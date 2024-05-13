import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import MainPage from './pages/MainPage';
import InfoPage from './pages/InfoPage';
import pokemonTypes from './assets/pokemon-type.json';

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path=":id" element={<InfoPage typeData={pokemonTypes} />} />
      </Route>
    </Routes>
  </div>
);

export default App;
