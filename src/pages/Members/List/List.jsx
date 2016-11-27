import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Popconfirm } from 'antd';
import Table from '../../../components/Table';
import { getList, deleteItem } from '../store';

const DEFAULT_PROPSTYPES = {
  getListStarting: PropTypes.bool,
  getListDone: PropTypes.bool,
  getListError: PropTypes.any,
  list: PropTypes.any,
  page: PropTypes.any,
  getList: PropTypes.func,
  deleteItem: PropTypes.func,
};

@connect(state => ({
  ...state.members
}), {
  getList,
  deleteItem
})
export default class List extends Component {
  static propTypes = DEFAULT_PROPSTYPES

  constructor(props) {
    super(props);
    this.state = {};
  }

  getTableSettings() {
    const { getListStarting, getListDone, getListError, list, page } = this.props;
    const meta = [{
      title: '姓名',
      key: 'nickname'
    }, {
      title: '账号',
      key: 'username'
    }, {
      title: '操作',
      key: 'OPTIONS',
      render: (text, record) => (
        <Popconfirm
          onConfirm={() => this.props.deleteItem(record.id)}
          okText='确定'
          cancelText='取消'
          title={`确定删除${record.nickname}吗`}
        >
          <Button>删除</Button>
        </Popconfirm>
      )
    }];
    return {
      getList: this.props.getList,
      getListStarting,
      getListDone,
      getListError,
      data: list,
      ...page,
      meta,
    };
  }

  render() {
    return (
      <div>
        <Table {...this.getTableSettings()} />
      </div>
    );
  }
}
