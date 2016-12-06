import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'antd';
import Table from '../../../components/Table';
import { getRList, getUList, changeObject } from '../store';

const STATE_OPTIONS = {
  0: '待审核',
  1: '通过',
  2: '禁用',
};

const LSTATE_OPTIONS = {
  0: '过期',
  1: '有效',
};

const filterStateArr = Object.keys(STATE_OPTIONS).map(key => ({
  text: STATE_OPTIONS[key],
  value: key
}));

const filterLStateArr = Object.keys(LSTATE_OPTIONS).map(key => ({
  text: LSTATE_OPTIONS[key],
  value: key
}));

const DEFAULT_PROPSTYPES = {
  getRList: PropTypes.func,
  getRListStarting: PropTypes.bool,
  getRListDone: PropTypes.bool,
  getRListError: PropTypes.any,
  rlist: PropTypes.any,
  rpage: PropTypes.any,

  getUList: PropTypes.func,
  getUListStarting: PropTypes.bool,
  getUListDone: PropTypes.bool,
  getUListError: PropTypes.any,
  ulist: PropTypes.any,
  upage: PropTypes.any,

  changeObject: PropTypes.func,

  children: PropTypes.any,
};

@connect(state => ({
  ...state.activitys
}), {
  getRList,
  getUList,
  changeObject
})
export default class List extends Component {
  static propTypes = DEFAULT_PROPSTYPES

  constructor(props) {
    super(props);
    this.state = {};
  }

  getRTableSettings() {
    const { getRListStarting, getRListDone, getRListError, rlist, rpage } = this.props;
    const meta = [{
      title: '活动名',
      key: 'name'
    }, {
      title: '编号',
      key: 'id'
    }, {
      title: '当前状态',
      key: 'state',
      render: (i, row) => STATE_OPTIONS[row.state]
    }, {
      title: '发布时间',
      key: 'create_time'
    }, {
      title: '操作',
      key: 'OPTIONS',
      render: (i, row) => [
        <Button key='rshow'><Link to={`/activitys/list/${row.id}`}>查看</Link></Button>,
        +row.state !== 1 &&
        <Button key='rpass' onClick={this.props.changeObject.bind(null, { id: row.id, state: 1 })}>
          通过
        </Button>,
        +row.state !== 2 &&
        <Button key='rdisabled' onClick={this.props.changeObject.bind(null, { id: row.id, state: 2 })}>
          禁用
        </Button>,
        +row.recommend !== 0 &&
        <Button key='rcancelr' onClick={this.props.changeObject.bind(null, { id: row.id, recommend: '0' })}>
          取消推荐
        </Button>,
        +row.recommend !== 1 &&
        <Button key='uconfirmr' onClick={this.props.changeObject.bind(null, { id: row.id, recommend: 1 })}>
          推荐
        </Button>
      ]
    }];
    return {
      getList: this.props.getRList,
      getListStarting: getRListStarting,
      getListDone: getRListDone,
      getListError: getRListError,
      data: rlist,
      pageSize: 10,
      ...rpage,
      meta,
      title: '已推荐活动'
    };
  }

  getUTableSettings() {
    const { getUListStarting, getUListDone, getUListError, ulist, upage } = this.props;
    const meta = [{
      title: '活动名',
      key: 'name'
    }, {
      title: '编号',
      key: 'id'
    }, {
      title: '提交时间',
      key: 'create_time'
    }, {
      title: '当前状态',
      key: 'state',
      filters: filterStateArr,
      filterMultiple: false,
      render: (i, row) => STATE_OPTIONS[row.state]
    }, {
      title: '有效情况',
      key: 'lstate',
      filters: filterLStateArr,
      filterMultiple: false,
      render: (i, row) => LSTATE_OPTIONS[row.lstate]
    }, {
      title: '操作',
      key: 'OPTIONS',
      render: (i, row) => [
        <Button key='ushow'><Link to={`/activitys/list/${row.id}`}>查看</Link></Button>,
        +row.state !== 1 &&
        <Button key='upass' onClick={this.props.changeObject.bind(null, { id: row.id, state: 1 })}>
          通过
        </Button>,
        +row.state !== 2 &&
        <Button key='udisabled' onClick={this.props.changeObject.bind(null, { id: row.id, state: 2 })}>
          禁用
        </Button>,
        +row.recommend !== 0 &&
        <Button key='rcancelr' onClick={this.props.changeObject.bind(null, { id: row.id, recommend: '0' })}>
          取消推荐
        </Button>,
        +row.recommend !== 1 &&
        <Button key='uconfirmr' onClick={this.props.changeObject.bind(null, { id: row.id, recommend: 1 })}>
          推荐
        </Button>
      ]
    }];
    return {
      getList: this.props.getUList,
      getListStarting: getUListStarting,
      getListDone: getUListDone,
      getListError: getUListError,
      data: ulist,
      pageSize: 10,
      ...upage,
      meta,
      title: '未推荐活动'
    };
  }

  render() {
    return (
      <div>
        {this.props.children ? this.props.children : (
          <div>
            <Table {...this.getRTableSettings()} />
            <Table {...this.getUTableSettings()} />
          </div>
        )}
      </div>
    );
  }
}
