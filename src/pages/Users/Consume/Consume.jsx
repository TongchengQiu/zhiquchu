import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { Link } from 'react-router';
import Table from '../../../components/Table';
import { getPayList, getRefundList } from '../store';

const STATE_OPTIONS = {
  0: '申请',
  1: '同意',
  2: '拒绝',
  3: '成功',
  4: '失败'
};

const DEFAULT_PROPSTYPES = {
  getPayListStarting: PropTypes.bool,
  getPayListDone: PropTypes.bool,
  getPayListError: PropTypes.any,
  payList: PropTypes.any,
  payPage: PropTypes.any,
  getPayList: PropTypes.func,

  getRefundStarting: PropTypes.bool,
  getRefundDone: PropTypes.bool,
  getRefundError: PropTypes.any,
  refundList: PropTypes.any,
  refundPage: PropTypes.any,
  getRefundList: PropTypes.func,

  params: PropTypes.any,
};

@connect(state => ({
  ...state.activitys
}), {
  getPayList,
  getRefundList
})
export default class Consume extends Component {
  static propTypes = DEFAULT_PROPSTYPES

  constructor(props) {
    super(props);
    this.state = {};
  }

  getTablePaySettings() {
    const { getPayListStarting, getPayListDone, getPayListError, payList, payPage } = this.props;
    const meta = [{
      title: '日期',
      key: 'date'
    }, {
      title: '活动名称',
      key: 'activity_name'
    }, {
      title: '所选票种',
      key: 'fee_name'
    }, {
      title: '花费金额',
      key: 'fee_price'
    }, {
      title: '查看活动',
      key: 'SHOW_ACTIVITY',
      render: (text, record) => (<Link to={`/activitys/list/${record.activity_id}`}>查看</Link>)
    }];
    return {
      getList: this.props.getPayList,
      getListStarting: getPayListStarting,
      getListDone: getPayListDone,
      getListError: getPayListError,
      data: payList,
      ...payPage,
      meta,
      defaultQuery: {
        weixinuser_id: this.props.params.id
      },
      key: 'pay',
      title: '花费记录',
      needReload: true,
      pageSize: 10,
    };
  }

  getTableRefundSettings() {
    const {
      getRefundStarting, getRefundDone, getRefundError, refundList, refundPage
    } = this.props;
    const meta = [{
      title: '日期',
      key: 'date'
    }, {
      title: '活动名称',
      key: 'activity_name'
    }, {
      title: '所选票种',
      key: 'fee_name'
    }, {
      title: '退款金额',
      key: 'fee_price'
    }, {
      title: '状态',
      key: 'state',
      render: (i, r) => (STATE_OPTIONS[r.state])
    }, {
      title: '查看活动',
      key: 'SHOW_ACTIVITY',
      render: (text, record) => (<Link to={`/activitys/list/${record.activity_id}`}>查看</Link>)
    }];
    return {
      getList: this.props.getRefundList,
      getListStarting: getRefundStarting,
      getListDone: getRefundDone,
      getListError: getRefundError,
      data: refundList,
      ...refundPage,
      meta,
      defaultQuery: {
        weixinuser_id: this.props.params.id
      },
      key: 'refund',
      title: '退款记录',
      needReload: true,
      pageSize: 10,
    };
  }

  render() {
    return (
      <div>
        <Button type='primary'><Link to='/users/list'>返回</Link></Button>
        <br />
        <Table {...this.getTablePaySettings()} />
        <Table {...this.getTableRefundSettings()} />
      </div>
    );
  }
}
