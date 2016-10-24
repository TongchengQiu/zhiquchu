import React, { Component, PropTypes } from 'react';
import './index.scss';
import Header from '../Header';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

const Layout = ({
  children,
  sidebarList,
  warmingUp
}) => (
  <div className={`layout${warmingUp ? ' warming-up' : ''}`}>
    <div className='transit-indicator'>
      <div className='transit-bar' />
    </div>
    <Header username='呼呼呼' />
    <Navbar />
    <Sidebar list={sidebarList} />
    <div className='container'>
      {children}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  sidebarList: PropTypes.array,
  warmingUp: PropTypes.bool
};

export default Layout;
