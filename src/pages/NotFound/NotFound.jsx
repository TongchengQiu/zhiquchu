import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

import './index.scss';

export default class NotFound extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='not-found'>
        <div className='inner'>
          404
          <br />
          <div className='cont'>NOT FOUND</div>
          <Link className='link' to='/'>返回主页</Link>
        </div>
      </div>
    );
  }
}
