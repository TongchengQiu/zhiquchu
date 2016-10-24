import React, { Component, PropTypes } from 'react';
import './index.scss';
import Header from '../Header';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

const Layout = ({
  children
}) => (
  <div className='layout'>
    <Header username='呼呼呼' />
    <Navbar />
    <Sidebar />
    <div className='container'>
      {children}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Layout;
