import React, { Component } from 'react';
import { Link } from 'react-router';
import './index.scss';

const Navbar = () => (
  <nav className='navbar'>
    <ul className='clearfix'>
      <li>
        <Link to='/home' activeClassName='active'>成员管理</Link>
      </li>
      <li>
        <Link to='/activitys' activeClassName='active'>活动管理</Link>
      </li>
      <li>
        <Link to='/users' activeClassName='active'>用户管理</Link>
      </li>
      <li>
        <Link to='/consumptions' activeClassName='active'>消费记录</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
