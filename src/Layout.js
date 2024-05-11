import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav.js';

const Layout = () => (
  <div data-testid="test-layout">
    <Nav />
    <Outlet />
  </div>
);

export default Layout;
