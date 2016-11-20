import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './index.scss';

/* eslint-disable */
class Header extends Component {
  render() {
    const { logout, userInfo } = this.props;
    let user = userInfo || {};
    return <header className='header clearfix'>
      <div className='logo-box'><Link to='/'>知去处后台管理</Link></div>
      <div className='action-box'>
        <span className='name'>{user.username}</span>
        <span className='actor'>{user.nickname}</span>
        <span onClick={logout} className='logout'>退出</span>
      </div>
    </header>
  }
}

Header.propTypes = {
  userInfo: PropTypes.any,
  logout: PropTypes.func,
};

export default Header;
