import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { Link } from 'react-router';
import Table from '../../../components/Table';
import { getDetailPay, getDetailRefund } from '../store';

const DEFAULT_PROPSTYPES = {
  getDetailPayStarting: PropTypes.bool,
  getDetailPayDone: PropTypes.bool,
  getDetailPayError: PropTypes.any,
  detailPayList: PropTypes.any,
  detailPayPage: PropTypes.any,
  getDetailPay: PropTypes.func,

  getDetailRefundStarting: PropTypes.bool,
  getDetailRefundDone: PropTypes.bool,
  getDetailRefundError: PropTypes.any,
  detailRefundList: PropTypes.any,
  detailRefundPage: PropTypes.any,
  getDetailRefund: PropTypes.func,

  params: PropTypes.any,
};

@connect(state => ({
  ...state.consumptions
}), {
  getDetailPay,
  getDetailRefund
})
export default class Detail extends Component {
  static propTypes = DEFAULT_PROPSTYPES

  constructor(props) {
    super(props);
    this.state = {};
  }

  // TODO: 用户 id
  getTablePaySettings() {
    const { getDetailPayStarting, getDetailPayDone, getDetailPayError, detailPayList, detailPayPage } = this.props;
    const meta = [{
      title: '用户',
      key: 'nickname'
    }, {
      title: '查看该用户',
      key: 'SHOW_USER',
      render: (text, record) => (<Link to={`/users/list/${record.weixinuser_id}`}>查看</Link>)
    }, {
      title: '活动名称',
      key: 'activity_name'
    }, {
      title: '所选票种',
      key: 'fee_name'
    }, {
      title: '花费金额',
      key: 'fee_price',
      render: (i, r) => (r.fee_price ? r.fee_price / 100 : 0)
    }, {
      title: '查看活动',
      key: 'SHOW_ACTIVITY',
      render: (text, record) => (<Link to={`/activitys/list/${record.activity_id}`}>查看</Link>)
    }];
    return {
      getList: this.props.getDetailPay,
      getListStarting: getDetailPayStarting,
      getListDone: getDetailPayDone,
      getListError: getDetailPayError,
      data: detailPayList,
      ...detailPayPage,
      meta,
      defaultQuery: {
        date: this.props.params.id
      },
      key: 'pay',
      title: `${this.props.params.id} 花费记录`,
      needReload: true,
      pageSize: 10,
    };
  }

  getTableRefundSettings() {
    const {
      getDetailRefundStarting, getDetailRefundDone, getDetailRefundError, detailRefundList, detailRefundPage
    } = this.props;
    const meta = [{
      title: '用户',
      key: 'nickname'
    }, {
      title: '查看该用户',
      key: 'SHOW_USER',
      render: (text, record) => (<Link to={`/users/list/${record.weixinuser_id}`}>查看</Link>)
    }, {
      title: '活动名称',
      key: 'activity_name'
    }, {
      title: '所选票种',
      key: 'fee_name'
    }, {
      title: '退款金额',
      key: 'fee_price',
      render: (i, r) => (r.fee_price ? r.fee_price / 100 : 0)
    }, {
      title: '查看活动',
      key: 'SHOW_ACTIVITY',
      render: (text, record) => (<Link to={`/activitys/list/${record.activity_id}`}>查看</Link>)
    }];
    return {
      getList: this.props.getDetailRefund,
      getListStarting: getDetailRefundStarting,
      getListDone: getDetailRefundDone,
      getListError: getDetailRefundError,
      data: detailRefundList,
      ...detailRefundPage,
      meta,
      defaultQuery: {
        date: this.props.params.id,
        state: 3
      },
      key: 'refund',
      title: `${this.props.params.id} 退款成功记录`,
      needReload: true,
      pageSize: 10,
    };
  }

  render() {
    return (
      <div>
        <Button type='primary'><Link to='/consumptions'>返回</Link></Button>
        <br />
        <Table {...this.getTablePaySettings()} />
        <Table {...this.getTableRefundSettings()} />
      </div>
    );
  }
}
