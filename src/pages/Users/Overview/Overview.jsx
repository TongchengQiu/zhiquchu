import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import StatBox from '../../../components/StatBox';
import Table from '../../../components/Table';
import { getAllStat, getStatList } from '../store';

const DEFAULT_PROPSTYPES = {
  getStatListStarting: PropTypes.bool,
  getStatListDone: PropTypes.bool,
  getStatListError: PropTypes.any,
  statList: PropTypes.any,
  statPage: PropTypes.any,
  getAllStat: PropTypes.func,
  getStatList: PropTypes.func,
  stat: PropTypes.any,
  children: PropTypes.any,
};

@connect(state => ({
  ...state.users
}), {
  getAllStat,
  getStatList
})
export default class Overview extends Component {
  static propTypes = DEFAULT_PROPSTYPES

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getAllStat();
  }

  getTableSettings() {
    const { getStatListStarting, getStatListDone, getStatListError, statList, statPage } = this.props;
    const meta = [{
      title: '日期',
      key: 'date'
    }, {
      title: '新增用户数',
      key: 'sum'
    }];
    return {
      getList: this.props.getStatList,
      getListStarting: getStatListStarting,
      getListDone: getStatListDone,
      getListError: getStatListError,
      data: statList,
      ...statPage,
      meta,
    };
  }

  render() {
    const meta = [{
      key: 'sum',
      title: '总用户'
    }];
    return (
      <div>
        {this.props.children ? this.props.children : (
          <div>
            <StatBox data={this.props.stat} meta={meta} />
            <Table {...this.getTableSettings()} />
          </div>
        )}
      </div>
    );
  }
}
