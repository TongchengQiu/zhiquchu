import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Table from '../../../components/Table';
import { getUserList } from '../store';

const DEFAULT_PROPSTYPES = {
  getUserListStarting: PropTypes.bool,
  getUserListDone: PropTypes.bool,
  getUserListError: PropTypes.any,
  userList: PropTypes.any,
  userPage: PropTypes.any,
  getUserList: PropTypes.func,
  children: PropTypes.any,
};

@connect(state => ({
  ...state.users
}), {
  getUserList
})
export default class List extends Component {
  static propTypes = DEFAULT_PROPSTYPES

  constructor(props) {
    super(props);
    this.state = {};
  }

  getTableSettings() {
    const { getUserListStarting, getUserListDone, getUserListError, userList, userPage } = this.props;
    const meta = [{
      title: '微信名',
      key: 'nickname'
    }, {
      title: '编号',
      key: 'id'
    }, {
      title: '发布活动',
      key: 'pub_act_num'
    }, {
      title: '参与活动',
      key: 'part_act_num'
    }, {
      title: '消费记录',
      key: 'SUME_RECORD',
      render: (index, record) => (<Link to={`/users/list/${record.id}/consume`}>查看</Link>)
    }, {
      title: '操作',
      key: 'OPTION',
      render: (index, record) => (<Link to={`/users/list/${record.id}`}>查看</Link>)
    }];
    return {
      getList: this.props.getUserList,
      getListStarting: getUserListStarting,
      getListDone: getUserListDone,
      getListError: getUserListError,
      data: userList,
      ...userPage,
      meta,
    };
  }

  render() {
    return (
      <div>
        {this.props.children ? this.props.children : (
          <Table {...this.getTableSettings()} />
        )}
      </div>
    );
  }
}
