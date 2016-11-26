import React, { Component, PropTypes } from 'react';
import { Table } from 'antd';
import './index.scss';

const DEFAULT_PAGESIZE = 20;

export default class ExtTable extends Component {

  static propTypes = {
    getListStarting: PropTypes.bool,
    getListDone: PropTypes.bool,
    getListError: PropTypes.any,
    getList: PropTypes.func,
    pageSize: PropTypes.any,
    pageNumber: PropTypes.any,
    count: PropTypes.any,
    meta: PropTypes.array.isRequired,
    data: PropTypes.any.isRequired,
  }

  static defaultProps = {
    pagination: false,
    data: [],
    pageSize: DEFAULT_PAGESIZE
  }

  constructor(props) {
    super(props);
    this.state = {};

    this.getListData = this.getListData.bind(this);
  }

  componentDidMount() {
    if (!this.props.data || !this.props.data.length < DEFAULT_PAGESIZE) {
      this.getListData();
    }
  }

  getListData(args = {}) {
    const { pageSize, pageNumber, getList } = this.props;
    getList({
      page: args.page || 1,
      page_size: pageSize,
      ...args.filter
    });
  }

  getPagenationSettings() {
    const { pageNumber, count, pageSize } = this.props;
    return {
      current: +pageNumber,
      defaultCurrent: 1,
      total: count,
      pageSize,
      defaultPageSize: DEFAULT_PAGESIZE,
      onChange: (page) => { this.getListData({ page }); },
      showSizeChanger: false,
      showQuickJumper: true,
    };
  }

  getTableSettings() {
    const { getListStarting, getListDone, data, meta } = this.props;
    const columns = meta.map(item => ({
      ...item,
      dataIndex: item.key
    }));
    return {
      pagination: this.getPagenationSettings(),
      dataSource: data,
      columns,
      loading: getListStarting,
    };
  }

  render() {
    const { getListError } = this.props;
    if (!getListError) {
      return <Table {...this.getTableSettings()} />;
    }
    return <div className='getListError'>{getListError}</div>;
  }
}
