import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './index.scss';

const Header = ({
  username
}) => (
  <header className='header clearfix'>
    <div className='logo-box'><Link to='/'>知去处后台管理</Link></div>
    <div className='action-box'>
      <span className='name'>{username}</span>
      <span className='actor'>知去处 admin</span>
      <span className='logout'>退出</span>
    </div>
  </header>
);

Header.propTypes = {
  username: PropTypes.string
};

export default Header;
