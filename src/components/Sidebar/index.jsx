import React, { Component } from 'react';
import { Link } from 'react-router';
import './index.scss';

const Sidebar = () => (
  <div className='sidebar'>
    <ul>
      <li><Link to='/home' activeClassName='active'>成员列表</Link></li>
      <li><Link to='/active' activeClassName='active'>添加成员</Link></li>
    </ul>
  </div>
);

// Sidebar.propTypes = {
//   children: PropTypes.any.isRequired,
// };

export default Sidebar;
