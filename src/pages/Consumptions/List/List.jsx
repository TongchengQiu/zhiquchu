import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
  ...state.consumptions
}), {
  getAllStat,
  getStatList
})
export default class List extends Component {
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
      title: '进账',
      key: 'pay_fee',
      render: (i, r) => (r.pay_fee ? r.pay_fee / 100 : 0)
    }, {
      title: '出账（退款）',
      key: 'refund_fee',
      render: (i, r) => (r.refund_fee ? r.refund_fee / 100 : 0)
    }, {
      title: '净利',
      key: 'balance_fee',
      render: (i, r) => (r.balance_fee ? r.balance_fee / 100 : 0)
    }, {
      title: '查看详情',
      key: 'OPTIONS',
      render: (text, record) => (<Link to={`/consumptions/list/${record.date}`}>查看</Link>)
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
      key: 'pay_fee',
      title: '总进账'
    }, {
      key: 'refund_fee',
      title: '总出账'
    }, {
      key: 'balance_fee',
      title: '净利'
    }];
    const newStat = {};
    if (this.props.stat) {
      Object.keys(this.props.stat).forEach(
        key => (newStat[key] = (this.props.stat[key] ? this.props.stat[key] / 100 : 0))
      );
    }
    return (
      <div>
        {this.props.children ? this.props.children : (
          <div>
            <StatBox data={newStat} meta={meta} />
            <Table {...this.getTableSettings()} />
          </div>
        )}
      </div>
    );
  }
}
