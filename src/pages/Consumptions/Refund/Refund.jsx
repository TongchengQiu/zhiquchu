import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'antd';
import Table from '../../../components/Table';
import { getRefundList, checkRefund } from '../store';

/* eslint-disable */
const filterState = {
  '0': '申请',
  '1': '同意',
  '2': '拒绝',
  '3': '成功',
  '4': '失败'
};
/* eslint-enable */

const filterStateArr = Object.keys(filterState).map(key => ({
  text: filterState[key],
  value: key
}));

const DEFAULT_PROPSTYPES = {
  getRefundListStarting: PropTypes.bool,
  getRefundListDone: PropTypes.bool,
  getRefundListError: PropTypes.any,
  refundList: PropTypes.any,
  refundPage: PropTypes.any,
  getRefundList: PropTypes.func,
  checkRefund: PropTypes.func,
};

@connect(state => ({
  ...state.consumptions
}), {
  getRefundList,
  checkRefund
})
export default class Refund extends Component {
  static propTypes = DEFAULT_PROPSTYPES

  constructor(props) {
    super(props);
    this.state = {};
  }

  getTableSettings() {
    const {
      getRefundListStarting, getRefundListDone, getRefundListError, refundList, refundPage
    } = this.props;
    const meta = [{
      title: '用户',
      key: 'nickname'
    }, {
      title: '查看用户',
      key: 'weixinuser_id',
      render: (text, record) => (<Link to={`/users/list/${record.weixinuser_id}`}>查看</Link>)
    }, {
      title: '活动',
      key: 'activity_name'
    }, {
      title: '查看活动',
      key: 'activity_id',
      render: (text, record) => (<Link to={`/activitys/list/${record.activity_id}`}>查看</Link>)
    }, {
      title: '所选票种',
      key: 'fee_name'
    }, {
      title: '金额',
      key: 'fee_price',
      render: (i, r) => (r.fee_price ? r.fee_price / 100 : 0)
    }, {
      title: '当前状态',
      key: 'state',
      filters: filterStateArr,
      filterMultiple: false,
      render: text => (filterState[text]),
    }, {
      title: '退票时间',
      key: 'refund_time'
    }, {
      title: '操作',
      key: 'OPTIONS',
      render: (text, record) => ((+record.state) === 0 && [
        <Button
          key='option_agree'
          onClick={this.checkRefund.bind(this, record.id, 1)}
        >同意</Button>,
        <Button
          key='option_reject'
          onClick={this.checkRefund.bind(this, record.id, 2)}
        >拒绝</Button>,
      ])
    }];
    return {
      getList: this.props.getRefundList,
      getListStarting: getRefundListStarting,
      getListDone: getRefundListDone,
      getListError: getRefundListError,
      data: refundList,
      ...refundPage,
      meta,
    };
  }

  checkRefund(id, state) {
    this.props.checkRefund({
      id,
      state,
    });
  }

  render() {
    return (
      <div>
        <Table {...this.getTableSettings()} />
      </div>
    );
  }
}
