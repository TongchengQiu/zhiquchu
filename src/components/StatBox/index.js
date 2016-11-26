import React, { Component, PropTypes } from 'react';
import './index.scss';

const StatBox = ({
  data,
  meta
}) => (
  <div className='stat-box'>
    <ul>
      {meta.map((item, i) =>
        <li key={`stat_box_item_${i}`}>
          <div>{item.title}</div>
          <div>{data[item.key]}</div>
        </li>
      )}
    </ul>
  </div>
);

StatBox.propTypes = {
  data: PropTypes.object,
  meta: PropTypes.array,
};

export default StatBox;
