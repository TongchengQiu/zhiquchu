import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './index.scss';

const Sidebar = ({
  list
}) => (
  <div className='sidebar'>
    <ul>
      {list.map((item, i) =>
        <li key={`sidebar_item_${i}`}>
          <Link
            to={item.path}
            activeClassName='active'
            onlyActiveOnIndex={i === 0 && !item.notOnlyIndex}
          >
            {item.label}
          </Link>
        </li>
      )}
    </ul>
  </div>
);

Sidebar.propTypes = {
  list: PropTypes.array,
};

export default Sidebar;
